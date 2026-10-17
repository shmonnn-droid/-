# הכרם - יומן כלות

The single source of truth for this project's rules, branding and features is the Google Doc
**"הכרם - יומן כלות - תיעוד לפרויקט (claud_sync.md)"** in the owner's Google Drive:
https://docs.google.com/document/d/15vNE4lc_-kX1ywrBOBSM2-xE2u0N9S1mIaPDjJILiu8/edit

Read it before any change to `index.html` and follow it. Where it conflicts with a newer explicit
request from the owner, the newer request wins; point out the conflict.

## Project basics
- Whole app is one file: `index.html` (HTML + Tailwind CDN + vanilla JS), Hebrew RTL, mobile-first.
- Data lives in `localStorage` (`bridalCabinCalendar.v1`); JSON backup import/export. Optional cloud sync
  (☁️ button) to a Google Apps Script web app that keeps the data as a JSON file in Drive (+ Sheet mirror):
  `sync/apps-script.gs`, setup in `sync/README.md`. Last write wins by `db.updatedAt`; offline changes queue.
  An import file with `"importMode": "merge"` (e.g. converted from the owner's Excel) is added to the existing
  data instead of replacing it; records already present (same id / date + phone or name) are skipped.
- Deploy: push to `main`; Netlify publishes it automatically.
- Statuses: interested (orange), tour (own date + time), bride booking (locks the date,
  package 1: arrive 20:00 the day before → leave 16:30; package 2: 08:00 → 16:30), maternity shoot
  (hour slot only — the day stays open; slots may not overlap bride bookings or other shoots), cancelled.
- A lodging bride's arrival evening is marked on the calendar with a red dot and holds the venue from her
  arrival time; tours (treated as 1 hour) and shoots may not overlap any booking.
- Month title opens a month/year picker for quick navigation.
- Day window actions: + interested, 🍇 tour, 💍 close deal (bride), 🤰 maternity shoot (a separate hourly
  service, only from a free/partial day's window, never on a bride/event date), 🟢 other event / closed day.
  A bride's date takes no new interested client; tours can still be added in her free hours. Closing a bride
  or event on a day with maternity shoots asks to confirm and cancels them.
- No double entry: tour / close deal / maternity from a day that already has clients first asks "לאיזו לקוחה?"
  and pre-fills her name, last name, phone, email, package and notes (tour/bride update her record; maternity
  copies her details into a new booking). "+ לקוחה חדשה" or a day with no clients opens a blank form.
- Bride: special notes (yellow), up to two linked days (tour day + time, held day) shown on the calendar.
  Interested clients can already pick a requested package. Smart paste fills the form from free text.
- Deposit = 15% rounded up to a whole shekel. Upcoming panel = next 30 days. Main screen has a quick search. Client cards offer a one-tap ✕ cancel (with undo); list cards can be swiped
  left/right to reveal cancel.
- A tour is a stage of an interested client, not a separate status: she stays in the interested list/count
  with a wine "🍇 סיור נקבע" chip; the tours tab lists the visits by tour date. List and upcoming cards show
  every payment tick together (✓ חוזה, ✓ מקדמה, ✓ שולם במלואו).
- Deal/payment fields (amount, 15% deposit, balance, contract/paid checkboxes) only for bookings
  (bride, maternity shoot); hidden for interested and tour.

## Iron rules (never change)
- Calendar day colors (owner's updates): fills — interested / bride's held day orange, booked (bride) red,
  other event green; free days stay plain. Tours (wine purple `#6b1d38`), maternity shoots (blue
  `#2563eb`) and a lodging bride's arrival evening (red) are small dots on the day, never a fill.
- Past dates: no new leads, tours or bookings; only detail/payment edits and cancelling.
- Brand: wine `#4a151b` for headings and primary buttons; font stack 'November', 'Assistant' (November is used
  only where installed; Assistant loads from Google Fonts). Inputs stay at 16px+ to avoid iOS zoom.
