import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Lab", path: "/frontend-lab" },
  { name: "GitHub", path: "/github" },
  { name: "Contact", path: "/contact" },
];

function NavBar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="border-explorerBorder/50 bg-mainBg/80 sticky top-0 z-50 border-b backdrop-blur-xl">
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
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-accentColor"
                      : "text-textColor/60 hover:text-textColor hover:bg-explorerBorder/20"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="bg-accentColor absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ─── Right Section ─── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download Resume CTA */}
            <a
              href="/assets/docs/resume.pdf"
              download
              className="bg-accentColor/10 text-accentColor hover:bg-accentColor/20 flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold transition-all duration-200 sm:px-4 sm:text-xs"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:h-4 sm:w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
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
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
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
                      icon: (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      ),
                      url: "https://github.com",
                    },
                    {
                      id: "linkedin",
                      icon: (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      ),
                      url: "https://linkedin.com",
                    },
                    {
                      id: "email",
                      icon: (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      ),
                      url: "mailto:hello@shiv.dev",
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
