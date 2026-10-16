# הכרם - יומן כלות

The single source of truth for this project's rules, branding and features is the Google Doc
**"הכרם - יומן כלות - תיעוד לפרויקט (claud_sync.md)"** in the owner's Google Drive:
https://docs.google.com/document/d/15vNE4lc_-kX1ywrBOBSM2-xE2u0N9S1mIaPDjJILiu8/edit

Read it before any change to `index.html` and follow it. Where it conflicts with a newer explicit
request from the owner, the newer request wins; point out the conflict.

## Project basics
- Whole app is one file: `index.html` (HTML + Tailwind CDN + vanilla JS), Hebrew RTL, mobile-first.
- Data lives in `localStorage` (`bridalCabinCalendar.v1`); JSON backup import/export.
- Deploy: push to `main`; Netlify publishes it automatically.

## Iron rules (never change)
- Day status colors: free green, interested yellow, booked (bride) red,
  tour day wine purple `#6b1d38`, maternity shoot blue `#2563eb`.
- Past dates: no new leads, tours or bookings; only detail/payment edits and cancelling.
- Brand: wine `#4a151b` for headings and primary buttons; font stack 'November', 'Assistant' (November is used
  only where installed; Assistant loads from Google Fonts). Inputs stay at 16px+ to avoid iOS zoom.
