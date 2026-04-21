#!/usr/bin/env python3
import os
"""Poll Gmail for replies from the 9 Indian data vendors we sent RFQs to.
Run: python3 vendor-rfq-watcher.py
Usage for cron/loop: add to crontab every 10 min.
"""
import json, subprocess, sys
from datetime import datetime

CI = os.environ["GOOGLE_CLIENT_ID"]
CS = os.environ["GOOGLE_CLIENT_SECRET"]
RT = os.environ["GMAIL_REFRESH_TOKEN"]

VENDOR_DOMAINS = [
    "allindiadatabase.com", "99datacd.com", "77data.net", "cypherexim.com",
    "mlgindia.com", "binaryclues.com", "companydatabase.in",
    "leadfunction.com", "datasolutionsexperts.com",
]

def token():
    return json.loads(subprocess.check_output([
        "curl","-s","-X","POST","https://oauth2.googleapis.com/token",
        "-d",f"client_id={CI}","-d",f"client_secret={CS}",
        "-d",f"refresh_token={RT}","-d","grant_type=refresh_token",
    ]))["access_token"]

def gmail(tok, endpoint):
    return json.loads(subprocess.check_output([
        "curl","-s","-H",f"Authorization: Bearer {tok}",
        f"https://gmail.googleapis.com/gmail/v1/users/me/{endpoint}",
    ]))

def main():
    tok = token()
    print(f"\n===== Vendor RFQ Watcher · {datetime.now().isoformat(timespec='seconds')} =====")
    query = " OR ".join(f"from:{d}" for d in VENDOR_DOMAINS)
    # Inbox messages from any vendor domain in last 24h
    q = f"({query}) newer_than:1d in:inbox"
    import urllib.parse
    res = gmail(tok, f"messages?q={urllib.parse.quote(q)}&maxResults=50")
    msgs = res.get("messages", [])
    if not msgs:
        print("No vendor replies yet. Re-run in ~15 min.")
        return 0
    print(f"Found {len(msgs)} vendor reply message(s):\n")
    for m in msgs:
        full = gmail(tok, f"messages/{m['id']}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date")
        hdrs = {h["name"]: h["value"] for h in full.get("payload",{}).get("headers",[])}
        snip = full.get("snippet","")[:180]
        print(f"  • From: {hdrs.get('From','?')}")
        print(f"    Subject: {hdrs.get('Subject','?')}")
        print(f"    Date: {hdrs.get('Date','?')}")
        print(f"    Snippet: {snip}")
        print(f"    Gmail link: https://mail.google.com/mail/u/0/#inbox/{m['id']}\n")
    return 0

if __name__ == "__main__":
    sys.exit(main())
