import Footer from "./Footer";
import NavBar from "./NavBar";
import Pages from "./Pages";
import BottomNav from "./BottomNav";
import FloatingThemeButton from "../features/theme/FloatingThemeButton";
import { useTheme } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

function Main() {
  const { theme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <ScrollToTop />
      <div
        className={`theme-${theme} flex ${
          isHomePage ? "h-screen overflow-hidden" : "min-h-screen"
        } flex-col bg-mainBg text-textColor`}
      >
        {/* Modern Top Navigation */}
        <NavBar />

      {/* Main Content Area */}
      <main className={`flex-1 ${isHomePage ? "pb-0" : "pb-16"} md:pb-0`}>
        <Pages />
      </main>

      {/* Modern Footer */}
      {!isHomePage && <Footer />}

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Floating Theme Selector */}
      <FloatingThemeButton />
    </div>
    </>
  );
}

export default Main;
