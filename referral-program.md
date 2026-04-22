# Bharat Factory AI — Referral Program Spec

**Pilot:** 2026-04-22 | 1 week | 10 SDRs | 700 workers target
**Funded by:** Build.ai (stealth) | **Public brand:** Bharat Factory AI
**Pool:** ₹50,000 flat per closed factory referral · paid after camera deployed + 30 days of data collection

---

## Layer 1 — Factory Owner → Factory Owner (External)

**Offer:** ₹50,000 UPI to referrer per new factory that completes camera deployment + 30 days of data collection.

| Rule | Detail |
|---|---|
| Eligibility | Referrer must be a live, onboarded factory (MOU signed, data collection started) |
| Qualifying event | Referred factory signs MOU AND completes Day-1 data upload |
| Payout timing | 50% on MOU signed, 50% on Day-7 data collection milestone |
| Payout mode | Bank transfer (PAN required, TDS 10% u/s 194R applies) |
| Cap | No cap on # of referrals per owner |
| Exclusions | Same owner/legal entity, same GSTIN, owner's own sister units |
| Attribution window | 30 days from warm intro to MOU |

**WhatsApp template (send on Day-2 post-onboarding):**
> Namaste [Name] ji, welcome to Bharat Factory AI. Quick heads-up — we pay ₹50,000 UPI for every factory owner you refer who signs up with us. Avg owner refers 5 factories = ₹2.5L. No limit. Just share contacts with your SDR [SDR name] and we handle the rest. Terms: referred factory must deploy camera and complete 30 days of data collection.

**FAQ:**
- *Tax?* 10% TDS deducted u/s 194R; Form 16A provided.
- *Multiple referrals?* Unlimited, paid per close.
- *Can non-signed owners refer?* No — must be live factory.
- *What if two owners claim same lead?* First tagged in CRM wins.

---

## Layer 2 — SalesUp SDR Bonus (Internal)

**Split of ₹50,000 per closed referral (reference — to re-negotiate with Varun):**

| Recipient | Amount | Trigger |
|---|---|---|
| Factory owner (referrer) | ₹15,000 | MOU + Day-7 data |
| Sourcing SDR | ₹5,000 | Referral tagged + closed |
| TL (Anjali/Jasmine/Miskat) | ₹2,000 | Their SDR's close |
| SalesUp (ops/overhead) | ₹3,000 | — |

**Note:** Build.ai funds full ₹50K; SalesUp reallocates internally per agreed split. Confirm final split with Varun.

**SDR bonus payout:** with next salary cycle, only if CRM tagging complete.

---

## Tracking & Attribution

**Required CRM fields (dialer + Zoho):**
- `source = 'referral'`
- `referrer_factory_id` (parent factory)
- `referred_by_sdr` (sourcing SDR)
- `referral_date` | `mou_date` | `data_start_date`

**Monday 9am dashboard:** # referrals sourced, # MOU, # data-live, ₹ paid, ₹ pending.

**Red flags:** duplicate phone/owner name, same GSTIN, MOU date < referral date, referrer inactive >14 days.

---

## Launch Steps (by 9am 2026-04-22)

| # | Task | Owner | Deadline |
|---|---|---|---|
| 1 | Confirm ₹50K pool net vs gross with Varun + confirm payout trigger (camera deployed + 30 days data) | Yash | tonight |
| 2 | Add 4 referral fields to dialer + Zoho | Abhishek | 8am |
| 3 | Brief 10 SDRs + 3 TLs on tagging + script | Miskat | 8:30am stand-up |
| 4 | Queue WhatsApp template in ops inbox | Jasmine | 8:30am |
| 5 | Set up Monday dashboard query | Miskat | EOD Tue |
