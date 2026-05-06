import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const sidebarTopItems = [
  { icon: "lucide:home", path: "/" },
  { icon: "lucide:user-circle", path: "/about" },
  { icon: "lucide:code-2", path: "/projects" },
  { icon: "lucide:files", path: "/frontend-lab" },
  { icon: "lucide:github", path: "/github" },
  { icon: "lucide:mail", path: "/contact" },
];

const sidebarBottomItems = [
  { icon: "lucide:settings", path: "/settings" },
];

function SideBar() {
  const location = useLocation();

  return (
    <aside className="flex h-full w-12 flex-shrink-0 flex-col items-center justify-between bg-sidebarBg py-4 border-r border-explorerBorder select-none">
      <div className="flex w-full flex-col items-center gap-y-4">
        {sidebarTopItems.map(({ icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link to={path} key={path} className="group relative flex w-full justify-center">
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-0.5 bg-accentColor" />
              )}
              <div className={`cursor-pointer p-2 transition-colors duration-200 ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}>
                <Icon
                  icon={icon}
                  className={`w-7 h-7 ${isActive ? "text-textColor" : "text-textColor/40"}`}
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex w-full flex-col items-center">
        {sidebarBottomItems.map(({ icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link to={path} key={path} className="group relative flex w-full justify-center">
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-0.5 bg-accentColor" />
              )}
              <div className={`cursor-pointer p-2 transition-colors duration-200 ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}>
                <Icon
                  icon={icon}
                  className={`w-7 h-7 ${isActive ? "text-textColor" : "text-textColor/40"}`}
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
