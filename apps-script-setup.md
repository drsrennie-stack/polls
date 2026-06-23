# Connect the poll to a Google Sheet (anonymous)

You do this once. It takes about ten minutes. After that, every submission lands in your Sheet with no way to identify who sent it.

## What you get

A Google Sheet you own, one row per student response, columns for every question, plus a timestamp. No names, no emails, no IP addresses. You see the answers, never the person.

## Steps

1. Go to sheets.google.com and create a blank Sheet. Name it something like "BIO 004 Pulse Check Responses."

2. In that Sheet, open **Extensions > Apps Script**. A code editor opens in a new tab.

3. Delete the sample `function myFunction() {}` that is there. Open `Code.gs` from this folder, copy everything, and paste it in. Click the save icon.

4. In the editor's function dropdown (top toolbar), pick **setupHeaders**, then click **Run**. Google will ask you to authorize. Approve it. This is your own script acting on your own Sheet. It writes the header row.
   - If you see a "Google hasn't verified this app" screen, click **Advanced**, then **Go to (your project name)**, then **Allow**. This is normal for personal scripts.

5. Click **Deploy > New deployment**. Click the gear icon next to "Select type" and choose **Web app**. Set:
   - **Description:** BIO 004 Pulse Check
   - **Execute as:** Me
   - **Who has access:** Anyone
   Click **Deploy**, approve any prompt, then **copy the Web app URL**. It looks like `https://script.google.com/macros/s/AKfy.../exec`.

6. Open `bio004-pulse-poll.html` in a text editor. Near the bottom, find this line:

   ```js
   var ENDPOINT_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```

   Replace the placeholder with the URL you copied. Save.

7. Test it. Open the HTML in a browser, fill it out, submit. You should see "Got it" and a new row in your Sheet within a few seconds.

## Publishing the poll

- **GitHub Pages:** drop `bio004-pulse-poll.html` into your `drsrennie-stack/Solano-Anatomy-` repo (or wherever you host the course site) and link to it. The page already has the iframe height-sender and a `target="_top"` logo link, so it embeds cleanly.
- **Kajabi or Canvas:** embed it in an iframe pointing at the hosted URL. The height-sender keeps the frame from clipping.

## If you ever change the questions

If you add or remove a question, update two places so the columns still line up:
- the `name="..."` of the field in the HTML, and
- the `FIELDS` and `HEADERS` arrays at the top of `Code.gs`.
Then redeploy the web app (**Deploy > Manage deployments > Edit > Version: New version**).

## Anonymity, in plain terms

- The script records a server timestamp and the answers. Nothing else.
- Google Forms-style "collect email" is off because there is no form, just your script.
- Apps Script does not pass the visitor's identity to your code, so there is nothing to accidentally store.
- Keep the Sheet itself private to your own Google account. Do not turn on link sharing for the Sheet.

Dr. Sharilyn Rennie
