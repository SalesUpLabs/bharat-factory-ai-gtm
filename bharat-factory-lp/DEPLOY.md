# Deploy — bharataifactory.com

This Worker auto-deploys via **Cloudflare Workers Builds** (CI) when `main` is pushed.

## One-time setup (Cloudflare dashboard)

If a **Pages** project was previously connected to this repo, delete / disconnect it first — it can't build this project and will keep failing.

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Workers** → **Import a repository**.
2. Pick the `SalesUpLabs/bharat-factory-ai-gtm` repo and `main` branch.
3. Build settings (leave **Root directory** blank — the repo-root `package.json` handles it):
   - **Build command**: `npm run build`
   - **Deploy command**: `npm run deploy`

   These delegate into `bharat-factory-lp/` via `npm --prefix`, so the build works whether or not the Root Directory field is respected by CF. If you'd rather set Root Directory = `bharat-factory-lp`, use build `npm ci` and deploy `npx wrangler deploy` instead.
4. Create the Worker. The first deploy will also provision the custom domains from `wrangler.toml` (`bharataifactory.com`, `www.bharataifactory.com`) — the zone must already live in the same Cloudflare account.
5. Worker → **Settings → Variables and Secrets** → add secret `SLACK_WEBHOOK_URL` (encrypted) with the Slack Incoming Webhook URL. Redeploy for it to take effect.

After this, every push to `main` triggers a new deploy.

## Local dev

```
cd bharat-factory-lp
npm install
npx wrangler login
```

Create `bharat-factory-lp/.dev.vars` (gitignored) for local Slack testing:

```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ
```

Then:

```
npm run dev       # local preview on http://localhost:8787
npm run tail      # stream prod logs
```

## Manual deploy (bypass CI)

```
cd bharat-factory-lp
npm run secret:slack   # one-time, if not already set via dashboard
npm run deploy
```

## Lead flow

`POST /api/lead` → Slack webhook (from `SLACK_WEBHOOK_URL` secret, fire-and-forget via `ctx.waitUntil`). If the secret is unset, leads fall back to `console.log` (visible via `npm run tail`).
