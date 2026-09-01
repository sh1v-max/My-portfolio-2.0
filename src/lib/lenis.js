// A single Lenis instance drives the whole page's scroll (created in
// Main.jsx). Every "scroll to this section" call site used to call the
// native `element.scrollIntoView()` — which Lenis fights: it recalculates
// and re-applies its own tracked scroll position every animation frame, so a
// native scroll request gets silently overwritten back to wherever Lenis
// already thinks the page is. The symptom was exactly this: the URL hash
// would update (e.g. `#projects`) but `window.scrollY` never moved.
//
// Registering the instance here lets every call site ask Lenis itself to
// scroll, which is the only way that's actually respected.
let instance = null;

export function registerLenis(lenis) {
  instance = lenis;
}

export function unregisterLenis(lenis) {
  if (instance === lenis) instance = null;
}

// `id` is an element id (no leading #). Falls back to native scrollIntoView
// if Lenis hasn't mounted yet — better than doing nothing.
export function scrollToId(id, options = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { duration: 1.2, ...options });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
