import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { personal } from "../data/config";

const socialLinks = [
  { icon: "mdi:github",            href: personal.github,    label: "GitHub" },
  { icon: "mdi:instagram",         href: personal.instagram, label: "Instagram" },
  { icon: "ri:twitter-x-fill",     href: personal.twitter,   label: "X (Twitter)" },
  { icon: "mdi:linkedin",          href: personal.linkedin,  label: "LinkedIn" },
  { icon: "simple-icons:leetcode", href: personal.leetcode,  label: "LeetCode" },
];

const CONTENT_H = 190;
const LINE_H    = 120;
const GAP       = 12;

const hoverSpring  = { type: "spring", stiffness: 350, damping: 28 };
// Tween for email — spring can overshoot on vertical-rl and cause flicker
const hoverTween   = { duration: 0.2, ease: "easeOut" };

export default function SocialSidebar() {
  const navigate = useNavigate();
  return (
    <>
      {/* ── Left: social icons ── */}
      <aside className="fixed bottom-0 left-8 z-40 hidden flex-col items-center xl:flex" style={{ gap: GAP }}>
        <div
          className="flex flex-col items-center justify-between"
          style={{ height: CONTENT_H }}
        >
          {socialLinks.map(({ icon, href, label }, i) => (
            // Outer div handles stagger entry — keeps entry delay out of hover state
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.45, ease: "easeOut" }}
            >
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={hoverSpring}
                className="group relative block text-textMuted hover:text-accentColor transition-colors duration-200"
              >
                <Icon icon={icon} width="23" height="23" />
                <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-articleBg border border-explorerBorder px-2.5 py-1 text-[11px] font-semibold tracking-wide text-textColor opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                  {label}
                </span>
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.span
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.65, duration: 0.55, ease: "easeOut" }}
          className="bg-accentColor/50 w-0.5 origin-top rounded-full"
          style={{ height: LINE_H }}
        />
      </aside>

      {/* ── Right: email ── */}
      <aside className="fixed bottom-0 right-8 z-40 hidden flex-col items-center xl:flex" style={{ gap: GAP }}>
        <div
          className="flex items-center justify-center"
          style={{ height: CONTENT_H }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.45, ease: "easeOut" }}
          >
            <motion.a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={hoverTween}
              className="group relative text-textMuted hover:text-accentColor text-[13px] font-semibold tracking-[0.15em] transition-colors duration-200"
              style={{ writingMode: "vertical-rl" }}
            >
              {personal.email}
              <span
                className="pointer-events-none absolute bottom-full right-1/2 mb-3 translate-x-1/2 whitespace-nowrap rounded-md bg-articleBg border border-explorerBorder px-2.5 py-1 text-[11px] font-semibold tracking-wide text-textColor opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
                style={{ writingMode: "horizontal-tb" }}
              >
                Say hello
              </span>
            </motion.a>
          </motion.div>
        </div>

        <motion.span
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.65, duration: 0.55, ease: "easeOut" }}
          className="bg-accentColor/50 w-0.5 origin-top rounded-full"
          style={{ height: LINE_H }}
        />
      </aside>
    </>
  );
}
