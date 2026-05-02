import Code from "./icons/CodeIcon";
import Files from "./icons/FilesIcon";
import HomeIcon from "./icons/HomeIcon";
import Github from "./icons/GithubIcon";
import Mail from "./icons/MailIcon";
import Account from "./icons/AccountIcon";
import Settings from "./icons/SettingsIcon";
import { Link, useLocation } from "react-router-dom";

const sidebarTopItems = [
  { Icon: HomeIcon, path: "/" },
  { Icon: Account, path: "/about" },
  { Icon: Code, path: "/projects" },
  { Icon: Files, path: "/frontend-lab" },
  { Icon: Github, path: "/github" },
  { Icon: Mail, path: "/contact" },
];

const sidebarBottomItems = [
  { Icon: Settings, path: "/settings" },
];

function SideBar() {
  const location = useLocation();

  return (
    <aside className="flex h-full w-12 flex-shrink-0 flex-col items-center justify-between bg-sidebarBg py-4 border-r border-explorerBorder select-none">
      <div className="flex w-full flex-col items-center gap-y-4">
        {sidebarTopItems.map(({ Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link to={path} key={path} className="group relative flex w-full justify-center">
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-0.5 bg-accentColor" />
              )}
              <div className={`cursor-pointer p-2 transition-colors duration-200 ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}>
                <Icon
                  fill={isActive ? "rgb(225, 228, 232)" : "rgb(106, 115, 125)"}
                  className="w-7 h-7"
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex w-full flex-col items-center">
        {sidebarBottomItems.map(({ Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link to={path} key={path} className="group relative flex w-full justify-center">
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-0.5 bg-accentColor" />
              )}
              <div className={`cursor-pointer p-2 transition-colors duration-200 ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}>
                <Icon
                  fill={isActive ? "rgb(225, 228, 232)" : "rgb(106, 115, 125)"}
                  className="w-7 h-7"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default SideBar;
