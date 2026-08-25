import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import resumeFile from "../assets/docs/resume.pdf";
import { personal } from "../data/config";
import { useActiveSection } from "../hooks/useActiveSection";
import ThemeToggle from "../features/theme/FloatingThemeButton";
import BackButton from "./BackButton";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

const navLinks = [
  { name: "Home",     path: "/",            sectionId: "home" },
  { name: "About",    path: "/about",        sectionId: "about" },
  { name: "Projects", path: "/#projects",    sectionId: "projects" },
  { name: "Archive",  path: "/frontend-lab", sectionId: null },
  { name: "GitHub",   path: "/github",       sectionId: null },
  { name: "Contact",  path: "/contact",      sectionId: "contact" },
];

const TICKER_TEXT = [
  "FULL STACK DEVELOPER", "REACT & NODE.JS", "EXPLORE MY WORK",
  "OPEN TO OPPORTUNITIES", "FRAMER MOTION", "BUILDING FOR THE WEB",
];
const tickerItems = [...TICKER_TEXT, ...TICKER_TEXT, ...TICKER_TEXT, ...TICKER_TEXT];

const SCROLL_SECTION_PATH = { lab: "/frontend-lab", github: "/github" };

// Smoother expo-out — more organic deceleration, less mechanical
const EASE_EXPO  = [0.22, 1, 0.36, 1];
// Sharper ease-in — panel collapses decisively, not gradually
const EASE_IN    = [0.55, 0, 1, 0.45];
const CLIP_OPEN  = { duration: 0.48, ease: EASE_EXPO };
const CLIP_CLOSE = { duration: 0.2,  ease: EASE_IN };

// Items float DOWN into position (gravity-aware). delay = i × 22ms,
// last item (i=13) finishes at 286+260ms = 546ms ≈ panel fully settled.
const itemVar = {
  hidden: { opacity: 0, y: -6 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.26, ease: EASE_EXPO, delay: i * 0.022 },
  }),
};

const primaryLinks = navLinks.filter(l => l.sectionId !== null);
const exploreLinks = navLinks.filter(l => l.sectionId === null);

// Item index map so stagger reads naturally top-to-bottom, left-to-right:
// Col 1: Navigate(0) Home(1) About(2) Projects(3) Contact(4)
// Col 2: Explore(5) Lab(6) GitHub(7) desc(8)
// Col 3: Connect(9) badge(10) gh(11) li(12) mail(13)

function NavBar() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [open, setOpen]             = useState(false);
  const [tickerVisible, setTickerVisible] = useState(true);
  const [pulseReady, setPulseReady] = useState(false);
  const [emailCopied, copyEmail] = useCopyToClipboard();
  const { activeSection, isMainPage } = useActiveSection();
  const cardRef = useRef(null);
  const toggleRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setTickerVisible(window.scrollY <= 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset pulse when menu closes
  useEffect(() => { if (!open) setPulseReady(false); }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Escape closes the menu and returns focus to the trigger; Tab is trapped
  // inside the card while open, so keyboard focus never falls behind onto
  // page content the panel is visually covering.
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = cardRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Move focus into the panel once it has content to land on, so a keyboard
  // user opening the menu doesn't have to tab past the header controls again.
  useEffect(() => {
    if (!open) return;
    const firstLink = cardRef.current?.querySelector('[data-mega-panel] button, [data-mega-panel] a');
    firstLink?.focus();
  }, [open]);

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

  // The ticker is identity-setting copy, so it belongs on the landing page and
  // nowhere else — elsewhere it repeats itself and pushes content down. It also
  // keeps the header stack unambiguous: the back button never appears on home,
  // the ticker only appears on home, so the two can never stack awkwardly.
  const isHome = location.pathname === "/";
  const showTicker = tickerVisible && !open;

  return (
    <div className="sticky top-0 z-50 px-4 pt-3 sm:px-6 md:px-8">

      {/* ── Relative wrapper — mega-menu positions against this ── */}
      <div ref={cardRef} className="relative mx-auto max-w-7xl">

        {/* ── Floating card — relative z-50 keeps it above the mega-menu panel ── */}
        <div className={`relative z-50 bg-articleBg transition-[border-radius,box-shadow] duration-300 ${open ? "rounded-t-2xl shadow-none" : "rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]"}`}>
          <div className="grid h-17 grid-cols-3 items-center px-5 sm:px-7">

            {/* Left — hamburger */}
            <button
              ref={toggleRef}
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle navigation"
              aria-expanded={open}
              aria-haspopup="true"
              className="group flex self-stretch items-center gap-2.5 justify-self-start focus-visible:outline-2 focus-visible:outline-accentColor"
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
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.13 }}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-textMuted group-hover:text-textColor transition-colors duration-200"
                >
                  {open ? "Close" : "Menu"}
                </motion.span>
              </AnimatePresence>
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
                aria-label="Download resume PDF"
                className="flex items-center gap-1.5 rounded-xl bg-accentColor px-3 py-2 text-[10px] font-black uppercase tracking-wider text-mainBg transition-opacity duration-200 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentColor sm:px-4 sm:text-xs"
              >
                <Icon icon="lucide:download" className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" strokeWidth="3" />
                <span className="hidden sm:inline">Resume</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* ── Mega-menu overlay — GPU clipPath, zero layout impact ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mega"
              data-mega-panel
              role="menu"
              aria-label="Site navigation"
              className="absolute left-0 right-0 top-full z-40 rounded-b-2xl bg-articleBg shadow-[0_20px_48px_rgba(0,0,0,0.38)]"
              initial={{ clipPath: "inset(0 0 100% 0 round 0 0 1rem 1rem)", y: shouldReduceMotion ? 0 : -10 }}
              animate={{ clipPath: "inset(0 0 0% 0 round 0 0 1rem 1rem)", y: 0 }}
              exit={{ clipPath: "inset(0 0 100% 0 round 0 0 1rem 1rem)", y: 0, transition: shouldReduceMotion ? { duration: 0 } : CLIP_CLOSE }}
              transition={shouldReduceMotion ? { duration: 0 } : CLIP_OPEN}
              onAnimationComplete={() => setPulseReady(true)}
            >
              {/* Separator */}
              <div className="mx-5 border-t border-explorerBorder/20 sm:mx-7" />

              {/* Three-column grid */}
              <div className="grid grid-cols-1 gap-8 px-5 py-7 sm:grid-cols-[5fr_3fr_3fr] sm:gap-0 sm:px-7 sm:py-10">

                {/* ── Col 1: Navigate ── */}
                <div className="flex flex-col sm:border-r sm:border-explorerBorder/12 sm:pr-10 lg:pr-16">
                  <motion.p
                    custom={0} variants={itemVar} initial="hidden" animate="show"
                    className="mb-5 text-[9px] font-black uppercase tracking-[0.28em] text-textMuted"
                  >
                    Navigate
                  </motion.p>

                  {primaryLinks.map((link, li) => {
                    const active = isActive(link);
                    return (
                      <motion.div
                        key={link.sectionId}
                        custom={li + 1} variants={itemVar} initial="hidden" animate="show"
                      >
                        {/* motion.button propagates "hover"/"tap" to children via variants */}
                        <motion.button
                          onClick={() => handleClick(link)}
                          whileHover="hover"
                          whileTap="tap"
                          className="group flex w-full cursor-pointer items-center justify-between border-b border-explorerBorder/15 py-3 text-left sm:py-3.5"
                        >
                          <motion.span
                            variants={{
                              hover: { x: 9, transition: { type: "spring", stiffness: 320, damping: 26 } },
                              tap:   { x: 4,  transition: { duration: 0.1 } },
                            }}
                            className={`text-3xl font-black uppercase leading-none tracking-tight transition-colors duration-200 sm:text-4xl lg:text-5xl ${
                              active ? "text-accentColor" : "text-textSecondary group-hover:text-textColor"
                            }`}
                          >
                            {link.name}
                          </motion.span>
                          {/* Arrow: slides diagonally up-right on hover; base opacity follows active state */}
                          <motion.div
                            animate={{ opacity: active ? 1 : 0, x: 0, y: 0 }}
                            variants={{
                              hover: { x: 5, y: -5, opacity: 1, transition: { duration: 0.2, ease: EASE_EXPO } },
                              tap:   { x: 2, y: -2, opacity: 1 },
                            }}
                            className="flex shrink-0 items-center gap-2 pl-4"
                          >
                            {active && <span className="h-1.5 w-1.5 rounded-full bg-accentColor" />}
                            <Icon
                              icon="lucide:arrow-up-right"
                              className={`h-5 w-5 ${active ? "text-accentColor" : "text-textColor"}`}
                            />
                          </motion.div>
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* ── Col 2: Explore ── */}
                <div className="flex flex-col sm:border-r sm:border-explorerBorder/12 sm:px-10 lg:px-14">
                  <motion.p
                    custom={5} variants={itemVar} initial="hidden" animate="show"
                    className="mb-5 text-[9px] font-black uppercase tracking-[0.28em] text-textMuted"
                  >
                    Explore
                  </motion.p>

                  {exploreLinks.map((link, li) => {
                    const active = isActive(link);
                    return (
                      <motion.div
                        key={link.path}
                        custom={li + 6} variants={itemVar} initial="hidden" animate="show"
                      >
                        <motion.button
                          onClick={() => handleClick(link)}
                          whileHover="hover"
                          whileTap="tap"
                          className="group flex w-full cursor-pointer items-center justify-between border-b border-explorerBorder/15 py-3 text-left sm:py-3.5"
                        >
                          <motion.span
                            variants={{
                              hover: { x: 9, transition: { type: "spring", stiffness: 320, damping: 26 } },
                              tap:   { x: 4,  transition: { duration: 0.1 } },
                            }}
                            className={`text-3xl font-black uppercase leading-none tracking-tight transition-colors duration-200 sm:text-4xl ${
                              active ? "text-accentColor" : "text-textSecondary group-hover:text-textColor"
                            }`}
                          >
                            {link.name}
                          </motion.span>
                          <motion.div
                            animate={{ opacity: active ? 1 : 0, x: 0, y: 0 }}
                            variants={{
                              hover: { x: 5, y: -5, opacity: 1, transition: { duration: 0.2, ease: EASE_EXPO } },
                              tap:   { x: 2, y: -2, opacity: 1 },
                            }}
                            className="flex shrink-0 items-center gap-2 pl-4"
                          >
                            {active && <span className="h-1.5 w-1.5 rounded-full bg-accentColor" />}
                            <Icon
                              icon="lucide:arrow-up-right"
                              className={`h-5 w-5 ${active ? "text-accentColor" : "text-textColor"}`}
                            />
                          </motion.div>
                        </motion.button>
                      </motion.div>
                    );
                  })}

                  <motion.p
                    custom={8} variants={itemVar} initial="hidden" animate="show"
                    className="mt-5 text-[11px] leading-relaxed text-textMuted"
                  >
                    UI experiments, open-source work,<br className="hidden sm:block" /> and GitHub contributions.
                  </motion.p>
                </div>

                {/* ── Col 3: Connect ── */}
                <div className="flex flex-col sm:pl-10 lg:pl-14">
                  <motion.p
                    custom={9} variants={itemVar} initial="hidden" animate="show"
                    className="mb-5 text-[9px] font-black uppercase tracking-[0.28em] text-textMuted"
                  >
                    Connect
                  </motion.p>

                  {/* Open-to-work badge — scale on hover, pulse gated until clip finishes */}
                  <motion.div
                    custom={10} variants={itemVar} initial="hidden" animate="show"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2, ease: EASE_EXPO } }}
                    whileTap={{ scale: 0.96 }}
                    className="mb-6 flex w-fit cursor-default items-center gap-2 rounded-full border border-accentColor/22 bg-accentColor/8 px-3.5 py-1.5"
                  >
                    <motion.span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accentColor"
                      animate={pulseReady ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
                      transition={pulseReady ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : {}}
                    />
                    <span className="text-[9px] font-black uppercase tracking-[0.22em] text-accentColor">
                      Open to work
                    </span>
                  </motion.div>

                  {/* Social links — icon spring-rotates, label slides right */}
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: "lucide:github",   label: "sh1v-max",    href: personal.github,   external: true },
                      { icon: "lucide:linkedin", label: "LinkedIn",     href: personal.linkedin, external: true },
                      { icon: "lucide:mail",     label: personal.email, sectionId: "contact",    external: false },
                    ].map((s, si) => (
                      <motion.a
                        key={s.icon}
                        custom={11 + si} variants={itemVar} initial="hidden" animate="show"
                        whileHover="hover"
                        whileTap="tap"
                        href={s.external ? s.href : undefined}
                        target={s.external ? "_blank" : undefined}
                        rel={s.external ? "noopener noreferrer" : undefined}
                        onClick={!s.external ? (e) => { e.preventDefault(); setOpen(false); navigate("/contact"); } : undefined}
                        className="group flex min-w-0 cursor-pointer items-center gap-3 text-textMuted transition-colors duration-200 hover:text-accentColor"
                      >
                        <motion.div
                          variants={{
                            hover: { scale: 1.15, rotate: -10, transition: { type: "spring", stiffness: 380, damping: 14 } },
                            tap:   { scale: 0.88, rotate: 0,  transition: { duration: 0.1 } },
                          }}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-explorerBorder/25 bg-textColor/5 transition-all duration-200 group-hover:border-accentColor/30 group-hover:bg-accentColor/10"
                        >
                          <Icon icon={s.icon} width="18" height="18" />
                        </motion.div>
                        <motion.span
                          variants={{
                            hover: { x: 5, transition: { duration: 0.22, ease: EASE_EXPO } },
                            tap:   { x: 2 },
                          }}
                          className="min-w-0 flex-1 truncate text-xs font-medium tracking-wide"
                        >
                          {s.label}
                        </motion.span>
                        {/* mailto: doesn't reliably open a compose window on
                            every browser/OS — copy is the fallback that
                            always works. */}
                        {!s.external && (
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); copyEmail(personal.email); }}
                            title={emailCopied ? "Copied!" : "Copy email"}
                            aria-label={emailCopied ? "Email copied" : "Copy email address"}
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-200 ${
                              emailCopied ? "text-accentColor" : "text-textMuted hover:text-accentColor"
                            }`}
                          >
                            <Icon icon={emailCopied ? "lucide:check" : "lucide:copy"} width="13" height="13" />
                          </button>
                        )}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Inside the navbar's own sticky container on purpose: the button then
          travels with the header for free, rather than needing its own `top`
          offset that would drift as the header height changes.
          Placed directly under the card, above the ticker — the ticker fades
          out on scroll but keeps its space, so sitting below it would leave a
          gap with page content scrolling through. */}
      <BackButton />

      {/* ── Ticker — home only; fades at top, hides when menu open ──
          Gated on render, not just opacity: an invisible ticker would still
          reserve its height and leave a dead band under the back button with
          page content scrolling through it. */}
      {isHome && (
      <motion.div
        animate={{
          opacity: showTicker ? 1 : 0,
          y:       showTicker ? 0 : -6,
        }}
        transition={{
          opacity: { duration: showTicker ? 0.45 : 0.2, ease: "easeInOut" },
          y:       { duration: showTicker ? 0.45 : 0.2, ease: [0.25, 0.1, 0.25, 1] },
        }}
        style={{ pointerEvents: showTicker ? "auto" : "none" }}
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-accentColor py-1.75">
          <motion.div
            animate={shouldReduceMotion ? {} : { x: ["0%", "-50%"] }}
            transition={shouldReduceMotion ? {} : { duration: 28, repeat: Infinity, ease: "linear" }}
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
      )}
    </div>
  );
}

export default NavBar;
