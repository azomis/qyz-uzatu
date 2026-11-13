/**
 * Receives RSVP answers from the invitation site and appends them to a Google Sheet.
 *
 * Setup:
 *  1. Create a Google Sheet. Open Extensions -> Apps Script and paste this file.
 *  2. Deploy -> New deployment -> type "Web app".
 *     Execute as: Me. Who has access: Anyone.
 *  3. Copy the Web app URL into CONFIG.RSVP_URL in shared/app.js.
 *  4. After any change to this script, create a new deployment version.
 */
const SHEET_NAME = 'RSVP';
const VERSION = '2026-11-14 · note column'; // bump on every change; shown by doGet so you can see which deployment is live

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const name = String(d.name || '').slice(0, 120);
    const status = d.status === 'yes' || d.status === 'no' ? d.status : '';
    if (!name || !status) throw new Error('bad payload');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(['Received at', 'Full name', 'Answer', 'Language', 'Sent at (client)', 'Note']);
      sh.setFrozenRows(1);
    } else if (sh.getRange(1, 6).getValue() === '') {
      // Sheet created by an older version without the Note column: add its header.
      sh.getRange(1, 6).setValue('Пожелания').setFontWeight('bold');
    }
    // Guard against spreadsheet formula injection.
    const safeName = /^[=+\-@]/.test(name) ? "'" + name : name;
    const note = String(d.note || '').slice(0, 1000);
    const safeNote = /^[=+\-@]/.test(note) ? "'" + note : note;
    sh.appendRow([new Date(), safeName, status === 'yes' ? 'Приду' : 'Не приду', String(d.lang || ''), String(d.ts || ''), safeNote]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    console.error(String(err && err.stack || err)); // visible in Executions -> row details
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Open the Web app URL in a browser to check that the latest version is live.
function doGet() {
  return ContentService.createTextOutput('RSVP endpoint is up · version ' + VERSION);
}

// Run this from the editor to test writing to the sheet (doPost needs a request, so it can't be run directly).
function testDoPost() {
  const res = doPost({ postData: { contents: JSON.stringify({ name: 'Test Guest', status: 'yes', lang: 'ru', note: 'Test note', ts: new Date().toISOString() }) } });
  console.log(res.getContent());
}
