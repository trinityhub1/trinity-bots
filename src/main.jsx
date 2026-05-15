import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Code2,
  FileText,
  Gauge,
  HardDrive,
  Headphones,
  MessageSquareText,
  MessagesSquare,
  PanelTop,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Star,
  TerminalSquare,
  Wrench,
  Zap,
} from 'lucide-react';
import './styles.css';

const botTypes = [
  { icon: MessageSquareText, title: 'Moderation', text: 'Auto-mod, logging, reports, role tools, ticket flows, and staff commands.' },
  { icon: Sparkles, title: 'Community', text: 'Leveling, welcome systems, reaction roles, events, giveaways, and custom commands.' },
  { icon: TerminalSquare, title: 'Automation', text: 'Server workflows, alerts, integrations, panels, webhooks, and scheduled tasks.' },
  { icon: ShieldCheck, title: 'Premium Systems', text: 'Verification, application forms, paid access flows, dashboards, and audit trails.' },
];

const hostingPrices = [
  ['7 Days', '£4.00'],
  ['14 Days', '£6.00'],
  ['28 Days', '£10.00'],
  ['112 Days', '£35.00'],
  ['168 Days', '£50.00'],
];

const quoteFactors = [
  'Number of commands and slash commands',
  'Moderation, tickets, verification, or role systems',
  'Dashboards, databases, APIs, webhooks, or automations',
  'How custom the design and server setup needs to be',
];

const packageExamples = [
  {
    title: 'Ticket Support Bot',
    tag: 'Support teams',
    text: 'Ticket panels, transcripts, staff roles, categories, claim tools, and clean support workflows.',
  },
  {
    title: 'Moderation Bot',
    tag: 'Server safety',
    text: 'Warnings, mutes, logs, anti-spam, reports, staff commands, and server protection systems.',
  },
  {
    title: 'Verification Bot',
    tag: 'Access control',
    text: 'Rules acceptance, verification steps, role assignment, welcome flows, and audit logging.',
  },
  {
    title: 'Community Bot',
    tag: 'Engagement',
    text: 'Levels, custom commands, giveaways, role menus, events, member welcomes, and server tools.',
  },
];

const standards = [
  'Private test server checks before launch',
  'Clear quote based on features and command count',
  'Managed hosting periods with renewal options',
  'Clean setup support so the bot works in the live server',
  'Support for fixes, small changes, and future upgrades',
  'No public webhook exposure in the website code',
];

const demoPanels = [
  ['Ticket Panel', 'Open, claim, close, transcript, staff notes', 'Support flow'],
  ['Moderation Logs', 'Warnings, mutes, bans, anti-spam, audit trail', 'Safety tools'],
  ['Verification Flow', 'Rules check, role grant, welcome DM, logs', 'Access setup'],
];

const statusStats = [
  ['Uptime target', '24/7'],
  ['Hosted bots', 'Ready'],
  ['Response time', 'Fast reply'],
  ['Last checked', 'Live'],
];

const estimateGuide = [
  ['Small bot', '3-6 commands', 'Simple moderation, welcome messages, role tools, or a small ticket flow.'],
  ['Standard bot', '7-15 commands', 'A fuller server bot with multiple systems, logs, custom commands, and setup work.'],
  ['Advanced bot', '16+ commands', 'Databases, dashboards, APIs, advanced automation, complex permissions, or multi-system builds.'],
];

const handoffItems = [
  'Bot name and short description',
  'Discord server invite or setup access',
  'Role names and permission details',
  'Channel names and where features should appear',
  'Command list with what each command should do',
  'Chosen hosting period per bot',
];

const serviceTerms = [
  ['Payment before work', 'Bot builds start after the agreed PayPal payment is received. Hosting starts after the bot is deployed or renewed.'],
  ['PayPal payment records', 'Payments should include the agreed project name, bot type, and hosting period where possible so both sides have a clear payment record.'],
  ['No refunds after work starts', 'Because custom bot work is digital and made to order, payments are non-refundable once planning, coding, setup, hosting, or support work has started, except where required by law or payment-platform rules.'],
  ['Scope and changes', 'The quote covers the agreed features, commands, and setup. Extra commands, new systems, major redesigns, or changed requirements may require an additional quote.'],
  ['Hosting renewals', 'Hosting is paid per bot for the selected period. If hosting is not renewed before or after expiry, the bot may remain offline until the client has paid for a new hosting period.'],
  ['Client access and delays', 'Clients must provide the needed server permissions, role details, bot requirements, and testing feedback. Delays in providing information may delay delivery.'],
  ['Payment records', 'Quotes, accepted scope, payment confirmation, delivery updates, screenshots, and Discord messages may be kept as service records if a dispute or payment issue occurs.'],
  ['Platform limits', 'Discord, PayPal, hosting providers, or third-party APIs may change, rate-limit, suspend, or restrict services. Trinity Bots is not responsible for outages or restrictions caused by third-party platforms.'],
  ['Support limits', 'Support covers agreed bot issues and reasonable setup help. Abuse, spam, server misconfiguration, third-party outages, or newly requested features may require a new quote.'],
  ['Legal note', 'These terms are a practical service policy for Trinity Bots. They are not legal advice and do not replace PayPal rules, Discord rules, hosting provider rules, consumer rights, or local law.'],
];

const faqs = [
  ['Do I build the bot myself?', 'No. Trinity Bots builds the bot for you based on your server needs, then sets it up and hosts it if you choose hosting.'],
  ['Is hosting priced per bot?', 'Yes. Hosting prices are per bot. If you have multiple bots, each bot needs its own hosting period.'],
  ['How is the build price worked out?', 'Build price depends on command count, features, integrations, databases, dashboards, and the amount of custom setup required.'],
  ['What happens when hosting expires?', 'The bot may go offline until hosting is renewed. Clients can renew before expiry to keep everything running smoothly.'],
  ['Can I request changes later?', 'Yes. Small fixes can be included with support, while new systems or bigger feature changes can be quoted separately.'],
  ['Can you work on an existing bot?', 'Yes, if the current code and setup can be reviewed. Existing bot fixes, hosting, and rebuilds can be quoted after checking the project.'],
  ['Do I need to give admin permissions?', 'Not always. Some setup may need temporary admin-level permissions, but Trinity Bots will only ask for the access needed to configure the agreed features.'],
  ['Can I move hosting later?', 'Yes, but moving hosting may require a handoff or setup fee depending on the bot, code access, database setup, and hosting provider.'],
  ['What happens if Discord changes something?', 'If Discord changes an API, permission, or feature that affects the bot, fixes may be quoted depending on the work required and whether the issue is caused by a third-party change.'],
  ['Do you provide the source code?', 'Source code is not included by default unless agreed before payment. Managed hosting means Trinity Bots keeps the bot deployed and maintained for the client.'],
];

const steps = [
  ['Request', 'The client sends their server goals, command ideas, and any features they need.'],
  ['Build', 'Trinity Bots designs, codes, and tests the bot in a private environment.'],
  ['Host', 'The bot is launched, configured, hosted, monitored, and supported month to month.'],
];

const paymentSteps = [
  ['Quote accepted', 'The client confirms the agreed features, command count, hosting period, and price.'],
  ['PayPal payment', 'Payment is sent with a clear project reference before build or hosting work begins.'],
  ['Work begins', 'Trinity Bots builds, configures, tests, and prepares the bot for launch.'],
  ['Delivery and hosting', 'The bot is launched, hosting is activated, and renewals keep the bot online.'],
];

const quoteEndpoint = import.meta.env.VITE_QUOTE_ENDPOINT || 'https://trinity-bots-quotes.trinitybots.workers.dev';
const cloudflareAnalyticsToken = import.meta.env.VITE_CLOUDFLARE_ANALYTICS_TOKEN;

const initialQuoteDraft = {
  discord: '',
  serverSize: '',
  botType: '',
  commands: '',
  hosting: '',
  timeline: '',
  details: '',
  termsAccepted: false,
};

const initialReviewDraft = {
  name: '',
  discord: '',
  projectType: '',
  rating: '5',
  reviewText: '',
  reviewConsent: false,
};

function getComplexity(commands) {
  const count = Number(commands);
  if (!count) return 'Not selected';
  if (count <= 6) return 'Small bot';
  if (count <= 15) return 'Standard bot';
  return 'Advanced bot';
}

function TermsPage() {
  return (
    <main>
      <nav className="nav static-nav">
        <a href="./" className="brand" aria-label="Trinity Bots home">
          <span className="brand-mark image-mark"><img src="./trinity-bots-logo.png" alt="" /></span>
          <span>Trinity Bots</span>
        </a>
        <div className="nav-links" aria-label="Page navigation">
          <a href="./">Home</a>
          <a href="#/privacy">Privacy</a>
        </div>
        <a className="nav-cta" href="./#quote">Quote</a>
      </nav>
      <section className="legal-page">
        <p className="section-kicker">Terms</p>
        <h1>Trinity Bots Service Terms</h1>
        <p>
          These terms explain how custom bot builds, hosting, support, renewals,
          payment records, and client responsibilities work. They are written for
          clarity before payment and do not override PayPal, Discord, hosting provider,
          or local law requirements.
        </p>
        <div className="legal-grid">
          {serviceTerms.map(([title, text]) => (
            <article className="term-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <a className="button primary legal-cta" href="./#quote">Request a quote</a>
      </section>
    </main>
  );
}

function PrivacyPage() {
  const privacySections = [
    ['Information collected', 'The quote and review forms may collect Discord username, server size, bot type, estimated command count, hosting period, timeline, project details, review text, and display name.'],
    ['How it is used', 'The information is used to review the request, prepare a quote, discuss the project, and keep records of the agreed work.'],
    ['Where it is sent', 'Quote requests and review submissions are sent to a private Trinity Bots Discord channel through a secure endpoint. The Discord webhook is not exposed in the public website code.'],
    ['Analytics', 'The site may use cookie-free Cloudflare Web Analytics to understand visits and page usage without collecting quote form details through analytics.'],
    ['Retention', 'Project messages, quote details, payment references, and delivery notes may be kept as service records, especially if a dispute, support request, renewal, or project question happens later.'],
    ['Sharing', 'Trinity Bots does not sell quote form information. Information may be shared only where needed to provide the service, comply with platform rules, or respond to payment/provider disputes.'],
  ];

  return (
    <main>
      <nav className="nav static-nav">
        <a href="./" className="brand" aria-label="Trinity Bots home">
          <span className="brand-mark image-mark"><img src="./trinity-bots-logo.png" alt="" /></span>
          <span>Trinity Bots</span>
        </a>
        <div className="nav-links" aria-label="Page navigation">
          <a href="./">Home</a>
          <a href="#/terms">Terms</a>
        </div>
        <a className="nav-cta" href="./#quote">Quote</a>
      </nav>
      <section className="legal-page">
        <p className="section-kicker">Privacy</p>
        <h1>Privacy Policy</h1>
        <p>
          This policy explains how Trinity Bots handles quote form information.
          It is a simple site policy, not legal advice.
        </p>
        <div className="legal-grid">
          {privacySections.map(([title, text]) => (
            <article className="term-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <a className="button primary legal-cta" href="./#quote">Request a quote</a>
      </section>
    </main>
  );
}

function ReviewsPage() {
  const [reviewStatus, setReviewStatus] = useState({ type: 'idle', message: '' });
  const [reviewDraft, setReviewDraft] = useState(initialReviewDraft);
  const [reviewStartedAt, setReviewStartedAt] = useState(() => Date.now());

  useEffect(() => {
    if (cloudflareAnalyticsToken && !document.querySelector('[data-cf-beacon]')) {
      const analyticsScript = document.createElement('script');
      analyticsScript.defer = true;
      analyticsScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      analyticsScript.dataset.cfBeacon = JSON.stringify({ token: cloudflareAnalyticsToken });
      document.head.appendChild(analyticsScript);
    }
  }, []);

  function handleReviewChange(event) {
    const { name, value, type, checked } = event.target;
    setReviewDraft((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleReviewSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!quoteEndpoint) {
      setReviewStatus({
        type: 'error',
        message: 'Review endpoint is not connected yet. Add your VITE_QUOTE_ENDPOINT after deploying the webhook worker.',
      });
      return;
    }

    const formData = new FormData(form);
    const reviewRequest = {
      ...Object.fromEntries(formData.entries()),
      submissionType: 'review',
    };

    setReviewStatus({ type: 'loading', message: 'Sending review for approval...' });

    try {
      const response = await fetch(quoteEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewRequest),
      });

      if (!response.ok) {
        let errorMessage = 'Review submission failed';
        try {
          const errorBody = await response.json();
          errorMessage = errorBody.error || errorMessage;
        } catch {
          errorMessage = `${errorMessage} (${response.status})`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json().catch(() => ({}));
      const reference = result.reference ? ` Reference: ${result.reference}.` : '';
      form.reset();
      setReviewDraft(initialReviewDraft);
      setReviewStartedAt(Date.now());
      setReviewStatus({
        type: 'success',
        message: `Review sent for approval.${reference} Thank you for taking the time to leave feedback.`,
      });
    } catch (error) {
      setReviewStatus({
        type: 'error',
        message: `Could not send the review: ${error.message}. Please message Zrasy directly.`,
      });
    }
  }

  return (
    <main>
      <nav className="nav static-nav">
        <a href="./" className="brand" aria-label="Trinity Bots home">
          <span className="brand-mark image-mark"><img src="./trinity-bots-logo.png" alt="" /></span>
          <span>Trinity Bots</span>
        </a>
        <div className="nav-links" aria-label="Page navigation">
          <a href="./">Home</a>
          <a href="#/terms">Terms</a>
          <a href="#/privacy">Privacy</a>
        </div>
        <a className="nav-cta" href="./#quote">Quote</a>
      </nav>

      <section className="review-page">
        <div className="section-heading">
          <p className="section-kicker">Reviews</p>
          <h1>Leave a Trinity Bots review.</h1>
          <p>
            Reviews are sent to Zrasy first so they can be checked before appearing
            publicly. This keeps the site clean and prevents spam.
          </p>
        </div>

        <form className="quote-form review-form" onSubmit={handleReviewSubmit}>
          <label className="spam-field" aria-hidden="true">
            Company website
            <input type="text" name="companyWebsite" tabIndex="-1" autoComplete="off" onChange={handleReviewChange} />
          </label>
          <input type="hidden" name="startedAt" value={reviewStartedAt} />
          <label>
            Display name
            <input type="text" name="name" placeholder="Example: LucyjonesRP" value={reviewDraft.name} onChange={handleReviewChange} required />
          </label>
          <label>
            Discord username
            <input type="text" name="discord" placeholder="@username" value={reviewDraft.discord} onChange={handleReviewChange} required />
          </label>
          <label>
            Project type
            <select name="projectType" value={reviewDraft.projectType} onChange={handleReviewChange} required>
              <option value="" disabled>Select project type</option>
              <option>Ticket bot</option>
              <option>Moderation bot</option>
              <option>Verification bot</option>
              <option>Community bot</option>
              <option>Hosting/support</option>
              <option>Custom bot</option>
            </select>
          </label>
          <label>
            Rating
            <select name="rating" value={reviewDraft.rating} onChange={handleReviewChange} required>
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>
          </label>
          <label className="full">
            Review
            <textarea name="reviewText" rows="6" placeholder="Tell people what Trinity Bots helped with and how the service was." value={reviewDraft.reviewText} onChange={handleReviewChange} required />
          </label>
          <div className="quote-summary full">
            <p className="card-label">Review preview</p>
            <h3>{reviewDraft.name || 'Your display name'}</h3>
            <div>
              <span>Project</span><strong>{reviewDraft.projectType || 'Not selected'}</strong>
              <span>Rating</span><strong>{reviewDraft.rating} / 5</strong>
            </div>
          </div>
          <label className="terms-check full">
            <input type="checkbox" name="reviewConsent" checked={reviewDraft.reviewConsent} onChange={handleReviewChange} required />
            <span>I confirm this is my own review and Trinity Bots may use it on the website after approval.</span>
          </label>
          <button className="button primary full" type="submit" disabled={reviewStatus.type === 'loading'}>
            {reviewStatus.type === 'loading' ? 'Sending...' : 'Send review'} <Star size={18} />
          </button>
          {reviewStatus.message && (
            <p className={`form-status full ${reviewStatus.type}`} role="status">
              {reviewStatus.message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

function App() {
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' });
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const [quoteDraft, setQuoteDraft] = useState(initialQuoteDraft);

  useEffect(() => {
    if (cloudflareAnalyticsToken && !document.querySelector('[data-cf-beacon]')) {
      const analyticsScript = document.createElement('script');
      analyticsScript.defer = true;
      analyticsScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      analyticsScript.dataset.cfBeacon = JSON.stringify({ token: cloudflareAnalyticsToken });
      document.head.appendChild(analyticsScript);
    }

    const animatedItems = document.querySelectorAll('[data-animate]');

    if (!('IntersectionObserver' in window)) {
      animatedItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' },
    );

    animatedItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  async function handleQuoteSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!quoteEndpoint) {
      setFormStatus({
        type: 'error',
        message: 'Quote endpoint is not connected yet. Add your VITE_QUOTE_ENDPOINT after deploying the webhook worker.',
      });
      return;
    }

    const formData = new FormData(form);
    const quoteRequest = Object.fromEntries(formData.entries());

    setFormStatus({ type: 'loading', message: 'Sending quote request...' });

    try {
      const response = await fetch(quoteEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteRequest),
      });

      if (!response.ok) {
        let errorMessage = 'Quote request failed';
        try {
          const errorBody = await response.json();
          errorMessage = errorBody.error || errorMessage;
        } catch {
          errorMessage = `${errorMessage} (${response.status})`;
        }

        throw new Error(errorMessage);
      }

      form.reset();
      setFormStartedAt(Date.now());
      setQuoteDraft(initialQuoteDraft);
      const result = await response.json().catch(() => ({}));
      const reference = result.reference ? ` Reference: ${result.reference}.` : '';

      setFormStatus({
        type: 'success',
        message: `Quote request sent.${reference} I will review the bot details and reply on Discord with the next steps.`,
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: `Could not send the quote request: ${error.message}. Please message Trinity Bots directly.`,
      });
    }
  }

  function handleQuoteChange(event) {
    const { name, value, type, checked } = event.target;
    setQuoteDraft((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  return (
    <main>
      <nav className="nav">
        <a href="#top" className="brand" aria-label="Trinity Bots home">
          <span className="brand-mark image-mark"><img src="./trinity-bots-logo.png" alt="" /></span>
          <span>Trinity Bots</span>
        </a>
        <div className="nav-links" aria-label="Main navigation">
          <a href="#bots">Bots</a>
          <a href="#process">Process</a>
          <a href="#pricing">Pricing</a>
          <a href="#/reviews">Reviews</a>
          <a href="#quote">Quote</a>
        </div>
        <a className="nav-cta" href="#contact">Start</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-bg" aria-hidden="true">
          <img src="./bot-command-center.png" alt="" />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content" data-animate>
          <div className="hero-logo">
            <img src="./trinity-bots-logo.png" alt="Trinity Bots logo" />
          </div>
          <p className="eyebrow"><Zap size={16} /> Custom Discord bots, built and hosted by Trinity Bots</p>
          <h1>You bring the server idea. I build and host the bot.</h1>
          <p className="hero-copy">
            Trinity Bots creates custom Discord bots for communities, creators, and businesses.
            You pay for the build, then choose hosting and support so your bot stays online,
            maintained, and ready for your members.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">
              Get a quote <ArrowRight size={18} />
            </a>
            <a className="button secondary" href="#pricing">
              View hosting
            </a>
            <a className="button secondary" href="#/reviews">
              Leave a review
            </a>
          </div>
          <div className="signal-strip" aria-label="Service highlights">
            <span><CheckCircle2 size={18} /> Built for you</span>
            <span><Gauge size={18} /> Per-bot hosting</span>
            <span><Headphones size={18} /> Support included</span>
          </div>
        </div>
      </section>

      <section className="section intro" data-animate>
        <div>
          <p className="section-kicker">What you sell</p>
          <h2>A professional service, not a bot builder.</h2>
        </div>
        <p>
          Visitors come to Trinity Bots when they want a bot made for them. They do not
          build it themselves. You plan it, code it, set it up, and keep it hosted so
          they can focus on running their server.
        </p>
      </section>

      <section className="section bot-grid" id="bots" aria-label="Bot types">
        {botTypes.map(({ icon: Icon, title, text }) => (
          <article className="feature-card" key={title} data-animate>
            <div className="icon-box"><Icon size={22} /></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="section packages" data-animate>
        <div className="section-heading">
          <p className="section-kicker">Popular builds</p>
          <h2>Examples clients can instantly understand.</h2>
          <p>
            These are not fixed templates. They show the kind of bots Trinity Bots can
            build, then each project is quoted around the exact commands and systems needed.
          </p>
        </div>
        <div className="package-grid">
          {packageExamples.map((example) => (
            <article className="package-card" key={example.title} data-animate>
              <span>{example.tag}</span>
              <h3>{example.title}</h3>
              <p>{example.text}</p>
              <small>Custom quoted</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" data-animate>
        <div>
          <p className="section-kicker">Hosted for them</p>
          <h2>Built for the client, hosted by Trinity Bots.</h2>
          <p>
            Each bot is deployed to your managed hosting setup. Clients can pay for
            fixed hosting periods per bot, with monitoring, restarts, small updates,
            fixes, and support after launch.
          </p>
        </div>
        <div className="ops-panel" aria-label="Hosting operations preview">
          <div className="ops-row good"><ServerCog size={19} /><span>Bot process</span><strong>Online</strong></div>
          <div className="ops-row"><Clock3 size={19} /><span>Restarts</span><strong>Automatic</strong></div>
          <div className="ops-row warm"><Code2 size={19} /><span>Updates</span><strong>Planned</strong></div>
          <div className="ops-row"><Wrench size={19} /><span>Support</span><strong>Included</strong></div>
        </div>
      </section>

      <section className="section demos" data-animate>
        <div className="section-heading">
          <p className="section-kicker">Demo previews</p>
          <h2>Example bot systems before clients even message.</h2>
          <p>
            These mock panels show the kind of clean systems clients can request.
            They help people picture what they are paying for.
          </p>
        </div>
        <div className="demo-grid">
          {demoPanels.map(([title, details, label]) => (
            <article className="demo-panel" key={title} data-animate>
              <div className="demo-top">
                <PanelTop size={19} />
                <span>{label}</span>
              </div>
              <h3>{title}</h3>
              <p>{details}</p>
              <div className="demo-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section process" id="process">
        <div className="section-heading" data-animate>
          <p className="section-kicker">How it works</p>
          <h2>From client request to hosted bot.</h2>
        </div>
        <div className="steps">
          {steps.map(([title, text], index) => (
            <article className="step" key={title} data-animate>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section payment-flow" data-animate>
        <div className="section-heading">
          <p className="section-kicker">Payment flow</p>
          <h2>Clear steps before any custom work starts.</h2>
          <p>
            This keeps both sides clear on the accepted quote, payment record,
            build start, delivery, and hosting renewal process.
          </p>
        </div>
        <div className="payment-steps">
          {paymentSteps.map(([title, text], index) => (
            <article className="payment-step" key={title} data-animate>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section pricing" id="pricing">
        <div className="section-heading" data-animate>
          <p className="section-kicker">Pricing model</p>
          <h2>Clear pricing for builds and hosting.</h2>
          <p>
            Bot builds are quoted per project because every server needs something different.
            Hosting is fixed per bot, so clients know exactly what it costs to keep their bot online.
          </p>
        </div>
        <div className="pricing-layout">
          <article className="quote-card featured" data-animate>
            <p className="card-label">Bot build</p>
            <h3>Custom quote per bot</h3>
            <p>
              Build price depends on what they want made, how many commands are needed,
              how advanced the systems are, and how much setup is required.
            </p>
            <ul>
              {quoteFactors.map((factor) => (
                <li key={factor}><Check size={17} /> {factor}</li>
              ))}
            </ul>
          </article>

          <article className="hosting-card" data-animate>
            <div className="hosting-card-head">
              <p className="card-label">Hosting</p>
              <h3>Fixed prices per bot</h3>
            </div>
            <div className="hosting-list" aria-label="Hosting prices">
              {hostingPrices.map(([duration, price]) => (
                <div className="hosting-row" key={duration}>
                  <span>{duration}</span>
                  <strong>{price}</strong>
                </div>
              ))}
            </div>
            <p className="hosting-note">
              Hosting is charged per bot. If hosting expires, the bot may go offline until the next period is renewed.
            </p>
          </article>
        </div>
      </section>

      <section className="section estimates" data-animate>
        <div className="section-heading">
          <p className="section-kicker">Build guide</p>
          <h2>Estimate complexity before asking for a quote.</h2>
          <p>
            These are not fixed prices. They help clients understand why a simple bot,
            standard bot, and advanced bot may be quoted differently.
          </p>
        </div>
        <div className="estimate-grid">
          {estimateGuide.map(([title, range, text]) => (
            <article className="estimate-card" key={title} data-animate>
              <ClipboardList size={20} />
              <span>{range}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section trust-band" data-animate>
        <div><ShieldCheck size={21} /><span>Private testing before launch</span></div>
        <div><ServerCog size={21} /><span>Hosted and monitored per bot</span></div>
        <div><MessagesSquare size={21} /><span>Clear updates during the build</span></div>
        <div><FileText size={21} /><span>Quoted around your exact features</span></div>
      </section>

      <section className="section status-block" data-animate>
        <div>
          <p className="section-kicker">Service status</p>
          <h2>Built to look active, managed, and accountable.</h2>
        </div>
        <div className="status-grid">
          {statusStats.map(([label, value]) => (
            <div className="status-card" key={label}>
              <HardDrive size={18} />
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section standards" data-animate>
        <div className="section-heading">
          <p className="section-kicker">Project standards</p>
          <h2>Built with a proper launch process.</h2>
          <p>
            Every quote is shaped around the server, the command list, the systems needed,
            and how the bot will be hosted after launch.
          </p>
        </div>
        <div className="standards-grid">
          {standards.map((standard) => (
            <div className="standard-item" key={standard} data-animate>
              <CheckCircle2 size={19} />
              <span>{standard}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section handoff" data-animate>
        <div className="section-heading">
          <p className="section-kicker">Client handoff</p>
          <h2>What clients should prepare.</h2>
          <p>
            The more complete the request is, the faster Trinity Bots can quote,
            build, test, and launch the bot.
          </p>
        </div>
        <div className="handoff-list">
          {handoffItems.map((item) => (
            <div className="handoff-item" key={item} data-animate>
              <Check size={17} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section terms" data-animate>
        <div className="section-heading">
          <p className="section-kicker">Service notes</p>
          <h2>Terms that keep the project clear.</h2>
          <p>
            These notes are written for clarity before a client pays. They are not legal
            advice and do not override PayPal, Discord, hosting provider, or local law requirements.
          </p>
        </div>
        <div className="terms-grid">
          {serviceTerms.map(([title, text]) => (
            <article className="term-card" key={title} data-animate>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section faq" data-animate>
        <div className="section-heading">
          <p className="section-kicker">Questions</p>
          <h2>Simple answers before they message you.</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details className="faq-item" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section quote-section" id="quote" data-animate>
        <div className="section-heading">
          <p className="section-kicker">Quote form</p>
          <h2>Collect the details needed to price the build.</h2>
          <p>
            Submissions can be sent straight to a private Discord channel through a
            small secure endpoint, keeping the webhook hidden from the public website.
          </p>
        </div>
        <form className="quote-form" onSubmit={handleQuoteSubmit}>
          <label className="spam-field" aria-hidden="true">
            Company website
            <input type="text" name="companyWebsite" tabIndex="-1" autoComplete="off" onChange={handleQuoteChange} />
          </label>
          <input type="hidden" name="startedAt" value={formStartedAt} />
          <label>
            Discord username
            <input type="text" name="discord" placeholder="username#0000 or @username" value={quoteDraft.discord} onChange={handleQuoteChange} required />
          </label>
          <label>
            Server size
            <select name="serverSize" value={quoteDraft.serverSize} onChange={handleQuoteChange} required>
              <option value="" disabled>Select size</option>
              <option>Under 100 members</option>
              <option>100 - 1,000 members</option>
              <option>1,000 - 10,000 members</option>
              <option>10,000+ members</option>
            </select>
          </label>
          <label>
            Bot type
            <select name="botType" value={quoteDraft.botType} onChange={handleQuoteChange} required>
              <option value="" disabled>Select bot type</option>
              <option>Moderation bot</option>
              <option>Ticket bot</option>
              <option>Verification bot</option>
              <option>Community bot</option>
              <option>Custom automation</option>
            </select>
          </label>
          <label>
            Estimated commands
            <input type="number" name="commands" min="1" placeholder="Example: 12" value={quoteDraft.commands} onChange={handleQuoteChange} required />
          </label>
          <label>
            Hosting period
            <select name="hosting" value={quoteDraft.hosting} onChange={handleQuoteChange} required>
              <option value="" disabled>Select hosting</option>
              {hostingPrices.map(([duration, price]) => (
                <option key={duration}>{duration} - {price}</option>
              ))}
            </select>
          </label>
          <label>
            Timeline
            <input type="text" name="timeline" placeholder="Example: within 1-2 weeks" value={quoteDraft.timeline} onChange={handleQuoteChange} />
          </label>
          <label className="full">
            What should the bot do?
            <textarea name="details" rows="5" placeholder="List commands, systems, roles, tickets, moderation, dashboards, webhooks, or anything custom." value={quoteDraft.details} onChange={handleQuoteChange} required />
          </label>
          <div className="quote-summary full" aria-live="polite">
            <p className="card-label">Quote preview</p>
            <h3>{getComplexity(quoteDraft.commands)} request</h3>
            <div>
              <span>Bot type</span><strong>{quoteDraft.botType || 'Not selected'}</strong>
              <span>Commands</span><strong>{quoteDraft.commands || 'Not set'}</strong>
              <span>Hosting</span><strong>{quoteDraft.hosting || 'Not selected'}</strong>
              <span>Server size</span><strong>{quoteDraft.serverSize || 'Not selected'}</strong>
            </div>
          </div>
          <label className="terms-check full">
            <input type="checkbox" name="termsAccepted" checked={quoteDraft.termsAccepted} onChange={handleQuoteChange} required />
            <span>I understand builds are custom quoted, hosting must be renewed to stay online, and I have read the <a href="#/terms">Terms</a>.</span>
          </label>
          <button className="button primary full" type="submit" disabled={formStatus.type === 'loading'}>
            {formStatus.type === 'loading' ? 'Sending...' : 'Send quote request'} <Rocket size={18} />
          </button>
          {formStatus.message && (
            <p className={`form-status full ${formStatus.type}`} role="status">
              {formStatus.message}
            </p>
          )}
        </form>
      </section>

      <section className="section contact" id="contact" data-animate>
        <div>
          <p className="section-kicker">Ready for clients</p>
          <h2>Turn enquiries into proper bot quotes.</h2>
          <p>
            The form above sends quote requests straight into the private Trinity Bots
            Discord channel, with the details needed to price the build properly.
          </p>
          <p className="contact-line">Discord contact: <strong>Zrasy</strong></p>
        </div>
        <a className="button primary" href="#quote">
          Start a quote <Rocket size={18} />
        </a>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-mark image-mark"><img src="./trinity-bots-logo.png" alt="" /></span>
          <div>
            <strong>Trinity Bots</strong>
            <p>Custom Discord bots built, hosted, and supported by Zrasy.</p>
          </div>
        </div>
        <div className="footer-links">
          <a href="#bots">Bots</a>
          <a href="#pricing">Pricing</a>
          <a href="#quote">Quote</a>
          <a href="#/reviews">Reviews</a>
          <a href="#/terms">Terms</a>
          <a href="#/privacy">Privacy</a>
        </div>
        <p className="footer-note">Quotes are reviewed manually by Zrasy. Hosting remains offline until renewed if a hosting period expires.</p>
        <p className="copyright">© {new Date().getFullYear()} Trinity Bots. All rights reserved.</p>
      </footer>
    </main>
  );
}

const redirect = sessionStorage.redirect;
if (redirect) {
  delete sessionStorage.redirect;
  window.history.replaceState(null, '', redirect);
}

function getCurrentRoute() {
  const hashRoute = window.location.hash.startsWith('#/') ? window.location.hash.slice(1).replace(/\/$/, '') : '';
  const pathRoute = window.location.pathname.replace(/^\/trinity-bots/, '').replace(/\/$/, '');
  return hashRoute || pathRoute;
}

function Router() {
  const [route, setRoute] = useState(getCurrentRoute);

  useEffect(() => {
    const updateRoute = () => setRoute(getCurrentRoute());
    window.addEventListener('hashchange', updateRoute);
    window.addEventListener('popstate', updateRoute);
    return () => {
      window.removeEventListener('hashchange', updateRoute);
      window.removeEventListener('popstate', updateRoute);
    };
  }, []);

  if (route === '/terms') return <TermsPage />;
  if (route === '/privacy') return <PrivacyPage />;
  if (route === '/reviews') return <ReviewsPage />;
  return <App />;
}

createRoot(document.getElementById('root')).render(<Router />);
