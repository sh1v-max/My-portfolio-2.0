import Explorer from "./Explorer";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Pages from "./Pages";
import SideBar from "./SideBar";
import Tabs from "./Tabs";
import { useTheme } from "../context/ThemeContext";

function Main() {
  const { theme } = useTheme();

  return (
    <div
      className={`theme-${theme} flex h-screen w-full flex-col overflow-hidden bg-mainBg text-textColor`}
    >
      {/* Top Title Bar */}
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Activity Bar (Sidebar) */}
        <SideBar />

        {/* Sidebar Explorer - Hidden on mobile */}
        <div className="hidden border-r border-explorerBorder md:block">
          <Explorer />
        </div>

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Fixed Editor Tabs */}
          <Tabs />

          {/* Scrollable Editor Content */}
          <Pages />
        </main>
      </div>

      {/* Bottom Status Bar */}
      <Footer />
    </div>
  );
}

export default Main;
