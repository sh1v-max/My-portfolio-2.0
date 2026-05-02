import { useState } from "react";
import ChevronRight from "./icons/ChevronRight";
import react_icon from "../assets/icons/react_icon.svg";
import html_icon from "../assets/icons/html_icon.svg";
import css_icon from "../assets/icons/css_icon.svg";
import js_icon from "../assets/icons/js_icon.svg";
// import json_icon from "../assets/icons/json_icon.svg";
import markdown_icon from "../assets/icons/markdown_icon.svg";
import { Link } from "react-router-dom";

const explorerItems = [
  {
    name: "home.jsx",
    path: "/",
    icon: `${react_icon}`,
  },
  {
    name: "about.html",
    path: "/about",
    icon: `${html_icon}`,
  },
  {
    name: "projects.js",
    path: "/projects",
    icon: `${js_icon}`,
  },
  {
    name: "frontend-lab.jsx",
    path: "/frontend-lab",
    icon: `${react_icon}`,
  },
  {
    name: "github.md",
    path: "/github",
    icon: `${markdown_icon}`,
  },
  {
    name: "contact.css",
    path: "/contact",
    icon: `${css_icon}`,
  },
];

function Explorer() {
  const [show, setShow] = useState(true);

  return (
    <div className="flex h-full w-64 flex-shrink-0 flex-col bg-explorerBg text-textColor select-none">
      <h2 className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-textColor/50">
        Explorer
      </h2>
      
      <div className="flex flex-col">
        <div
          className="flex cursor-pointer items-center px-2 py-1 hover:bg-explorerHoverBg transition-colors duration-200"
          onClick={() => setShow(!show)}
        >
          <ChevronRight 
            className="w-4 h-4 transition-transform duration-200" 
            style={show ? { transform: "rotate(90deg)" } : {}} 
          />
          <span className="ml-1 text-sm font-bold tracking-wide">
            PORTFOLIO
          </span>
        </div>

        {show && (
          <div className="flex flex-col">
            {explorerItems.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className="flex items-center gap-x-2 px-6 py-1 text-sm hover:bg-explorerHoverBg transition-colors duration-200"
              >
                <img src={item.icon} alt="" className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explorer;
