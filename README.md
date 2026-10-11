# Rugby World Cup 2027 fan navigator (unofficial)

One source, two builds:

| Build | What it is | Where it goes |
|---|---|---|
| **Public site** (`dist/public`) | 576 pages in 6 languages, wheel navigator, live standings, calendar downloads, installable on phones. **No Bets tab, no betting code.** | GitHub Pages |
| **Private file** (`dist/private/rwc2027_private.html`) | One self-contained file with the Bets tab. | Keep on your own computer. **Never upload it to GitHub.** |

## Publish the public site on GitHub Pages

**Easiest: let GitHub build it for you (about 15 files to upload)**
1. Create a repository (for example `rwc2027`). Put your repository address into `site.config.json` as `baseUrl`, for example `https://lca450.github.io/rwc2027/` (keep the trailing slash).
2. Upload everything in this folder, including the hidden `.github` folder, to the `main` branch. On github.com you can drag and drop folders into "Add file, Upload files".
3. Repository **Settings > Pages > Source: GitHub Actions**.
4. Wait about a minute. The **Actions** tab shows the build. Your site is then live at the `baseUrl` address.
5. Every time you edit a file (for example `results.json`), the site rebuilds itself.

**Alternative: upload the finished site yourself**
Upload the contents of `dist/public` to the repository (GitHub Desktop or `git` handle the 670 files; the web page only takes 100 at a time), then Settings > Pages > Source: Deploy from a branch > `main` > `/ (root)`.

To change the address or rebuild on your own computer: `node build.js` (needs Node 18 or newer). Use `BASE_URL=https://you.github.io/repo/ node build.js` to try another address.

## Live standings during the tournament
1. Open `your-site/admin/` (not linked anywhere, not indexed by Google).
2. Pick a match, type the score and tries, press **Add / update result**. Repeat for each match. Tick "In progress" for a live score.
3. Press **Copy JSON**, open `results.json` in your repository on GitHub, paste, **Commit**.
4. The app and every page refresh themselves within about 90 seconds. The pool tables, the third-place ranking and the knockout bracket fill in automatically.

Rules used: 4 points for a win, 2 for a draw, 1 bonus point for 4+ tries, 1 for losing by 7 or less. Ties are split by head-to-head, points difference, tries difference, then points scored. **Check the third-place slot assignment against the official table once World Rugby publishes it** (see `thirdAssign` in `src/core_extra.js`).

## Visitor numbers (optional)
Add a cookie-free tracker such as Plausible, Umami or Cloudflare Web Analytics. Copy the `<script>` snippet they give you into `site.config.json`:
```json
{ "baseUrl": "https://lca450.github.io/rwc2027/", "analyticsSnippet": "<script defer data-domain=\"yoursite\" src=\"https://plausible.io/js/script.js\"></script>" }
```
The same file has `footerHtml` for an email sign-up form later (paste the embed code from MailerLite, Buttondown or similar). Because you are in the EU, use double opt-in, link a privacy policy and add an unsubscribe link before collecting emails.

## Get found on Google
After publishing, add the site in **Google Search Console** and submit `your-site/sitemap.xml`. Every match, team, pool and stadium has its own page with a title, description, language alternates and structured data.

## Languages
English, Spanish, French, Italian, Japanese and Portuguese. The words are in the table at the top of `src/core_extra.js` (one line per phrase). They were written by an AI, so ask a native speaker to review them. Not translated yet: the stadium descriptions, the squad source notes, and the Bets tab (English only).

## What is not included
Haka and music (parked), visitor accounts, a live data feed (results are typed in through `/admin/`), full squads for 14 teams, and head-to-head history for 34 of 36 pool pairings. The pages say so where data is missing.
