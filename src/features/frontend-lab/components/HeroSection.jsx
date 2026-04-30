import { FaGithub } from "react-icons/fa";

export default function HeroSection() {
  return (
    <div className="mb-12 flex flex-col items-start gap-4">
      {/* Badge */}
      <span className="inline-flex items-center gap-2 rounded-full border border-accentColor/30 bg-accentColor/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accentColor shadow-[0_0_15px_rgba(136,192,208,0.2)]">
        <span className="h-1.5 w-1.5 rounded-full bg-accentColor animate-pulse" />
        33+ Builds
      </span>

      {/* Title */}
      <h1 className="text-4xl font-extrabold tracking-tight text-textColor sm:text-5xl">
        Frontend Lab
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl text-base leading-relaxed text-textColor/70">
        A collection of UI systems, machine coding challenges, and frontend experiments built to sharpen real-world development skills.
      </p>

      {/* Repository Link */}
      <a
        href="https://github.com/sh1v-max/Practice-UI-design-React-and-JS"
        target="_blank"
        rel="noreferrer"
        className="mt-2 group inline-flex items-center gap-2 rounded-lg border border-explorerBorder bg-articleBg/50 px-4 py-2.5 text-sm font-semibold text-textColor transition-all duration-300 hover:border-accentColor/50 hover:bg-accentColor/10 hover:text-accentColor active:scale-[0.97]"
      >
        <FaGithub className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        View Full Repository
      </a>

      {/* Decorative gradient line */}
      <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-accentColor to-transparent opacity-80" />
    </div>
  );
}
