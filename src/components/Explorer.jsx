import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const explorerItems = [
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
          <Icon 
            icon="lucide:chevron-right"
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
                <Icon icon={item.icon} className="w-4 h-4" />
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
