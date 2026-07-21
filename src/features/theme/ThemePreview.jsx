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

export default function ThemePreview({ themeClass }) {
  return (
    <motion.div
      className={`${themeClass} aspect-16/10 w-full overflow-hidden rounded-lg shadow-inner`}
    >
      {/* Entire mini-window uses the scoped theme */}
      <div className="bg-mainBg flex h-full w-full flex-col">
        {/* ─── Title Bar ─── */}
        <div className="bg-titlebarBg flex items-center gap-1.5 px-2.5 py-1.25">
          <span className="h-1.75 w-1.75 rounded-full bg-[#ff5f56]" />
          <span className="h-1.75 w-1.75 rounded-full bg-[#ffbd2e]" />
          <span className="h-1.75 w-1.75 rounded-full bg-[#27c93f]" />
          <div className="ml-auto flex gap-1">
            <div className="bg-textColor/10 h-1.25 w-8 rounded-sm" />
            <div className="bg-accentColor/30 h-1.25 w-6 rounded-sm" />
          </div>
        </div>

        {/* ─── Tabs Bar ─── */}
        <div className="bg-tabsBg flex items-end gap-px px-1 pt-px">
          <div className="bg-tabActiveBg flex items-center gap-1 rounded-t-[3px] px-2 py-0.75">
            <div className="bg-accentColor/60 h-1.25 w-1.25 rounded-sm" />
            <div className="bg-textColor/30 h-1 w-10 rounded-sm" />
          </div>
          <div className="flex items-center gap-1 px-2 py-0.75 opacity-40">
            <div className="bg-textColor/20 h-1.25 w-1.25 rounded-sm" />
            <div className="bg-textColor/15 h-1 w-8 rounded-sm" />
          </div>
        </div>

        {/* ─── Body: Sidebar + Editor ─── */}
        <div className="border-explorerBorder/30 flex flex-1 overflow-hidden border-t">
          {/* Sidebar / Explorer */}
          <div className="border-explorerBorder/30 bg-explorerBg flex w-[28%] flex-col gap-0.75 border-r p-2 pt-2.5">
            {/* Section label */}
            <div className="bg-textColor/15 mb-1 h-1 w-10 rounded-sm" />
            {/* File list */}
            {SIDEBAR_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-1 rounded-[3px] px-1 py-0.5 ${
                  item.active ? "bg-explorerHoverBg" : ""
                }`}
              >
                <div
                  className={`h-1.25 w-1.25 rounded-xs ${
                    item.active ? "bg-accentColor/70" : "bg-textColor/20"
                  }`}
                />
                <div
                  className={`h-1 rounded-sm ${item.w} ${
                    item.active ? "bg-textColor/40" : "bg-textColor/15"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Editor Area */}
          <div className="bg-mainBg flex flex-1 flex-col gap-1 p-2.5 pl-3">
            {CODE_LINES.map((line, i) => (
              <div
                key={i}
                className="flex items-center gap-1"
                style={{ paddingLeft: `${line.indent * 10}px` }}
              >
                {/* Line number */}
                <span className="bg-textColor/10 mr-1 h-1 w-3 rounded-sm" />
                {/* Code tokens */}
                {line.widths.map((w, j) => (
                  <div
                    key={j}
                    className={`h-1 rounded-sm ${w} ${
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
        <div className="bg-bottombarBg border-bottombarBorder/30 flex items-center justify-between border-t px-2 py-0.75">
          <div className="flex items-center gap-2">
            <div className="bg-accentColor/40 h-1 w-8 rounded-sm" />
            <div className="bg-textColor/15 h-1 w-6 rounded-sm" />
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-textColor/10 h-1 w-10 rounded-sm" />
            <div className="bg-textColor/10 h-1 w-6 rounded-sm" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
