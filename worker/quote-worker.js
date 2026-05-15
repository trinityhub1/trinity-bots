const corsHeaders = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 5;
const submissionsByIp = new Map();

function jsonResponse(body, status = 200, origin = '*') {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      ...corsHeaders,
    },
  });
}

function clean(value) {
  return String(value || '').trim().slice(0, 900);
}

function createReference() {
  return `TB-${Math.floor(1000 + Math.random() * 9000)}`;
}

function getComplexity(commands) {
  const count = Number(commands);
  if (!count) return 'Unknown';
  if (count <= 6) return 'Small bot';
  if (count <= 15) return 'Standard bot';
  return 'Advanced bot';
}

function getRatingStars(rating) {
  const count = Math.max(1, Math.min(5, Number(rating) || 5));
  return '★'.repeat(count) + '☆'.repeat(5 - count);
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = submissionsByIp.get(ip) || { count: 0, resetAt: now + rateLimitWindowMs };

  if (record.resetAt < now) {
    submissionsByIp.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  record.count += 1;
  submissionsByIp.set(ip, record);
  return record.count > rateLimitMax;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '*';
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';
    const responseOrigin = allowedOrigin === '*' ? '*' : allowedOrigin;

    if (allowedOrigin !== '*' && origin !== allowedOrigin) {
      return jsonResponse({ error: 'Origin not allowed' }, 403, responseOrigin);
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': responseOrigin,
          ...corsHeaders,
        },
      });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, responseOrigin);
    }

    if (!env.DISCORD_WEBHOOK_URL) {
      return jsonResponse({ error: 'Webhook not configured' }, 500, responseOrigin);
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return jsonResponse({ error: 'Too many quote requests. Please try again later.' }, 429, responseOrigin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON' }, 400, responseOrigin);
    }

    const quote = {
      submissionType: clean(payload.submissionType || 'quote'),
      discord: clean(payload.discord),
      serverSize: clean(payload.serverSize),
      botType: clean(payload.botType),
      commands: clean(payload.commands),
      hosting: clean(payload.hosting),
      timeline: clean(payload.timeline),
      details: clean(payload.details),
      name: clean(payload.name),
      projectType: clean(payload.projectType),
      rating: clean(payload.rating),
      reviewText: clean(payload.reviewText),
      reviewConsent: payload.reviewConsent === true || payload.reviewConsent === 'on',
      termsAccepted: payload.termsAccepted === true || payload.termsAccepted === 'on',
      companyWebsite: clean(payload.companyWebsite),
      startedAt: Number(payload.startedAt || 0),
    };

    if (quote.companyWebsite) {
      return jsonResponse({ ok: true }, 200, responseOrigin);
    }

    if (!quote.startedAt || Date.now() - quote.startedAt < 2500) {
      return jsonResponse({ error: 'Please take a moment to complete the form before submitting.' }, 400, responseOrigin);
    }

    if (quote.submissionType === 'review') {
      if (!quote.name || !quote.discord || !quote.projectType || !quote.rating || !quote.reviewText) {
        return jsonResponse({ error: 'Missing required review fields' }, 400, responseOrigin);
      }

      if (!quote.reviewConsent) {
        return jsonResponse({ error: 'Review consent must be accepted before submitting.' }, 400, responseOrigin);
      }

      if (quote.reviewText.length < 20) {
        return jsonResponse({ error: 'Please add a little more detail to the review.' }, 400, responseOrigin);
      }

      const reference = createReference();
      const discordPayload = {
        username: 'Trinity Bots Reviews',
        embeds: [
          {
            title: `New Review Submission ${reference}`,
            color: 0x39d5ff,
            fields: [
              { name: 'Reference', value: reference, inline: true },
              { name: 'Display Name', value: quote.name, inline: true },
              { name: 'Discord', value: quote.discord, inline: true },
              { name: 'Project Type', value: quote.projectType, inline: true },
              { name: 'Rating', value: `${quote.rating}/5 ${getRatingStars(quote.rating)}`, inline: true },
              { name: 'Consent', value: 'Approved for website use after review', inline: true },
              { name: 'Review Text', value: quote.reviewText, inline: false },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      const discordResponse = await fetch(env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload),
      });

      if (!discordResponse.ok) {
        return jsonResponse({ error: 'Discord delivery failed' }, 502, responseOrigin);
      }

      return jsonResponse({ ok: true, reference }, 200, responseOrigin);
    }

    if (!quote.discord || !quote.serverSize || !quote.botType || !quote.commands || !quote.hosting || !quote.details) {
      return jsonResponse({ error: 'Missing required fields' }, 400, responseOrigin);
    }

    if (!quote.termsAccepted) {
      return jsonResponse({ error: 'Terms must be accepted before submitting a quote request.' }, 400, responseOrigin);
    }

    if (quote.details.length < 20) {
      return jsonResponse({ error: 'Please add a little more detail about what the bot should do.' }, 400, responseOrigin);
    }

    const reference = createReference();
    const complexity = getComplexity(quote.commands);

    const discordPayload = {
      username: 'Trinity Bots Quotes',
      embeds: [
        {
          title: `New Trinity Bots Quote Request ${reference}`,
          color: 0x55e093,
          fields: [
            { name: 'Reference', value: reference, inline: true },
            { name: 'Suggested Complexity', value: complexity, inline: true },
            { name: 'Discord', value: quote.discord, inline: true },
            { name: 'Server Size', value: quote.serverSize, inline: true },
            { name: 'Bot Type', value: quote.botType, inline: true },
            { name: 'Estimated Commands', value: quote.commands, inline: true },
            { name: 'Hosting Period', value: quote.hosting, inline: true },
            { name: 'Timeline', value: quote.timeline || 'Not provided', inline: true },
            { name: 'Terms Accepted', value: 'Yes', inline: true },
            { name: 'Project Details', value: quote.details, inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const discordResponse = await fetch(env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      return jsonResponse({ error: 'Discord delivery failed' }, 502, responseOrigin);
    }

    return jsonResponse({ ok: true, reference }, 200, responseOrigin);
  },
};
