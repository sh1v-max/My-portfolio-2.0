import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import profile_pic from "../../assets/images/peakpx.jpg";
import { personal } from "../../data/config";

const hc = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const hi = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const SKILLS = [
  "React.js",
  "JavaScript (ES6+)",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST APIs",
  "Generative AI APIs",
  "Git & GitHub",
];

const QUICK_STATS = [
  { icon: "lucide:layers", value: "5", label: "Production apps" },
  { icon: "lucide:flask-conical", value: "33+", label: "Mini builds" },
  { icon: "lucide:map-pin", value: "Varanasi", label: "India" },
];

export default function AboutTeaser() {
  return (
    <section className="py-16 md:py-24">

      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">

        {/* Section header */}
        <motion.div
          variants={hc}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 flex flex-col items-start gap-3"
        >
          <motion.span
            variants={hi}
            className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          >
            <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
            About Me
          </motion.span>
          <motion.h2
            variants={hi}
            className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
          >
            About Me
          </motion.h2>
          <motion.p
            variants={hi}
            className="text-textMuted max-w-xl text-base leading-relaxed"
          >
            Full-Stack Developer specializing in the React ecosystem and Node.js backends,
            building fast, scalable, and motion-rich web applications.
          </motion.p>
          <motion.div
            variants={hi}
            className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
          />
        </motion.div>

        {/* Bio layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center gap-12 lg:flex-row lg:items-start"
        >
          {/* Profile photo — circular with glow ring */}
          <div className="group relative shrink-0 self-start">
            <div className="relative h-52 w-52 overflow-hidden rounded-full border-2 border-accentColor/30 shadow-[0_0_40px_color-mix(in_srgb,var(--color-accentColor)_20%,transparent)]">
              <img
                src={profile_pic}
                alt={personal.name}
                width={1200}
                height={1200}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            {/* Outer glow ring */}
            <div className="border-accentColor/15 absolute -inset-3 rounded-full border" />
            {/* Ambient behind photo */}
            <div className="bg-accentColor/10 pointer-events-none absolute -inset-8 -z-10 rounded-full blur-2xl" />
          </div>

          {/* Text content */}
          <div className="flex flex-1 flex-col gap-6 text-center lg:text-left">
            {/* Intro — the name gets full weight */}
            <div className="space-y-2">
              <p className="text-textSecondary text-xl leading-relaxed">
                Hi, I&apos;m{" "}
                <span className="text-textColor text-2xl font-black tracking-tight">
                  {personal.name}
                </span>
              </p>
              <p className="text-textMuted text-base leading-relaxed">
                a Full-Stack Developer based in{" "}
                <span className="text-accentColor font-semibold">{personal.location}</span>.
              </p>
            </div>

            <p className="text-textSecondary max-w-xl text-base leading-relaxed">
              I specialize in the React ecosystem, building responsive, performant web
              applications with clean architecture and thoughtful UX. My toolkit spans
              the modern JavaScript stack — React and Redux on the front end to Node.js
              and MongoDB on the back end.
            </p>

            {/* Quick stats strip */}
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              {QUICK_STATS.map(({ icon, value, label }) => (
                <div key={label} className="border-explorerBorder bg-articleBg flex items-center gap-2.5 rounded-xl border px-4 py-2.5">
                  <Icon icon={icon} className="text-accentColor h-4 w-4 shrink-0" />
                  <span className="text-textColor text-sm font-bold">{value}</span>
                  <span className="text-textMuted text-xs">{label}</span>
                </div>
              ))}
            </div>

            {/* Skill pills */}
            <div className="flex flex-col gap-3">
              <p className="text-textMuted text-center text-xs font-medium italic lg:text-left">
                Here are a few technologies I&apos;ve been working with recently:
              </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {SKILLS.map((s) => (
                <li
                  key={s}
                  className="text-textSecondary flex items-center gap-2 text-sm"
                >
                  <span className="text-accentColor shrink-0 text-xs">▹</span>
                  {s}
                </li>
              ))}
            </ul>
            </div>

            {/* CTA */}
            <div className="flex justify-center lg:justify-start">
              <Link
                to="/about"
                className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-accentColor/40 bg-accentColor/10 px-6 py-3 text-sm font-semibold text-accentColor transition-all duration-300 hover:bg-accentColor hover:text-mainBg focus-visible:outline-2 focus-visible:outline-accentColor"
              >
                Read full profile
                <Icon
                  icon="lucide:arrow-right"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
