/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="mb-8 relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Icon icon="lucide:search" className="h-4 w-4 text-textColor/50" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search projects by title or tags..."
        className="w-full rounded-xl border border-explorerBorder bg-articleBg/40 py-3 pl-11 pr-4 text-sm text-textColor outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-textColor/40 focus:border-accentColor focus:bg-articleBg/80 focus:shadow-[0_0_15px_rgba(136,192,208,0.15)]"
      />
    </div>
  );
}
