/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";

export default function FilterTabs({
  levels,
  selectedLevel,
  setSelectedLevel,
  categories,
  selectedCategory,
  setSelectedCategory,
  onReset,
}) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
      <div className="flex flex-col gap-4">
        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-semibold text-textColor/60">Level:</span>
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 active:scale-95 ${
                selectedLevel === level
                  ? "bg-accentColor text-mainBg shadow-[0_0_10px_rgba(136,192,208,0.3)]"
                  : "border border-explorerBorder bg-articleBg/50 text-textColor/70 hover:border-accentColor/50 hover:text-accentColor"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-semibold text-textColor/60">Category:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 active:scale-95 ${
                selectedCategory === category
                  ? "bg-accentColor text-mainBg shadow-[0_0_10px_rgba(136,192,208,0.3)]"
                  : "border border-explorerBorder bg-articleBg/50 text-textColor/70 hover:border-accentColor/50 hover:text-accentColor"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="group flex items-center gap-2 rounded-lg border border-explorerBorder px-4 py-2 text-xs font-semibold text-textColor/70 transition-all duration-300 hover:border-accentColor/50 hover:text-accentColor active:scale-95"
      >
        <Icon 
          icon="lucide:refresh-cw" 
          className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 duration-500" 
        />
        Reset Filters
      </button>
    </div>
  );
}
