import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { goatcounterBase } from "../lib/analytics";

// The public count in the footer: GoatCounter's total across every page.
//
// GoatCounter caches this number for up to 4 hours, so it lags behind the live
// dashboard. That's fine for a footer.
//
// While loading, or if the request fails (no account yet, the counter setting
// switched off, an ad blocker), this renders nothing. Showing "0 views" would be
// worse than showing no number at all.
export default function ViewCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (!goatcounterBase) return;
    const controller = new AbortController();

    fetch(`${goatcounterBase}/counter/TOTAL.json`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      // `count` arrives already formatted with thousands separators ("1,234").
      // A brand-new account answers "0", which counts as "nothing to show".
      .then((data) => {
        if (data?.count && data.count !== "0") setCount(data.count);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  if (!count) return null;

  return (
    <p className="text-textMuted flex items-center gap-1.5 font-Inconsolata text-xs">
      <Icon icon="lucide:eye" width="13" height="13" aria-hidden="true" />
      <span className="tabular-nums">{count}</span> views
    </p>
  );
}
