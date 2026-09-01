import { useEffect, useRef } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Pages from "./Pages";
import BottomNav from "./BottomNav";
import SocialSidebar from "./SocialSidebar";
import { useTheme } from "../context/ThemeContext";
import ScrollToTop from "./ScrollToTop";
import { Toaster } from "react-hot-toast";
import Lenis from "lenis";
import { registerLenis, unregisterLenis } from "../lib/lenis";

const themeTokens = {
  github:    { bg: "#24292e", accent: "#f9826c" },
  dracula:   { bg: "#282a36", accent: "#bd93f9" },
  ayuDark:   { bg: "#0a0e14", accent: "#e6b450" },
  ayuMirage: { bg: "#1f2430", accent: "#e6b450" },
  nord:      { bg: "#2e3440", accent: "#88c0d0" },
  nightOwl:  { bg: "#011627", accent: "rgb(95, 126, 151)" },
};

function Main() {
  const { theme } = useTheme();
  const tokens = themeTokens[theme] ?? themeTokens.github;
  const contentRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });
    registerLenis(lenis);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Lenis measures the document once on init and caches the scroll limit.
    // A client-side route change swaps in content of a different height without
    // it noticing, so it keeps the previous page's limit and the bottom of any
    // taller page becomes unreachable.
    //
    // The observed element has to be this content wrapper, not <body>: Lenis
    // pins html and body to the viewport height, so their boxes never change
    // and a ResizeObserver on them reports nothing. This node is stable across
    // route changes and its height tracks the real content, so one observer
    // covers route changes, late-loading images, and in-page height changes
    // (filters, accordions) alike.
    const observer = new ResizeObserver(() => lenis.resize());
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      unregisterLenis(lenis);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: tokens.bg,
            color: "#e2e8f0",
            border: `1px solid ${tokens.accent}`,
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: tokens.accent, secondary: tokens.bg },
          },
          error: {
            iconTheme: { primary: "#bf616a", secondary: tokens.bg },
          },
        }}
      />
      <div
        ref={contentRef}
        className={`theme-${theme} flex min-h-screen flex-col bg-mainBg text-textColor`}
      >
        <NavBar />
        <main className="flex-1 pb-16 md:pb-0">
          <Pages />
        </main>
        <Footer />
        <BottomNav />
        <SocialSidebar />
      </div>
    </>
  );
}

export default Main;
