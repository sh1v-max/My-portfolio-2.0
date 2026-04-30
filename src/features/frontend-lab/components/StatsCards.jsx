import { Code2, Layers, Blocks, TerminalSquare } from "lucide-react";

export default function StatsCards() {
  const stats = [
    { label: "Total Projects", value: "33+", icon: Blocks },
    { label: "Difficulty Levels", value: "3", icon: Layers },
    { label: "Core Stack", value: "React + JS", icon: Code2 },
    { label: "Categories", value: "UI / Logic / API", icon: TerminalSquare },
  ];

  return (
    <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="group flex flex-col items-start gap-3 rounded-xl border border-explorerBorder bg-articleBg/50 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accentColor/40 hover:shadow-[0_8px_30px_rgba(136,192,208,0.1)]"
          >
            <div className="rounded-lg bg-accentColor/10 p-2 text-accentColor transition-colors group-hover:bg-accentColor/20">
              <Icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-textColor">{stat.value}</p>
              <p className="text-xs font-medium uppercase tracking-wider text-textColor/50">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
