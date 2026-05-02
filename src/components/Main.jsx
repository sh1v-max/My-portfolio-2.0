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
      className={`theme-${theme} bg-mainBg text-textColor flex h-screen w-full flex-col overflow-hidden`}
    >
      {/* Top Title Bar */}
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Activity Bar (Sidebar) */}
        <SideBar />

        {/* Sidebar Explorer - Hidden on mobile */}
        <div className="border-explorerBorder hidden border-r md:block">
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
