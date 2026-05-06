import { Icon } from "@iconify/react";

export default function EmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-explorerBorder bg-articleBg/30 p-8 text-center backdrop-blur-sm">
      <div className="mb-4 rounded-full bg-articleBg p-4 text-textColor/50 shadow-inner">
        <Icon icon="lucide:search-x" width={32} height={32} />
      </div>
      <h3 className="mb-2 text-lg font-bold text-textColor">
        No projects found
      </h3>
      <p className="text-sm text-textColor/60">
        Try adjusting your filters or search query to find what you&apos;re looking for.
      </p>
    </div>
  );
}
