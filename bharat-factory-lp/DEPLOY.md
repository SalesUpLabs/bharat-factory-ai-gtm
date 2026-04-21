# Deploy — bharataifactory.com

## One-time setup

1. Install deps (uses local wrangler):
   ```
   cd bharat-factory-lp
   npm install
   ```

2. Log in to the Cloudflare account that owns the `bharataifactory.com` zone:
   ```
   npx wrangler login
   ```

3. Set the Slack webhook secret (prod):
   ```
   npm run secret:slack
   # paste the Slack Incoming Webhook URL when prompted
   ```

4. For local dev, create `bharat-factory-lp/.dev.vars` (gitignored):
   ```
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ
   ```

## Deploy

```
npm run deploy
```

On first deploy, wrangler provisions `bharataifactory.com` and `www.bharataifactory.com` as Custom Domains for this Worker (auto-creates the hostname + cert). The zone must already exist in the same Cloudflare account.

## Dev

```
npm run dev        # local preview on http://localhost:8787
npm run tail       # stream prod logs
```

## Lead flow

`POST /api/lead` → Slack webhook (from `SLACK_WEBHOOK_URL` secret). If the secret is unset, leads fall back to `console.log` (visible in `wrangler tail`).
