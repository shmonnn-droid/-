/**
 * הכרם – יומן כלות: cloud sync endpoint (Google Apps Script web app).
 *
 * Stores the whole diary as one JSON file in the owner's Google Drive and, optionally,
 * mirrors it to a Google Sheet for easy viewing. The app (index.html) reads it with GET
 * and writes it with POST. Last write wins (by data.updatedAt).
 *
 * Setup: see sync/README.md.
 */

// Must match the "קוד סודי" entered in the app. Pick a long random value.
const TOKEN = 'CHANGE_ME_TO_A_LONG_SECRET';

const FILE_NAME = 'hakerem-calendar-data.json';
const MIRROR_TO_SHEET = true;
const SHEET_NAME = 'הכרם - יומן כלות (גיבוי ענן)';

function doGet(e) {
  if (!e || !e.parameter || e.parameter.token !== TOKEN) return json_({ ok: false, error: 'unauthorized' });
  return json_({ ok: true, data: readData_() });
}

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'bad request' }); }
  if (body.token !== TOKEN) return json_({ ok: false, error: 'unauthorized' });
  if (!body.data || typeof body.data.days !== 'object') return json_({ ok: false, error: 'bad data' });

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const current = readData_();
    // Another device saved something newer: keep it and send it back to the caller.
    if ((current.updatedAt || 0) > (body.data.updatedAt || 0)) return json_({ ok: true, stale: true, data: current });
    file_().setContent(JSON.stringify(body.data));
    if (MIRROR_TO_SHEET) {
      try { mirrorToSheet_(body.data); } catch (err) { console.error(err); }
    }
    return json_({ ok: true, updatedAt: body.data.updatedAt || 0 });
  } finally {
    lock.releaseLock();
  }
}

function file_() {
  const files = DriveApp.getFilesByName(FILE_NAME);
  if (files.hasNext()) return files.next();
  return DriveApp.createFile(FILE_NAME, JSON.stringify({ days: {}, updatedAt: 0 }), 'application/json');
}

function readData_() {
  try { return JSON.parse(file_().getBlob().getDataAsString()); } catch (err) { return { days: {}, updatedAt: 0 }; }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// A read-only table of every record, refreshed on each save.
function mirrorToSheet_(data) {
  const files = DriveApp.getFilesByName(SHEET_NAME);
  const ss = files.hasNext() ? SpreadsheetApp.open(files.next()) : SpreadsheetApp.create(SHEET_NAME);
  const sheet = ss.getSheets()[0];
  const STATE = { open: 'מתעניינת', tour: 'סיור', won: 'כלה – תפוס', event: 'אירוע אחר', maternity: 'צילומי הריון', lost: 'התאריך נתפס', cancelled: 'מבוטל' };
  const rows = [['תאריך', 'סטטוס', 'שם', 'טלפון', 'דוא"ל', 'שעות', 'סכום', 'חוזה', 'שולם במלואו', 'הערות מיוחדות', 'הערות']];
  Object.keys(data.days).sort().forEach(function (key) {
    data.days[key].leads.forEach(function (l) {
      const hours = l.state === 'maternity' ? (l.shootStart || '') + '-' + (l.shootEnd || '')
        : l.state === 'tour' ? (l.tourTime || '')
        : l.state === 'won' ? (l.arriveTime || '') + '-' + (l.leaveTime || '') : '';
      rows.push([key, STATE[l.state] || l.state, ((l.firstName || '') + ' ' + (l.lastName || '')).trim(), l.phone || '', l.email || '',
        hours, l.total || '', l.contractSigned ? 'כן' : '', l.paidInFull ? 'כן' : '', l.special || '', l.notes || '']);
    });
  });
  sheet.clearContents();
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  sheet.setFrozenRows(1);
}
