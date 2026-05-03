/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

/**
 * A mini VSCode-like UI illustration that renders using
 * the actual CSS variables of each theme. Wrapping in
 * `.theme-<name>` scopes the Tailwind color utilities
 * to that theme's palette.
 */

const CODE_LINES = [
  { indent: 0, widths: ["w-16", "w-10"], keyword: true },
  { indent: 1, widths: ["w-20", "w-8", "w-12"], keyword: false },
  { indent: 2, widths: ["w-14", "w-24"], keyword: false },
  { indent: 2, widths: ["w-10", "w-16", "w-6"], keyword: true },
  { indent: 1, widths: ["w-8"], keyword: false },
  { indent: 0, widths: ["w-12", "w-10"], keyword: true },
  { indent: 1, widths: ["w-28"], keyword: false },
  { indent: 1, widths: ["w-16", "w-12"], keyword: false },
];

const SIDEBAR_ITEMS = [
  { w: "w-14", active: false },
  { w: "w-10", active: true },
  { w: "w-16", active: false },
  { w: "w-12", active: false },
  { w: "w-8", active: false },
];

const floatingAnimation = {
  y: [0, -4, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function ThemePreview({ themeClass }) {
  return (
    <motion.div
      animate={floatingAnimation}
      className={`${themeClass} aspect-[16/10] w-full overflow-hidden rounded-lg shadow-inner`}
    >
      {/* Entire mini-window uses the scoped theme */}
      <div className="flex h-full w-full flex-col bg-mainBg">
        {/* ─── Title Bar ─── */}
        <div className="flex items-center gap-1.5 bg-titlebarBg px-2.5 py-[5px]">
          <span className="h-[7px] w-[7px] rounded-full bg-[#ff5f56]" />
          <span className="h-[7px] w-[7px] rounded-full bg-[#ffbd2e]" />
          <span className="h-[7px] w-[7px] rounded-full bg-[#27c93f]" />
          <div className="ml-auto flex gap-1">
            <div className="h-[5px] w-8 rounded-sm bg-textColor/10" />
            <div className="h-[5px] w-6 rounded-sm bg-accentColor/30" />
          </div>
        </div>

        {/* ─── Tabs Bar ─── */}
        <div className="flex items-end gap-px bg-tabsBg px-1 pt-px">
          <div className="flex items-center gap-1 rounded-t-[3px] bg-tabActiveBg px-2 py-[3px]">
            <div className="h-[5px] w-[5px] rounded-sm bg-accentColor/60" />
            <div className="h-[4px] w-10 rounded-sm bg-textColor/30" />
          </div>
          <div className="flex items-center gap-1 px-2 py-[3px] opacity-40">
            <div className="h-[5px] w-[5px] rounded-sm bg-textColor/20" />
            <div className="h-[4px] w-8 rounded-sm bg-textColor/15" />
          </div>
        </div>

        {/* ─── Body: Sidebar + Editor ─── */}
        <div className="flex flex-1 overflow-hidden border-t border-explorerBorder/30">
          {/* Sidebar / Explorer */}
          <div className="flex w-[28%] flex-col gap-[3px] border-r border-explorerBorder/30 bg-explorerBg p-2 pt-2.5">
            {/* Section label */}
            <div className="mb-1 h-[4px] w-10 rounded-sm bg-textColor/15" />
            {/* File list */}
            {SIDEBAR_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-1 rounded-[3px] px-1 py-[2px] ${
                  item.active ? "bg-explorerHoverBg" : ""
                }`}
              >
                <div
                  className={`h-[5px] w-[5px] rounded-[2px] ${
                    item.active ? "bg-accentColor/70" : "bg-textColor/20"
                  }`}
                />
                <div
                  className={`h-[4px] rounded-sm ${item.w} ${
                    item.active ? "bg-textColor/40" : "bg-textColor/15"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Editor Area */}
          <div className="flex flex-1 flex-col gap-[4px] bg-mainBg p-2.5 pl-3">
            {CODE_LINES.map((line, i) => (
              <div
                key={i}
                className="flex items-center gap-[4px]"
                style={{ paddingLeft: `${line.indent * 10}px` }}
              >
                {/* Line number */}
                <span className="mr-1 h-[4px] w-3 rounded-sm bg-textColor/10" />
                {/* Code tokens */}
                {line.widths.map((w, j) => (
                  <div
                    key={j}
                    className={`h-[4px] rounded-sm ${w} ${
                      line.keyword && j === 0
                        ? "bg-accentColor/50"
                        : j === 1
                          ? "bg-textColor/25"
                          : "bg-textColor/15"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Status Bar ─── */}
        <div className="flex items-center justify-between bg-bottombarBg px-2 py-[3px] border-t border-bottombarBorder/30">
          <div className="flex items-center gap-2">
            <div className="h-[4px] w-8 rounded-sm bg-accentColor/40" />
            <div className="h-[4px] w-6 rounded-sm bg-textColor/15" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[4px] w-10 rounded-sm bg-textColor/10" />
            <div className="h-[4px] w-6 rounded-sm bg-textColor/10" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
