# Data Sourcing — Vendor Race (Day 0 tonight)

> **Target:** 5,000–10,000 high-quality Indian manufacturer contacts with direct mobiles by Day 1 morning
> **Budget:** ₹8,000 (fits the $100 data line in Varun's contract) + INR 50K follow-on potential if quality holds
> **Approach:** Parallel RFQ to 9 Indian B2B database vendors · whoever sends cleanest sample first wins the order

---

## Vendor status — live scoreboard

| Vendor | Email status | Phone | WhatsApp | Contact form |
|---|---|---|---|---|
| **allindiadatabase.com** | ✅ Resent to real addresses | +91 95997 16421 | **+91 95997 16421** | [allindiadatabase.com/contact](https://www.allindiadatabase.com/contact/) |
| **99datacd.com** | ✅ Delivered (sales@) | **85878 04924** | — | [99datacd.com/contact-us.html](https://www.99datacd.com/contact-us.html) |
| **77data.net** | ✅ Delivered (info@) | **08882 95 6467** | — | [77data.net](https://www.77data.net/) |
| **cypherexim.com** | ✅ Delivered (sales@) | — | — | [cypherexim.com/company/contact](https://www.cypherexim.com/company/contact) |
| **binaryclues.com** | ✅ Delivered (info@) | +91 95133 92455 | **+91 78807 87555** | [binaryclues.com/contact](https://www.binaryclues.com/contact) |
| **mlgindia.com** | ❌ Bounced · use contact form | +91 98194 21432 | — | [mlgindia.com/get-in-touch](https://mlgindia.com/get-in-touch/) |
| **companydatabase.in** | ✅ Resent to real addresses (bestcallcenter.in + kapsystem.com) | +91 78295 60000 | **+91 78295 60000** | [companydatabase.in/contact-us](https://companydatabase.in/contact-us/) |
| **leadfunction.com** | ✅ Delivered (info@) | +91 93400 64955 | — | [leadfunction.com/contact-us](https://leadfunction.com/contact-us) |
| **datasolutionsexperts.com** | ❌ Domain dead | — | — | — |

**19 total emails sent across 2 rounds** · 9 bounced on generic addresses · 10 landed · 5 more sent to verified addresses in round 3

---

## RFQ ask (same for all vendors)

**Slices requested:**
1. Textile / Garment Manufacturers — Karnataka + Tamil Nadu + Gujarat
2. Auto Components — Maharashtra + Tamil Nadu + Karnataka
3. FMCG / Food / Packaging — Gujarat + Maharashtra
4. Electronics — Karnataka + Tamil Nadu

**Pre-purchase questions (4):**
1. Free 50-row sample (company name · owner/MD name · DIRECT MOBILE · city · employee count · industry)
2. Last verified/updated date? (need <12 months old)
3. % of records with direct mobile (not switchboard/landline/fax)?
4. Replacement/refund policy if >30% mobiles are dead?

**Decision rule:** Whichever vendor sends clean sample first wins the order.

---

## WhatsApp-direct shortcut (3 vendors only)

These 3 have WhatsApp numbers listed publicly. WhatsApp them directly **right now** — much faster than email:

```
+91 95997 16421  ← allindiadatabase.com
+91 78807 87555  ← binaryclues.com
+91 78295 60000  ← companydatabase.in
```

**WhatsApp message to paste:**

> Hi, saw your B2B manufacturer database service online.
>
> Need to buy tonight — INR 8K budget, textile + auto components + FMCG + electronics manufacturers (KA/TN/GJ/MH).
>
> Before paying, please send:
> 1) Free 50-row sample with direct mobile numbers
> 2) Last updated date
> 3) % mobile vs landline
> 4) Refund policy if >30% bounce
>
> Comparing 9 vendors — first clean sample wins the order + INR 50K follow-on potential.
>
> — Yash · SalesUp · +91 86177 06769

---

## Phone-direct shortcut (for the 5 with numbers)

Call the 5 with listed phone numbers (India hours, Mon-Sat 9am-6pm):
- 85878 04924 — 99datacd
- 08882 95 6467 — 77data
- +91 98194 21432 — mlgindia
- +91 95133 92455 — binaryclues
- +91 93400 64955 — leadfunction

Same 30-second pitch: *"Got an email from yc@salesup.club. Need sample tonight, paying tomorrow."*

---

## Watcher automation

Script to poll Gmail for vendor replies:

```bash
python3 ~/claude-code/scripts/python/vendor-rfq-watcher.py
```

- Polls `yc@salesup.club` inbox for mail from any of the 9 vendor domains in last 24 hrs
- Prints From/Subject/snippet + Gmail link for each reply
- Run every 15-20 min as samples come in

To auto-poll every 15 min via cron:
```bash
*/15 * * * * cd ~/claude-code && python3 scripts/python/vendor-rfq-watcher.py >> /tmp/rfq-watcher.log 2>&1
```

---

## When a sample arrives — the 20-min quality gate

1. Open the sample CSV
2. Random-sample 10 rows
3. WhatsApp each number: *"Namaste [name] ji, kya aap [company name] ke owner hain?"*
4. Wait 20 min
5. Count replies
   - **>6 replies** → ✅ excellent, BUY
   - **4–6 replies** → 🟡 acceptable, negotiate 20% top-up
   - **<4 replies** → ❌ reject, move on to next vendor

---

## Budget plan

| Source | Spend | Expected output |
|---|---|---|
| 1 winning vendor × full order (8K) | ₹8,000 | 5,000–10,000 rows with 60%+ direct mobile |
| Hatch overnight enrichment on Blitz list | ₹0 (existing credits) | +400 phones from Blitz's 1,501 rows |
| Firecrawl IndiaMART scrape (existing key) | ₹0 | +3,000 rows |
| | **₹8,000** | **~9,000–13,000 phones by Day 1 noon** |

Enough to feed 10 SDRs for 6 days without breaking contract commercials.

---

## Fallback: Fiverr (3-horse race)

If no vendor delivers a clean sample by midnight:

1. Open **fiverr.com** → search "Indian manufacturer database"
2. Filter: **Top Rated Plus** · **Delivery 1 Day** · Budget ₹3K–6K
3. DM 2 Top Rated sellers with same 4 questions
4. Award order to whoever replies first with clean sample

Expected: ₹3K–6K for 5K rows, 24-hr delivery.

---

## Ownership

| Who | What | When |
|---|---|---|
| **Yash** | WhatsApp the 3 vendors with WA numbers | Tonight (direct, fast) |
| **Yash** | Approve winning vendor's payment (~₹8K) | Whenever sample passes quality gate |
| **Claude / watcher** | Poll inbox for replies | Every 15 min |
| **Claude** | Run 10-phone spot-check on first sample | Within 20 min of arrival |
| **Abhishek** | Import winning CSV → CRM → channel-tag `source=vendor-name` | Day 1 morning |
| **Miskat** | Distribute list to 10 SDRs | 8:30am Day 1 |

---

## Status log (update as replies arrive)

*(Claude will update this table as vendor replies land in the inbox)*

| Time | Vendor | Event |
|---|---|---|
| 21:10 IST | RFQ batch 1 sent (5 addresses) | 3 bounced on generic addresses |
| 21:15 IST | RFQ batch 2 sent (14 addresses) | 6 bounced on generic addresses |
| 21:20 IST | Real contact emails harvested via WebFetch | 5 real addresses found |
| 21:22 IST | RFQ batch 3 sent (5 real addresses) | Landed successfully |
| ⏳ | Awaiting first vendor reply | — |
