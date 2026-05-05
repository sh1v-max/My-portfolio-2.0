
import Footer from "./Footer";
import NavBar from "./NavBar";
import Pages from "./Pages";
import BottomNav from "./BottomNav";
import FloatingThemeButton from "./FloatingThemeButton";
import { useTheme } from "../context/ThemeContext";

function Main() {
  const { theme } = useTheme();

  return (
    <div
      className={`theme-${theme} flex min-h-screen flex-col bg-mainBg text-textColor`}
    >
      {/* Modern Top Navigation */}
      <NavBar />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        <Pages />
      </main>

      {/* Modern Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Floating Theme Selector */}
      <FloatingThemeButton />
    </div>
  );
}

export default Main;
