# Bharat Factory AI — GTM Launch Repo

> **Pilot launch:** 2026-04-22, 9am IST
> **Scope:** 10 SDRs · 1-week pilot · 6 hot geos · target 700–1,000 workers closed
> **Review by:** @abhishek @varun

---

## 🎯 Two-track GTM

This repo powers **two distinct funnels** — please keep them separate in review.

### Track A — Direct Factory Owners
- **LP (EN):** https://bharat-factory-ai.salesup.workers.dev
- **LP (Hindi):** https://bharat-factory-ai.salesup.workers.dev/hi
- **Offer:** ₹4 lakh/month per 100 workers · free ₹20L efficiency report · robot early access
- **Channels:** SDR cold calls, cold WhatsApp, Meta + Google ads

### Track B — Referrers (CAs, consultants, suppliers, associations)
- **LP:** https://bharat-factory-ai.salesup.workers.dev/refer
- **Offer:** ₹25,000 cash per closed factory intro · no cap · 48-hr UPI payout
- **Channels:** LinkedIn DM, WhatsApp, industry-body outreach

---

## Read order

1. [`handoff-abhishek/README.md`](./handoff-abhishek/README.md) — cold-start context
2. [`handoff-abhishek/00-full-context.md`](./handoff-abhishek/00-full-context.md) — single source of truth (commercials, ICP, stealth, Make-in-India positioning)
3. [`handoff-abhishek/transcripts/`](./handoff-abhishek/transcripts) — Varun's verbatim pitch + unit economics + testimonials + efficiency-report walkthrough

## GTM artefacts — Track A (direct factory owners)

| Doc | What it is |
|---|---|
| [`icp-and-qualification.md`](./icp-and-qualification.md) | ICP + A/B/C/D qualification tiers + 4 disco questions |
| [`sdr-cold-call-script.md`](./sdr-cold-call-script.md) | Full SDR script with Make-in-India framing, 4 gatekeeper openers, 3 DM opener variants, pitch, 12 objection handlers, referral ask |
| [`whatsapp-templates.md`](./whatsapp-templates.md) | 10 post-call WhatsApp templates (hot/warm/demo/NDA/pilot kickoff/payout/referral) |
| [`whatsapp-cold-outbound-factory.md`](./whatsapp-cold-outbound-factory.md) | 6 cold outbound WhatsApp templates (Day 0 cold + 3-touch sequence + gatekeeper route + post-close referral) |
| [`lead-journey.md`](./lead-journey.md) | 10-stage lead map with owners, SLAs, exit criteria |
| [`ad-targeting-spec.md`](./ad-targeting-spec.md) | Meta $350 + Google $250 split, 4 Meta ad sets, creative selection, conversion stack |
| [`creatives/`](./creatives) | 12 original ad visuals (fal.ai) |
| [`creatives-mii/`](./creatives-mii) | Same 12 creatives with Make-in-India tricolor badge (1200×1200) |

## GTM artefacts — Track B (referrers)

| Doc | What it is |
|---|---|
| [`referrer-outreach.md`](./referrer-outreach.md) | Full referrer playbook: LinkedIn connection note, 5 LinkedIn DM variants (CA/consultant/supplier/association/industry voice), 3-touch WhatsApp sequence, cold WhatsApp, objection handling, 30-seed distribution plan |
| [`referral-program.md`](./referral-program.md) | Program design: ₹25k/factory mechanic, SDR internal split (₹15k/₹5k/₹2k/₹3k), anti-fraud, tracking, launch steps |
| [`creatives-referrer/`](./creatives-referrer) | 4 referrer-focused creatives (clean + tagged variants with "Earn ₹25k per factory intro" MII badge) |
| [`bharat-factory-lp/public/refer/`](./bharat-factory-lp/public/refer) | Referrer LP source (hero, scale strip, 3-step how, 8 personas, form with "You + Factory" split fields, FAQ) |

## Public-facing

- **Main LP (factory owners, EN):** https://bharat-factory-ai.salesup.workers.dev
- **Main LP (factory owners, Hindi):** https://bharat-factory-ai.salesup.workers.dev/hi
- **Referral LP (referrers):** https://bharat-factory-ai.salesup.workers.dev/refer
- LP source: [`bharat-factory-lp/`](./bharat-factory-lp)

---

## Open approvals before 9am IST

| # | Who | What | Why blocking |
|---|---|---|---|
| 1 | **Varun** | Green-light on Indian brand logos on LP trust bar (Tata Steel, MRF, Dabur, Mahindra, JSW, L&T, Aditya Birla) | Stealth risk if any isn't actually onboard |
| 2 | **Varun** | Real numbers for impact strip (₹109 Cr disbursed · ₹340 Cr productivity · 21 lakh hrs — last two are placeholders) | Misleading-claim risk |
| 3 | **Varun** | Contract/invoicing POC confirmed | Go-live blocker |
| 4 | **Varun** | Hardware ship SLA (48 hrs after MOU) — confirm headset stock for ~25 concurrent deployments | Hits the 700-worker guarantee |
| 5 | **Varun + Abhishek** | Confirm Make-in-India / PLI / Atmanirbhar Bharat framing — we're *aligned with*, not *claiming to be* a govt scheme | IT Act / compliance |
| 6 | **Abhishek** | Real Bharat Factory AI WhatsApp + call number to replace placeholder `+91 99999 99999` everywhere | All CTAs broken otherwise |
| 7 | **Abhishek** | CRM / dialer / referral tracking tool (assumption: Google Sheet or Zoho) | Lead capture backend |
| 8 | **Abhishek** | SDR compensation split for internal referral layer approved | Tonight's SDR training |
| 9 | **Abhishek** | Meta + Google ad account owner + pixel/CAPI setup | Ads can't flight without this |
| 10 | **Abhishek** | Domain preference — `bharatfactory.ai` / `.in` / stay on `.workers.dev` | Branding before ads |

---

## Not in this repo (on purpose)

- Calling data CSV (contains 1,500+ factory phone numbers — handled separately)
- Raw testimonial videos (hosted on LPs)
- Secrets / API keys / Slack tokens

---

**Built overnight (2026-04-21) by Yash + Miskat + Claude Code second-brain.**
