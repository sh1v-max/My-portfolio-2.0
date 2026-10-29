import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageview } from "../lib/analytics";

// Reports one pageview per route. Only the pathname is sent: the home page's
// sections are hash links (/#projects), and counting those as separate pages
// would turn one scroll into several "views".
//
// Query params like ?ref=linkedin aren't part of the path either. GoatCounter
// reads them from the URL on its own and files them under where visitors came
// from, so shared links can be tagged per platform.
export function usePageTracking() {
  const { pathname } = useLocation();
  // StrictMode runs effects twice in development; without this guard the same
  // path would be reported twice.
  const lastPath = useRef(null);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    trackPageview(pathname);
  }, [pathname]);
}
