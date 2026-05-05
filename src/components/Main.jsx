import Footer from "./Footer";
import NavBar from "./NavBar";
import Pages from "./Pages";
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
      <main className="flex-1">
        <Pages />
      </main>

      {/* Modern Footer */}
      <Footer />
    </div>
  );
}

export default Main;
