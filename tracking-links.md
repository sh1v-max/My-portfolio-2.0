# Tracking links: which portfolio link to use where

My own cheat sheet, not documentation. Every link opens the normal home page; the `?ref=` part only tells GoatCounter where the visitor came from.

Dashboard: https://singhshiv.goatcounter.com (log in to see it)

| Where | Use this link |
|---|---|
| LinkedIn posts / profile | `https://singhshiv.netlify.app/?ref=linkedin` |
| X / Twitter | `https://singhshiv.netlify.app/?ref=twitter` |
| GitHub profile README | `https://singhshiv.netlify.app/?ref=github` |
| Resume PDF | `https://singhshiv.netlify.app/?ref=resume` |
| Job applications / emails | `https://singhshiv.netlify.app/?ref=apply` |

Adding a new place? Make up a short lowercase name and use it the same way, e.g. `?ref=naukri`, `?ref=wellfound`. Keep the spelling the same every time, or the dashboard splits it into two sources.

## Where to look in the dashboard

- **Referrers / campaigns:** the `ref` values above show up as the source, next to sites that send visitors on their own (google.com, github.com…).
- **Pages:** which pages people opened, e.g. whether they read a case study.
- **Browsers, Systems, Sizes, Locations:** browser, OS, phone vs desktop, country and region.

## Don't count my own visits

Open this once on every device I use (each laptop, phone), in every browser I use:

`https://singhshiv.netlify.app#toggle-goatcounter`

A popup confirms it. Opening it again turns counting back on. Same as "disable for this browser" in GoatCounter → Settings.

## Good to know

- Counting only happens on `singhshiv.netlify.app`. Localhost and Netlify deploy previews never count (set in `src/data/config.js`).
- One person counts once per page per 8 hours on the same device and connection. Reloading doesn't add views.
- The footer number is GoatCounter's total across all pages. It's cached for up to 4 hours, so it lags behind the dashboard, and it's hidden while the total is 0.
- Some ad blockers block GoatCounter, so the real number is a bit higher than what's counted.
