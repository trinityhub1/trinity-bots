# Trinity Bots Quote Worker

This Cloudflare Worker receives the quote form submission and sends it to a private Discord webhook.

Do not put the Discord webhook URL in the React app. Store it as a Worker secret named:

```text
DISCORD_WEBHOOK_URL
```

Optional environment variable:

```text
ALLOWED_ORIGIN=https://your-github-pages-site-url
```

After deploying the Worker, set this in the React site build environment:

```text
VITE_QUOTE_ENDPOINT=https://your-worker-name.your-subdomain.workers.dev
```

## Deploy

From the project root:

```bash
npm.cmd install -D wrangler
npm.cmd run secret:discord
npm.cmd run deploy:worker
```

When `secret:discord` asks for a value, paste your Discord webhook URL.

After deploy, Cloudflare will print a Worker URL. Put that URL in `.env.local` for local testing:

```text
VITE_QUOTE_ENDPOINT=https://trinity-bots-quotes.your-subdomain.workers.dev
```

Then restart the dev server.

For GitHub Pages, add the same `VITE_QUOTE_ENDPOINT` value as a repository secret or Actions variable before building.

For local testing, create `.env.local` in the project root:

```text
VITE_QUOTE_ENDPOINT=https://your-worker-name.your-subdomain.workers.dev
```

Then run:

```bash
npm.cmd run dev
```
