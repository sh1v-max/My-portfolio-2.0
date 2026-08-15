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

const SKILLS = ["React 19", "Node.js", "MongoDB", "Framer Motion", "Tailwind CSS v4"];

export default function AboutTeaser() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">

        {/* Section header — identical pattern to every other page */}
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
            className="text-textColor/60 max-w-xl text-base leading-relaxed"
          >
            Full-Stack Developer specializing in the React ecosystem and Node.js backends,
            building fast, scalable, and motion-rich web applications.
          </motion.p>
          <motion.div
            variants={hi}
            className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
          />
        </motion.div>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center gap-10 lg:flex-row lg:items-start"
        >
          {/* Profile photo */}
          <div className="group relative shrink-0">
            <div className="border-accentColor/25 overflow-hidden rounded-2xl border-2">
              <img
                src={profile_pic}
                alt={personal.name}
                className="h-56 w-48 object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            {/* Ambient glow behind the photo */}
            <div className="bg-accentColor/10 group-hover:bg-accentColor/20 pointer-events-none absolute -inset-6 -z-10 rounded-full blur-2xl transition-all duration-500" />
          </div>

          {/* Text content */}
          <div className="flex flex-1 flex-col gap-5 text-center lg:text-left">
            <p className="text-textColor/80 text-lg leading-relaxed">
              Hi, I&apos;m{" "}
              <span className="text-textColor font-bold">{personal.name}</span>, a
              Full-Stack Developer based in{" "}
              <span className="text-accentColor font-medium">{personal.location}</span>.
            </p>
            <p className="text-textColor/65 max-w-2xl text-base leading-relaxed">
              I specialize in the React ecosystem, building responsive, performant web
              applications with clean architecture and thoughtful UX. My toolkit spans
              the modern JavaScript stack — React and Redux on the front end to Node.js
              and MongoDB on the back end.
            </p>

            {/* Skill pills */}
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {SKILLS.map((s) => (
                <span
                  key={s}
                  className="border-accentColor/20 bg-accentColor/5 text-accentColor/80 rounded-full border px-3.5 py-1 text-xs font-medium"
                >
                  {s}
                </span>
              ))}
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
