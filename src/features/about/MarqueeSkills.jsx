import { Icon } from "@iconify/react";

const row1 = [
  { name: "React", icon: "logos:react" },
  { name: "JavaScript", icon: "logos:javascript" },
  { name: "HTML5", icon: "logos:html-5" },
  { name: "CSS3", icon: "logos:css-3" },
  { name: "Tailwind", icon: "logos:tailwindcss-icon" },
  { name: "Redux", icon: "logos:redux" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
  { name: "MongoDB", icon: "logos:mongodb-icon" },
  { name: "Firebase", icon: "logos:firebase" },
  { name: "Git", icon: "logos:git-icon" },
  { name: "React Router", icon: "logos:react-router" },
  { name: "Vercel", icon: "simple-icons:vercel" },
  { name: "Postman", icon: "logos:postman-icon" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "Next.js", icon: "logos:nextjs-icon" },
  { name: "Framer Motion", icon: "logos:framer" },
  { name: "Material UI", icon: "logos:material-ui" },
  { name: "Sass", icon: "logos:sass" },
  { name: "Vite", icon: "logos:vitejs" },
  { name: "Axios", icon: "logos:axios" },
  { name: "MySQL", icon: "logos:mysql" },
];

const row2 = [
  { name: "Express", icon: "simple-icons:express" },
  { name: "JWT", icon: "logos:jwt-icon" },
  { name: "Netlify", icon: "logos:netlify-icon" },
  { name: "GitHub", icon: "mdi:github" },
  { name: "REST API", icon: "mdi:api" },
  { name: "React", icon: "logos:react" },
  { name: "JavaScript", icon: "logos:javascript" },
  { name: "Tailwind", icon: "logos:tailwindcss-icon" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
  { name: "MongoDB", icon: "logos:mongodb-icon" },
  { name: "Git", icon: "logos:git-icon" },
  { name: "Firebase", icon: "logos:firebase" },
  { name: "Redux", icon: "logos:redux" },
  { name: "PostgreSQL", icon: "logos:postgresql" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "Python", icon: "logos:python" },
  { name: "Chrome DevTools", icon: "logos:chrome" },
  { name: "NPM", icon: "logos:npm-icon" },
  { name: "VS Code", icon: "logos:visual-studio-code" },
  { name: "Bootstrap", icon: "logos:bootstrap" },
  { name: "React Query", icon: "logos:react-query-icon" },
];

export default function MarqueeSkills() {
  return (
    <div className="mt-8">
      <div className="relative mx-auto flex max-w-5xl flex-col gap-1 overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {/* Row 1 (Scrolling Left) - Faded */}
        <div className="animate-marquee-left flex w-max min-w-full shrink-0 gap-0 opacity-60 transition-opacity duration-500">
          {[...row1, ...row1, ...row1].map((skill, index) => (
            <div
              key={`r1-${index}`}
              className="flex shrink-0 cursor-default items-center gap-1 px-3"
            >
              <Icon
                icon={skill.icon}
                width={18}
                height={18}
                className="shrink-0"
              />
              <span className="text-textColor whitespace-nowrap text-[11px] font-semibold uppercase tracking-widest">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 (Scrolling Right) - More Faded */}
        <div className="animate-marquee-right flex w-max min-w-full shrink-0 gap-0 opacity-10 transition-opacity duration-500">
          {[...row2, ...row2, ...row2].map((skill, index) => (
            <div
              key={`r2-${index}`}
              className="flex shrink-0 cursor-default items-center gap-1 px-3"
            >
              <Icon
                icon={skill.icon}
                width={18}
                height={18}
                className="shrink-0"
              />
              <span className="text-textColor whitespace-nowrap text-[11px] font-semibold uppercase tracking-widest">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-33.33%); }
          to { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 50s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 55s linear infinite;
        }
      `}</style>
    </div>
  );
}
