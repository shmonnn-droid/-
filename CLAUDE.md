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
- Statuses: interested (orange), tour (own date + time), bride booking (locks the date,
  package 1: arrive 20:00 the day before → leave 16:30; package 2: 08:00 → 16:30), maternity shoot
  (hour slot only — the day stays open; slots may not overlap bride bookings or other shoots), cancelled.
- A lodging bride's arrival evening is marked on the calendar with a red dot and holds the venue from her
  arrival time; tours (treated as 1 hour) and shoots may not overlap any booking.
- Month title opens a month/year picker for quick navigation.
- Day window actions: + interested, 🍇 tour, 💍 close deal (bride), 🤰 maternity shoot (a separate hourly
  service, not a bride status, and not offered in the status picker of the form). A bride's date takes no
  new interested client; tours and shoots can still be added in her free hours. Client cards offer a one-tap ✕ cancel (with undo); list cards can be swiped
  left/right to reveal cancel.
- Deal/payment fields (amount, 15% deposit, balance, contract/paid checkboxes) only for bookings
  (bride, maternity shoot); hidden for interested and tour.

## Iron rules (never change)
- Calendar day colors (owner's update, replaces green/yellow/purple/blue fills): only two fills — interested
  orange, booked (bride) red; free days stay plain. Tours (wine purple `#6b1d38`), maternity shoots (blue
  `#2563eb`) and a lodging bride's arrival evening (red) are small dots on the day, never a fill.
- Past dates: no new leads, tours or bookings; only detail/payment edits and cancelling.
- Brand: wine `#4a151b` for headings and primary buttons; font stack 'November', 'Assistant' (November is used
  only where installed; Assistant loads from Google Fonts). Inputs stay at 16px+ to avoid iOS zoom.
