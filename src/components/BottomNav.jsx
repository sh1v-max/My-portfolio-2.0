import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const bottomNavItems = [
  {
    name: "Home",
    path: "/",
    icon: <Icon icon="lucide:home" className="h-5 w-5" strokeWidth="2" />,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: <Icon icon="lucide:code" className="h-5 w-5" strokeWidth="2" />,
  },
  {
    name: "Lab",
    path: "/frontend-lab",
    icon: <Icon icon="lucide:flask-conical" className="h-5 w-5" strokeWidth="2" />,
  },
  {
    name: "GitHub",
    path: "/github",
    icon: <Icon icon="mdi:github" className="h-5 w-5" />,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: <Icon icon="lucide:mail" className="h-5 w-5" strokeWidth="2" />,
  },
];

function BottomNav() {
  const location = useLocation();

  return (
    <nav className="border-explorerBorder/40 bg-mainBg/90 fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl md:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center gap-0.5"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-accentColor"
                    : "text-textColor/40 hover:text-textColor/70"
                }`}
              >
                {item.icon}
              </motion.div>
              <span
                className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? "text-accentColor" : "text-textColor/30"
                }`}
              >
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomnav-indicator"
                  className="bg-accentColor absolute -top-px h-0.5 w-6 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
