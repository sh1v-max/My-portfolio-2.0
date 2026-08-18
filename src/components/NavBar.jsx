import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import resumeFile from "../assets/docs/resume.pdf";
import { personal } from "../data/config";
import { useActiveSection } from "../hooks/useActiveSection";
import ThemeToggle from "../features/theme/FloatingThemeButton";

const navLinks = [
  { name: "Home",     path: "/",            sectionId: "home" },
  { name: "About",    path: "/about",        sectionId: "about" },
  { name: "Projects", path: "/projects",     sectionId: "projects" },
  { name: "Lab",      path: "/frontend-lab", sectionId: null },
  { name: "GitHub",   path: "/github",       sectionId: null },
  { name: "Contact",  path: "/contact",      sectionId: "contact" },
];

const TICKER_TEXT = [
  "FULL STACK DEVELOPER",
  "REACT & NODE.JS",
  "EXPLORE MY WORK",
  "OPEN TO OPPORTUNITIES",
  "FRAMER MOTION",
  "BUILDING FOR THE WEB",
];

const tickerItems = [
  ...TICKER_TEXT,
  ...TICKER_TEXT,
  ...TICKER_TEXT,
  ...TICKER_TEXT,
];

const SCROLL_SECTION_PATH = { lab: "/frontend-lab", github: "/github" };

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [tickerVisible, setTickerVisible] = useState(true);
  const { activeSection, isMainPage } = useActiveSection();
  useEffect(() => {
    const onScroll = () => setTickerVisible(window.scrollY <= 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleClick = (link) => {
    setOpen(false);
    if (link.sectionId) {
      isMainPage ? scrollTo(link.sectionId) : navigate(`/#${link.sectionId}`);
    } else {
      navigate(link.path);
    }
  };

  const isActive = (link) => {
    if (isMainPage) {
      if (link.sectionId) return link.sectionId === activeSection;
      return SCROLL_SECTION_PATH[activeSection] === link.path;
    }
    return !isMainPage && location.pathname === link.path;
  };

  const refKey = (link) => link.sectionId ?? link.path;

  return (
    <>
      {/* ── Sticky navbar ── */}
      <div className="sticky top-0 z-50 px-4 pt-3 sm:px-6 md:px-8">

        {/* ── Floating card — articleBg = lighter theme surface ── */}
        <div className="mx-auto max-w-7xl rounded-2xl bg-articleBg shadow-[0_8px_40px_rgba(0,0,0,0.4)]">

          {/* ── Bar ── */}
          <div className="grid h-17 grid-cols-3 items-center px-5 sm:px-7">

            {/* Left — hamburger + Menu */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
              aria-expanded={open}
              className="group flex items-center gap-2.5 justify-self-start focus-visible:outline-2 focus-visible:outline-accentColor"
            >
              <div className="flex flex-col gap-[4.5px]">
                <motion.span
                  animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block h-[1.5px] w-4.5 origin-center rounded-full bg-textColor"
                />
                <motion.span
                  animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.18 }}
                  className="block h-[1.5px] w-3 rounded-full bg-textColor/60"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block h-[1.5px] w-4.5 origin-center rounded-full bg-textColor"
                />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-textColor/55 transition-colors duration-200 group-hover:text-textColor">
                Menu
              </span>
            </button>

            {/* Center — brand */}
            <button
              onClick={() => handleClick(navLinks[0])}
              className="justify-self-center focus-visible:outline-2 focus-visible:outline-accentColor"
              aria-label="Go to home"
            >
              <span className="text-lg font-black uppercase tracking-[0.25em] text-textColor transition-opacity duration-200 hover:opacity-70 sm:text-xl">
                SHIV<span className="text-accentColor">.</span>
              </span>
            </button>

            {/* Right — Resume + ThemeToggle */}
            <div className="flex items-center justify-end gap-2">
              <a
                href={resumeFile}
                download="resume.pdf"
                className="flex items-center gap-1.5 rounded-xl bg-accentColor px-3 py-2 text-[10px] font-black uppercase tracking-wider text-mainBg transition-opacity duration-200 hover:opacity-85 sm:px-4 sm:text-xs"
              >
                <Icon icon="lucide:download" className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" strokeWidth="3" />
                <span className="hidden sm:inline">Resume</span>
              </a>
              <ThemeToggle />
            </div>

          </div>
        </div>

        {/* ── Ticker — sticky inside navbar, fades on scroll ── */}
        <motion.div
          animate={{
            opacity: tickerVisible ? 1 : 0,
            y: tickerVisible ? 0 : -6,
          }}
          transition={{
            opacity: { duration: tickerVisible ? 0.45 : 0.2, ease: "easeInOut" },
            y:       { duration: tickerVisible ? 0.45 : 0.2, ease: [0.25, 0.1, 0.25, 1] },
          }}
          style={{ pointerEvents: tickerVisible ? "auto" : "none" }}
        >
          <div className="mx-auto max-w-7xl overflow-hidden rounded-b-2xl bg-accentColor py-1.75">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="flex min-w-max"
            >
              {tickerItems.map((text, i) => (
                <span
                  key={i}
                  className="mx-3 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.22em] text-mainBg sm:mx-4 sm:text-[10px]"
                >
                  {text}
                  <span className="mx-3 opacity-50 sm:mx-4">✦</span>
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-60 bg-mainBg/70 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-70 flex w-72 flex-col border-l border-explorerBorder/40 bg-articleBg shadow-2xl sm:w-80"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-explorerBorder/40 px-7 py-5">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-textColor/30">
                  SHIV<span className="text-accentColor">.</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-textColor/5 text-textColor/40 transition-colors hover:bg-textColor/10 hover:text-textColor/80"
                  aria-label="Close navigation"
                >
                  <Icon icon="lucide:x" width="16" height="16" strokeWidth="2.5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-1 flex-col justify-center gap-0.5 px-5 py-8">
                {navLinks.map((link, i) => {
                  const active = isActive(link);
                  return (
                    <motion.div
                      key={refKey(link)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.045 + 0.06,
                        duration: 0.28,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <button
                        onClick={() => handleClick(link)}
                        className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
                          active
                            ? "bg-accentColor/15 text-accentColor"
                            : "text-textColor/45 hover:bg-textColor/5 hover:text-textColor"
                        }`}
                      >
                        <span className="text-base font-bold uppercase tracking-[0.14em]">
                          {link.name}
                        </span>
                        {active ? (
                          <div className="h-1.5 w-1.5 rounded-full bg-accentColor" />
                        ) : (
                          <Icon
                            icon="lucide:arrow-up-right"
                            className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-40"
                          />
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.28 }}
                className="flex items-center justify-center gap-5 border-t border-explorerBorder/40 px-7 py-6"
              >
                {[
                  { id: "github",   icon: "mdi:github",   url: personal.github },
                  { id: "linkedin", icon: "mdi:linkedin",  url: personal.linkedin },
                  { id: "email",    icon: "lucide:mail",   url: `mailto:${personal.email}` },
                ].map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.id}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-textColor/30 transition-colors duration-200 hover:text-accentColor"
                  >
                    <Icon icon={s.icon} width="18" height="18" />
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
