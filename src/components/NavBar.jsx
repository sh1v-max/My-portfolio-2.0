import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import resumeFile from "../assets/docs/resume.pdf";
import LiveClock from "./LiveClock";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Lab", path: "/frontend-lab" },
  { name: "GitHub", path: "/github" },
  { name: "Contact", path: "/contact" },
];

// Width of the indicator in px (matches w-5 = 20px)
const INDICATOR_W = 20;

function NavBar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ─── Scroll-immune indicator ───────────────────────────────────────────────
  // We calculate the indicator's x position relative to the nav container rect,
  // NOT relative to the page. This means window.scrollY has zero effect on the
  // animation, completely eliminating the "bounce from bottom" layoutId bug.
  const navLinksRef = useRef(null);
  const linkRefs = useRef({});
  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  useLayoutEffect(() => {
    const activeEl = linkRefs.current[location.pathname];
    const container = navLinksRef.current;
    if (!activeEl || !container) return;

    const cRect = container.getBoundingClientRect();
    const lRect = activeEl.getBoundingClientRect();
    // Center of link minus half of indicator width → left edge of indicator
    const x = lRect.left - cRect.left + lRect.width / 2 - INDICATOR_W / 2;
    setIndicatorX(x);
    setIndicatorVisible(true);
  }, [location.pathname]);
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <>
      <header className="border-explorerBorder/50 bg-mainBg/80 sticky top-0 z-50 border-b backdrop-blur-xl">
        {/* Very Top Left Corner Clock (Desktop only) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block">
          <LiveClock />
        </div>

        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          {/* ─── Brand ─── */}
          <Link
            to="/"
            className="group flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            <span className="text-textColor hover:text-accentColor text-xl font-black uppercase tracking-[0.2em] transition-colors duration-300">
              SHIV<span className="text-accentColor">.</span>
            </span>
          </Link>

          {/* ─── Desktop Nav Links ─── */}
          <div
            ref={navLinksRef}
            className="relative hidden items-center gap-1 md:flex"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  ref={(el) => {
                    linkRefs.current[link.path] = el;
                  }}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-accentColor"
                      : "text-textColor/60 hover:text-textColor hover:bg-explorerBorder/20"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Single always-mounted indicator — position is container-relative,
                so it is completely unaffected by window.scrollY */}
            {indicatorVisible && (
              <motion.div
                initial={false}
                animate={{ x: indicatorX }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="bg-accentColor pointer-events-none absolute bottom-0 left-0 h-[2px] w-5 rounded-full"
              />
            )}
          </div>

          {/* ─── Right Section ─── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download Resume CTA */}
            <a
              href={resumeFile}
              download="resume.pdf"
              className="bg-accentColor/10 text-accentColor hover:bg-accentColor/20 flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold transition-all duration-200 sm:px-4 sm:text-xs"
            >
              <Icon
                icon="lucide:download"
                className="h-[14px] w-[14px] sm:h-4 sm:w-4"
                strokeWidth="3"
              />
              <span className="uppercase tracking-wider">Resume</span>
            </a>

            {/* ─── Modern Animated Hamburger (Minimalist) ─── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="group relative flex h-10 w-10 items-center justify-center transition-all duration-300 active:scale-90 md:hidden"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-end gap-1.5">
                <motion.span
                  animate={
                    mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                  }
                  style={{ width: 20 }}
                  className="bg-accentColor block h-0.5 rounded-full"
                />
                <motion.span
                  animate={
                    mobileOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }
                  }
                  style={{ width: 14 }}
                  className="bg-accentColor block h-0.5 rounded-full"
                />
                <motion.span
                  animate={
                    mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                  }
                  style={{ width: 20 }}
                  className="bg-accentColor block h-0.5 rounded-full"
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Premium Mobile Drawer (Full-Height Layout) ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="bg-mainBg/70 fixed inset-0 z-[60] md:hidden"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="border-textColor/10 bg-mainBg fixed inset-y-0 right-0 z-[70] flex w-[300px] flex-col border-l shadow-2xl md:hidden"
            >
              {/* Drawer Close Header */}
              <div className="flex items-center justify-end p-6">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="bg-textColor/5 text-textColor/60 hover:bg-textColor/10 flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
                >
                  <Icon
                    icon="lucide:x"
                    width="20"
                    height="20"
                    strokeWidth="2.5"
                  />
                </button>
              </div>

              {/* Navigation Content */}
              <div className="flex flex-1 flex-col items-center justify-center gap-10 px-8 pb-12">
                {/* Brand Branding in Drawer */}
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

                {/* Links Container */}
                <div className="flex flex-col items-center gap-6">
                  {navLinks.map((link, i) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 + 0.2 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className={`text-xl font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                            isActive
                              ? "text-accentColor scale-110"
                              : "text-textColor/60 hover:text-textColor"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Social Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="border-textColor/5 flex flex-col items-center gap-8 border-t p-12"
              >
                <div className="flex items-center gap-8">
                  {[
                    {
                      id: "github",
                      icon: <Icon icon="mdi:github" width="22" height="22" />,
                      url: "https://www.github.com/sh1v-max/",
                    },
                    {
                      id: "linkedin",
                      icon: <Icon icon="mdi:linkedin" width="22" height="22" />,
                      url: "https://www.linkedin.com/in/shiv-shankar-singh-/",
                    },
                    {
                      id: "email",
                      icon: <Icon icon="lucide:mail" width="22" height="22" />,
                      url: "mailto:singhshiv0427@gmail.com",
                    },
                  ].map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textColor/40 hover:text-accentColor transition-colors"
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
