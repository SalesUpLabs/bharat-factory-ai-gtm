# Outreach Scope — Reaching Manufacturers Fast

> **Problem:** Ads + SDR cold calls + referral get us a steady trickle — but we need volume to hit 700→1,000 workers/week and scale past pilot week. Diversify channels now.
>
> **Principle:** Each channel has a different **CAC, speed, quality, and scale ceiling**. Don't double down on one — run 5 in parallel, measure, double down on winners by Day 4.

---

## Channel inventory (scored 1–5 · higher = better)

| # | Channel | Reach | Speed to first lead | Cost | Lead quality | Scale ceiling | **Score** |
|---|---|---|---|---|---|---|---|
| 1 | **Meta + Google ads** (already running) | 4 | 4 | 2 | 3 | 4 | **17** |
| 2 | **SDR cold calls** (Blitz list, already running) | 3 | 5 | 3 | 4 | 3 | **18** |
| 3 | **Referral program** (already running) | 3 | 3 | 5 | 5 | 4 | **20** |
| 4 | **IndiaMART directory scrape** | **5** | 5 | 5 | 3 | 5 | **23** 🎯 |
| 5 | **Udyam + MCA scrape** (govt-registered MSMEs) | **5** | 4 | 5 | 4 | 5 | **23** 🎯 |
| 6 | **Industry associations** (FICCI/CII/AEPC/PLEXCONCIL bulk email via admin) | 3 | 2 | 4 | 5 | 3 | **17** |
| 7 | **Bank MSME RM partnerships** (HDFC/ICICI/Axis/SBI) | 3 | 2 | 3 | 5 | 4 | **17** |
| 8 | **LinkedIn Sales Navigator outbound** (factory owner filter) | 4 | 4 | 3 | 5 | 4 | **20** |
| 9 | **Google Maps scrape** (geo-specific "manufacturer") | 4 | 5 | 5 | 3 | 4 | **21** 🎯 |
| 10 | **JustDial / Sulekha scrape** (MSME-heavy regional listings) | 4 | 5 | 4 | 3 | 4 | **20** |
| 11 | **Trade show booth / cold walking** (IME, Plastivision, Engineering Expo) | 3 | 2 | 2 | 5 | 2 | **14** |
| 12 | **Industrial estate on-ground** (MIDC / Peenya / Sanand gate-to-gate) | 3 | 3 | 3 | 5 | 2 | **16** |
| 13 | **Bank / NBFC loan-officer channel partnerships** (Tata Cap, Bajaj, Aditya Birla Fin) | 3 | 2 | 4 | 5 | 4 | **18** |
| 14 | **CA firm bulk partnership** (top 50 MSME firms) | 3 | 3 | 4 | 5 | 4 | **19** |
| 15 | **WhatsApp industry groups** (Gujarat textile, Tirupur garment, Pune auto) | 4 | 3 | 5 | 4 | 3 | **19** |
| 16 | **YouTube/Instagram factory-owner content creators** (micro-influencer warm intro) | 3 | 3 | 4 | 4 | 3 | **17** |
| 17 | **PR — ET / Business Standard / Outlook** (India's factory AI initiative angle) | 5 | 1 | 3 | 3 | 3 | **15** |
| 18 | **Power utility / discom commercial-connection lists** | 5 | 1 | 2 | 5 | 5 | **18** (low speed) |

---

## Top 5 channels to **pilot this week** (Day 2–7, in addition to what's live)

### 1. 🎯 IndiaMART directory scrape — **START DAY 2**
- **Scale ceiling:** ~2M+ MSME listings with verified contact info
- **Data points:** company name, owner name, phone (often verified), city, product category, year of establishment
- **Execution:**
  - Use Firecrawl or Playwright to scrape categories: textile mills, auto components, FMCG packaging, metal fab, electronics assembly
  - Target: 10,000 rows in 48 hours
  - Dedupe against Blitz list, enrich phone via Hatch
- **Owner:** Data team (overnight + next-day push)
- **Risk:** IndiaMART anti-scrape (CAPTCHAs). Fallback: manual buy API access (~₹50K for 10K contacts)

### 2. 🎯 Udyam + MCA scrape — **START DAY 2**
- **What:** Official govt MSME registration DB (Udyam — 2+ crore registered) + MCA director-level filings
- **Why:** Authoritative, includes exact worker count bands, industry code, registered address
- **Execution:**
  - Udyam: https://udyamregistration.gov.in/ — public data search API
  - MCA: https://mca.gov.in/ — director DIN + company filings scraping
  - Cross-reference to filter 50–2,000 worker factories only
- **Owner:** Data team
- **Risk:** Both sites rate-limit. Use rotating proxies + 5 req/sec cap.

### 3. 🎯 Google Maps scrape — **START DAY 3**
- **What:** For each of 6 hot geos, scrape "manufacturer", "factory", industry-specific keywords
- **Why:** Faster than Blitz for regional coverage, captures MSMEs not in formal databases
- **Execution:**
  - Use SerpAPI or Apify's Google Maps scraper
  - Cost: ~₹3/scrape × 10K scrapes = ₹30K for ~10K businesses
- **Owner:** Data team
- **Output:** name, address, phone (70% coverage, better than Blitz 1%), category, reviews

### 4. LinkedIn Sales Navigator outbound — **START DAY 2**
- **Why:** High-quality DM channel, 80% reach rate for owners/plant heads
- **Execution:**
  - Filter: "Manufacturing" industry, job titles (Owner/MD/CEO/Plant Head), location India, company size 51-1000
  - Target 200 connection requests/day × 10 SDRs = 2,000 invites/day
  - Use HeyReach MCP (already in SalesUp stack) for automation
- **Owner:** Miskat + SDR team
- **Risk:** LinkedIn caps — stay under 100 connections/day per account to avoid bans

### 5. Bank MSME RM channel — **START DAY 4**
- **Why:** Each RM manages 100+ factory accounts. 20 RMs = 2,000 warm intros.
- **Execution:**
  - Direct DM / phone to bank MSME RMs at HDFC, ICICI, Axis, SBI, Bandhan
  - Pitch: "₹25K per closed factory intro for your clients" (Track B referral)
  - Partnership deck: revenue share for bank branch if 3+ intros close
- **Owner:** Yash + 1 dedicated BD person
- **Risk:** Slower to activate (compliance approvals), but highest-quality source once live

---

## Backlog (Week 2+)

- JustDial / Sulekha scrape (regional MSMEs)
- Industry association admin outreach (warm bulk email via FICCI/CII member lists)
- CA firm bulk partnership (top 50 MSME-focused firms)
- WhatsApp industry group infiltration (needs seed contact in each group)
- Trade show booth (IME Ahmedabad, Plastivision Mumbai — need ₹2-5L booth cost)
- PR story placement (ET/BS/Outlook — needs 1-2 week lead time)

---

## Tests to run (Week 1)

### Test 1 — Channel-level CAC comparison
- **Hypothesis:** Referral has lowest CAC; IndiaMART-scrape highest volume
- **Measure:** Cost per qualified lead (QL) and cost per pilot-start, by channel
- **Segments:** Ads · Cold SDR (Blitz) · IndiaMART scrape · Udyam scrape · LinkedIn Nav · Referral
- **Cutoff:** Day 5 review — pause any channel >2x median CPL

### Test 2 — Messaging variant (MII framing vs money-first vs FOMO)
- **Hypothesis:** Make-in-India framing has higher open/reply rate vs pure cash offer
- **Execute:**
  - SDRs split into 2 pods: Pod A uses MII-led opener (V1), Pod B uses money-led opener (V2) — from existing `sdr-cold-call-script.md`
  - 500 dials each, measure connect → DM reach → qualified → demo-booked
- **Cutoff:** Day 3 — declare winner, all SDRs switch

### Test 3 — WhatsApp business API vs personal number (trust impact on cold outreach)
- **Hypothesis:** Verified business WA (green tick) = 30% higher reply rate
- **Execute:** Apply for WhatsApp Business API verification in parallel. Route 50% of cold WA through it, 50% through SDR personal WA. Measure reply rate.
- **Cutoff:** Week 2 (WABA verification takes 48-72 hrs)

### Test 4 — Referral drip vs one-shot DM (Track B)
- **Hypothesis:** 3-touch sequence (Day 0 / 3 / 7) converts 2x vs single cold DM
- **Execute:** First 100 referrer DMs split 50/50 — one-shot vs 3-touch. Measure intros/referrer.
- **Cutoff:** Day 10

---

## Data infrastructure needed

| # | Infra | Why | Owner |
|---|---|---|---|
| 1 | **Master lead DB** (Google Sheet / Airtable for week 1, then Zoho CRM) | Single source of truth, dedup across channels | Abhishek |
| 2 | **Channel-tag field** (`source = ads/sdr-call/indiamart/udyam/linkedin/referral/...`) | Measure CAC per channel | Abhishek |
| 3 | **Phone enrichment pipeline** (Hatch → Apollo → Lusha cascade overnight job) | Blitz gave 1% coverage; need 70%+ | Data team |
| 4 | **Tracking pixels on all LPs** (Meta Pixel, Google Ads tag, GTM) | Ads → lead attribution | Abhishek |
| 5 | **WhatsApp Business API verification** (Meta Business Manager → WABA) | Credible outbound WA + higher reply rate | Abhishek + Meta business rep |
| 6 | **UTM tagging on every link shared externally** | Attribute intros to source | Every SDR |
| 7 | **Referrer dashboard** (after 3 intros — promised on `/refer` LP FAQ) | Retention lever for top referrers | Abhishek (Week 2) |
| 8 | **Dedup logic across Blitz + IndiaMART + Udyam + GMaps** | Don't pay twice for same factory | Data team |

---

## Day-by-day action plan (post 9am go-live)

| Day | New channels going live | Daily output target |
|---|---|---|
| **Day 1 (Tue)** | Existing: ads + SDR calls + referral | 150 dials · 40 ad leads · 5 referrer DMs |
| **Day 2** | + IndiaMART scrape (10K rows) · + Udyam scrape (5K rows) · + LinkedIn Nav (100 invites/SDR) | Above + 500 new leads in CRM |
| **Day 3** | + Google Maps scrape (6 cities) · messaging A/B test starts | Above + 300 new leads |
| **Day 4** | + Bank RM outreach (Yash personally) · Day-5 channel review | Above + 10 warm RM conversations |
| **Day 5** | **Pause underperforming channels.** Double spend on winners. WABA verification live. | Pilot closes start hitting |
| **Day 6-7** | + JustDial scrape · + CA firm bulk outreach (top 20) | Pilot #1-5 live, referral flywheel activates |
| **Week 2** | + Trade show booking · + PR outreach · + industry group seeding | Scale to 20 SDRs, 2,000 leads/day |

---

## What we're **not** doing Week 1 (on purpose)

- Cold email at scale — spam risk, slower conversion than WA
- Facebook group posting — too low-signal for factory owners
- TV/radio ads — CAC too high for MSME targeting
- Email drip nurture — unless we cross 500 MQLs, not worth building
- Self-serve portal / dashboard — over-engineered for Week 1 scale

---

## Open decisions for Yash + Abhishek

1. **Buy IndiaMART API access** (~₹50K for 10K verified contacts) or scrape-only route?
2. **LinkedIn Sales Navigator** — who has the SN seat? Yash's account or buy 2 more?
3. **Bank RM outreach pitch** — do we offer the RM their own commission (on top of ₹25K referral)? Suggestion: ₹5K per RM-sourced closed intro.
4. **WhatsApp Business API** — apply via Meta Business Manager tonight so we have green tick by Day 3-4.
5. **Dedicated data analyst** for Week 1 — need 1 person on enrichment + dedup full-time. Miskat or external hire?
6. **Channel budget** — beyond $600 ads, willing to spend ~₹100K on data scraping/API + ~₹50K on WABA + ~₹50K on LinkedIn Nav seats in Week 1?

---

**Expected compounded output (Week 1 vs Week 2):**

| Metric | Week 1 (with 5 channels live) | Week 2 (optimizing winners + add 3 more) |
|---|---|---|
| Total leads in CRM | 3,000 | 8,000 |
| Qualified leads (50+ workers, right ICP) | 900 | 2,800 |
| Demos booked | 60 | 180 |
| Pilots closed | 15 | 40 |
| Workers covered | 3,000–4,500 | 8,000–12,000 |

Pilot guarantee (700 workers) easily hit by Day 4. Stretch goal (1,000) by Day 5. Week 2 trajectory puts us at 10K workers = ~₹90 Cr in factory-side annual payout commitment from Build.ai.
