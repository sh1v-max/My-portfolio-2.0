import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const TabsItems = [
  {
    name: "home.jsx",
    path: "/",
    icon: "vscode-icons:file-type-reactjs",
  },
  {
    name: "about.html",
    path: "/about",
    icon: "vscode-icons:file-type-html",
  },
  {
    name: "projects.js",
    path: "/projects",
    icon: "vscode-icons:file-type-js-official",
  },
  {
    name: "frontend-lab.jsx",
    path: "/frontend-lab",
    icon: "vscode-icons:file-type-reactjs",
  },
  {
    name: "github.md",
    path: "/github",
    icon: "vscode-icons:file-type-markdown",
  },
  {
    name: "contact.css",
    path: "/contact",
    icon: "vscode-icons:file-type-css",
  },
];

function Tabs() {
  const location = useLocation();
  return (
    <div className="flex overflow-x-auto bg-tabsBg">
      {TabsItems.map((tab) => {
        return (
          <Link
            key={tab.name}
            to={`${tab.path}`}
            className={`flex ${
              location.pathname === tab.path
                ? " border-t-2 border-t-accentColor bg-tabActiveBg"
                : "border-2 bg-tabBg"
            }   min-w-max gap-x-1  border-tabBorder  px-3 text-textColor   md:py-1`}
          >
            <Icon icon={tab.icon} height={20} width={20} />
            <p className=" text-lg font-medium">{tab.name}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default Tabs;
