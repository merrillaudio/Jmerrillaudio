// ============================================================
// MERRILL AUDIO — New Music Community Board Google Apps Script
// Paste this entire script into your Google Sheet's Apps Script editor
// Extensions → Apps Script → paste → Save → Deploy as NEW Web App
// (Must create a NEW deployment each time you update the script)
// ============================================================

const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Band Name', 'Album Name', 'Genre',
        'Favorite Song', 'Link', 'Comments',
      ]);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
      data.bandName     || '',
      data.albumName    || '',
      data.genre        || '',
      data.favoriteSong || '',
      data.link         || '',
      data.comments     || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

    const rows = sheet.getDataRange().getValues();
    const submissions = rows.length <= 1 ? [] : rows.slice(1).reverse().map((row) => ({
      timestamp:    row[0] ? row[0].toString() : '',
      bandName:     row[1] || '',
      albumName:    row[2] || '',
      genre:        row[3] || '',
      favoriteSong: row[4] || '',
      link:         row[5] || '',
      comments:     row[6] || '',
    }));

    const json = JSON.stringify(submissions);

    // JSONP support — required for browser cross-origin requests
    // The page calls: ?callback=__cb123
    const callback = e && e.parameter && e.parameter.callback;
    if (callback) {
      return ContentService
        .createTextOutput(callback + '(' + json + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    // Plain JSON fallback
    return ContentService
      .createTextOutput(json)
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    const callback = e && e.parameter && e.parameter.callback;
    const errJson = JSON.stringify({ error: err.toString() });
    if (callback) {
      return ContentService
        .createTextOutput(callback + '(' + errJson + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService
      .createTextOutput(errJson)
      .setMimeType(ContentService.MimeType.JSON);
  }
}
