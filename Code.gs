/**
 * BIO 004 Mid-Term Pulse Check, anonymous response collector.
 *
 * This script receives poll submissions and appends them as rows to the
 * Google Sheet it is bound to. It stores NO names, NO emails, NO IP
 * addresses, and NO identifiers. Only the answers and a server timestamp.
 *
 * Setup steps are in apps-script-setup.md. Short version:
 *   1. Make a new Google Sheet.
 *   2. Extensions > Apps Script. Delete the sample code, paste THIS file.
 *   3. Run setupHeaders() once (authorize when asked).
 *   4. Deploy > New deployment > Web app.
 *        Execute as: Me
 *        Who has access: Anyone
 *   5. Copy the Web app URL and paste it into ENDPOINT_URL in the HTML.
 */

// Order of columns in the sheet. Keep in sync with the HTML field names.
var FIELDS = [
  'poll_week',
  'q1_structure',
  'q2_pace',
  'q2_why',
  'q3_used',
  'q3_used_other',
  'q4_helpful',
  'q4_helpful_other',
  'q5_feeling',
  'q6_hours',
  'q7_org',
  'q7_org_other',
  'q8_better',
  'q9_open'
];

// Friendly header labels shown in row 1 of the sheet.
var HEADERS = [
  'Timestamp',
  'Poll',
  'Q1 Weekly structure',
  'Q2 Pace preference',
  'Q2 Why (open)',
  'Q3 Tools used',
  'Q3 Other tool used',
  'Q4 Most helpful',
  'Q4 Other helpful',
  'Q5 Feeling now',
  'Q6 Hours/week',
  'Q7 Organization',
  'Q7 Other organization',
  'Q8 Could do better (open)',
  'Q9 Anything else (open)'
];

/**
 * Run this ONCE from the Apps Script editor to write the header row.
 */
function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

/**
 * Receives the anonymous POST from the poll and appends one row.
 */
function doPost(e) {
  try {
    var lock = LockService.getScriptLock();
    lock.waitLock(20000); // avoid two submissions colliding

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) { setupHeaders(); }

    var p = (e && e.parameter) ? e.parameter : {};
    var row = [new Date()]; // server timestamp only, not tied to any student
    for (var i = 0; i < FIELDS.length; i++) {
      row.push(p[FIELDS[i]] || '');
    }
    sheet.appendRow(row);

    lock.releaseLock();
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: lets you open the Web app URL in a browser to confirm it is live.
 */
function doGet() {
  return ContentService.createTextOutput('BIO 004 Pulse Check collector is running.');
}
