import { useEffect } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Pages from "./Pages";
import BottomNav from "./BottomNav";
import SocialSidebar from "./SocialSidebar";
import { useTheme } from "../context/ThemeContext";
import ScrollToTop from "./ScrollToTop";
import { Toaster } from "react-hot-toast";
import Lenis from "lenis";

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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
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
      <div className={`theme-${theme} flex min-h-screen flex-col bg-mainBg text-textColor`}>
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
