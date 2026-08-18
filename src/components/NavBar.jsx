import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import resumeFile from "../assets/docs/resume.pdf";
import LiveClock from "./LiveClock";
import { personal } from "../data/config";
import { useActiveSection } from "../hooks/useActiveSection";
import ThemeToggle from "../features/theme/FloatingThemeButton";

// sectionId: null = standalone route, string = scroll section on "/"
const navLinks = [
  { name: "Home",     path: "/",            sectionId: "home" },
  { name: "About",    path: "/about",        sectionId: "about" },
  { name: "Projects", path: "/projects",     sectionId: "projects" },
  { name: "Lab",      path: "/frontend-lab", sectionId: null },
  { name: "GitHub",   path: "/github",       sectionId: null },
  { name: "Contact",  path: "/contact",      sectionId: "contact" },
];

const INDICATOR_W = 20;

function NavBar() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeSection, isMainPage } = useActiveSection();

  const navLinksRef = useRef(null);
  const linkRefs    = useRef({});
  const [indicatorX, setIndicatorX]         = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  // Scroll to a section on the current page
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Unified click handler
  const handleClick = (link) => {
    setMobileOpen(false);
    if (link.sectionId) {
      if (isMainPage) {
        scrollTo(link.sectionId);
      } else {
        navigate(`/#${link.sectionId}`);
      }
    } else {
      navigate(link.path);
    }
  };

  // Section IDs that live on "/" but whose nav links point to standalone routes
  const SCROLL_SECTION_PATH = { lab: "/frontend-lab", github: "/github" };

  // Which key is currently "active" for indicator positioning
  const isActive = (link) => {
    if (isMainPage) {
      if (link.sectionId) return link.sectionId === activeSection;
      return SCROLL_SECTION_PATH[activeSection] === link.path;
    }
    return !isMainPage && location.pathname === link.path;
  };

  // Ref key: sectionId takes priority so indicator tracks scroll position on "/"
  const refKey = (link) => link.sectionId ?? link.path;

  // Recalculate indicator position whenever active item changes
  useLayoutEffect(() => {
    const activeLink = navLinks.find(isActive);
    if (!activeLink) { setIndicatorVisible(false); return; }
    const key      = refKey(activeLink);
    const activeEl = linkRefs.current[key];
    const container = navLinksRef.current;
    if (!activeEl || !container) return;
    const cRect = container.getBoundingClientRect();
    const lRect = activeEl.getBoundingClientRect();
    setIndicatorX(lRect.left - cRect.left + lRect.width / 2 - INDICATOR_W / 2);
    setIndicatorVisible(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, location.pathname]);

  return (
    <>
      <header className="border-explorerBorder/50 bg-mainBg/80 sticky top-0 z-50 border-b backdrop-blur-xl">
        {/* Desktop-only clock */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block">
          <LiveClock />
        </div>

        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          {/* Brand */}
          <button
            onClick={() => handleClick(navLinks[0])}
            className="group flex items-center"
          >
            <span className="text-textColor hover:text-accentColor text-xl font-black uppercase tracking-[0.2em] transition-colors duration-300">
              SHIV<span className="text-accentColor">.</span>
            </span>
          </button>

          {/* Desktop links */}
          <div ref={navLinksRef} className="relative hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const key    = refKey(link);
              const active = isActive(link);
              return (
                <button
                  key={key}
                  ref={(el) => { linkRefs.current[key] = el; }}
                  onClick={() => handleClick(link)}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentColor ${
                    active
                      ? "text-accentColor"
                      : "text-textColor/60 hover:text-textColor hover:bg-explorerBorder/20"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}

            {indicatorVisible && (
              <motion.div
                initial={false}
                animate={{ x: indicatorX }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="bg-accentColor pointer-events-none absolute bottom-0 left-0 h-0.5 w-5 rounded-full"
              />
            )}
          </div>

          {/* Right: Resume + ThemeToggle + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={resumeFile}
              download="resume.pdf"
              className="bg-accentColor/10 text-accentColor hover:bg-accentColor/20 flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold transition-all duration-200 sm:px-4 sm:text-xs"
            >
              <Icon icon="lucide:download" className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth="3" />
              <span className="uppercase tracking-wider">Resume</span>
            </a>

            <ThemeToggle />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="group relative flex h-12 w-12 items-center justify-center transition-all duration-300 active:scale-90 md:hidden"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-end gap-1.5">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  style={{ width: 20 }}
                  className="bg-accentColor block h-0.5 rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                  style={{ width: 14 }}
                  className="bg-accentColor block h-0.5 rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  style={{ width: 20 }}
                  className="bg-accentColor block h-0.5 rounded-full"
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="bg-mainBg/70 fixed inset-0 z-60 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="border-textColor/10 bg-mainBg fixed inset-y-0 right-0 z-70 flex w-75 flex-col border-l shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-end p-6">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="bg-textColor/5 text-textColor/60 hover:bg-textColor/10 flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
                >
                  <Icon icon="lucide:x" width="20" height="20" strokeWidth="2.5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center gap-10 px-8 pb-12">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-4"
                >
                  <span className="text-textColor/40 text-sm font-black uppercase tracking-[0.3em]">
                    SHIV<span className="text-accentColor">.</span>
                  </span>
                </motion.div>

                <div className="flex flex-col items-center gap-6">
                  {navLinks.map((link, i) => {
                    const active = isActive(link);
                    return (
                      <motion.div
                        key={refKey(link)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 + 0.2 }}
                      >
                        <button
                          onClick={() => handleClick(link)}
                          className={`text-xl font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                            active
                              ? "text-accentColor scale-110"
                              : "text-textColor/60 hover:text-textColor"
                          }`}
                        >
                          {link.name}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="border-textColor/5 flex flex-col items-center gap-8 border-t p-12"
              >
                <div className="flex items-center gap-8">
                  {[
                    { id: "github",   icon: <Icon icon="mdi:github"   width="22" height="22" />, url: personal.github },
                    { id: "linkedin", icon: <Icon icon="mdi:linkedin" width="22" height="22" />, url: personal.linkedin },
                    { id: "email",    icon: <Icon icon="lucide:mail"  width="22" height="22" />, url: `mailto:${personal.email}` },
                  ].map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.id.charAt(0).toUpperCase() + social.id.slice(1)}
                      className="flex h-11 w-11 items-center justify-center rounded-lg text-textColor/40 hover:text-accentColor transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
