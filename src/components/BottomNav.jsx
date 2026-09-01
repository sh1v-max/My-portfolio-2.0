import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToId } from "../lib/lenis";

const bottomNavItems = [
  {
    name: "Home",
    sectionId: "home",
    path: "/",
    icon: <Icon icon="lucide:home" className="h-5 w-5" strokeWidth="2" />,
  },
  {
    name: "Projects",
    sectionId: "projects",
    path: null,
    icon: <Icon icon="lucide:code" className="h-5 w-5" strokeWidth="2" />,
  },
  {
    name: "Archive",
    sectionId: null,
    path: "/frontend-lab",
    icon: <Icon icon="lucide:flask-conical" className="h-5 w-5" strokeWidth="2" />,
  },
  {
    name: "GitHub",
    sectionId: null,
    path: "/github",
    icon: <Icon icon="mdi:github" className="h-5 w-5" />,
  },
  {
    name: "Contact",
    sectionId: "contact",
    path: null,
    icon: <Icon icon="lucide:mail" className="h-5 w-5" strokeWidth="2" />,
  },
];

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeSection, isMainPage } = useActiveSection();

  const scrollTo = (id) => {
    scrollToId(id);
  };

  const handleClick = (item) => {
    if (item.sectionId) {
      if (isMainPage) {
        scrollTo(item.sectionId);
      } else {
        navigate(`/#${item.sectionId}`);
      }
    } else {
      navigate(item.path);
    }
  };

  const SCROLL_SECTION_PATH = { lab: "/frontend-lab", github: "/github" };

  const isActive = (item) => {
    if (item.sectionId) {
      if (isMainPage) {
        // "about" section has no bottom nav item — keep "Home" lit while in about
        if (activeSection === "about") return item.sectionId === "home";
        return item.sectionId === activeSection;
      }
      return false;
    }
    if (isMainPage && SCROLL_SECTION_PATH[activeSection] === item.path) return true;
    return location.pathname === item.path;
  };

  return (
    <nav className="border-explorerBorder/40 bg-mainBg/90 fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl md:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {bottomNavItems.map((item) => {
          const active = isActive(item);
          const key = item.sectionId ?? item.path;
          return (
            <button
              key={key}
              onClick={() => handleClick(item)}
              className="relative flex flex-col items-center gap-0.5"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ${
                  active ? "text-accentColor" : "text-textMuted hover:text-textSecondary"
                }`}
              >
                {item.icon}
              </motion.div>
              <span
                className={`text-[10px] font-medium transition-colors duration-200 ${
                  active ? "text-accentColor" : "text-textMuted"
                }`}
              >
                {item.name}
              </span>
              {active && (
                <motion.div
                  layoutId="bottomnav-indicator"
                  className="bg-accentColor absolute -top-px h-0.5 w-6 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
