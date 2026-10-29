import { analytics } from "../data/config";

// GoatCounter, loaded by hand instead of a <script> tag in index.html, for two
// reasons:
//   1. The site code lives in config.js, one place to change it.
//   2. It only loads on the production host, so localhost and deploy previews
//      never send a pageview.
//
// This is a single-page app: React Router swaps pages without a real page
// load, so GoatCounter's automatic "count on load" would only ever see the
// first page. `no_onload` turns that off and usePageTracking() reports every
// route change instead, the first page included.

const SCRIPT_ID = "goatcounter-script";

let enabled = false;
let ready = false;
// Paths reported before count.js has finished downloading. Flushed on load, so
// the very first page isn't lost to the async script.
let pending = [];

export const goatcounterBase = analytics.goatcounterCode
  ? `https://${analytics.goatcounterCode}.goatcounter.com`
  : null;

export function initAnalytics() {
  if (!goatcounterBase || window.location.host !== analytics.productionHost) return;
  enabled = true;
  if (document.getElementById(SCRIPT_ID)) return;

  // Settings have to exist before count.js runs; it reads them on startup.
  window.goatcounter = { no_onload: true };

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.dataset.goatcounter = `${goatcounterBase}/count`;
  script.onload = () => {
    ready = true;
    pending.forEach(sendPageview);
    pending = [];
  };
  // An ad blocker cancelling the script is fine: the site keeps working and
  // that visit just isn't counted.
  document.head.appendChild(script);
}

function sendPageview(path) {
  window.goatcounter?.count?.({ path });
}

export function trackPageview(path) {
  if (!enabled) return;
  if (ready) sendPageview(path);
  else pending.push(path);
}
