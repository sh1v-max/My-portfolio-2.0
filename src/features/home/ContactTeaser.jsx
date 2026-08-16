import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { personal } from "../../data/config";

const hc = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const hi = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const CHANNELS = [
  {
    icon: "lucide:mail",
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    description: "Best for project inquiries",
  },
  {
    icon: "lucide:linkedin",
    label: "LinkedIn",
    value: `in/${personal.linkedinUsername}`,
    href: personal.linkedin,
    description: "Professional network",
  },
  {
    icon: "lucide:github",
    label: "GitHub",
    value: `@${personal.githubUsername}`,
    href: personal.github,
    description: "Browse my open-source work",
  },
];

export default function ContactTeaser() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Ambient glow — bottom-left this time */}
      <div
        className="pointer-events-none absolute -bottom-12 -left-24 h-96 w-96 rounded-full bg-accentColor/5 blur-[96px]"
        aria-hidden="true"
      />

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
            Get in Touch
          </motion.span>
          <motion.h2
            variants={hi}
            className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
          >
            Contact Me
          </motion.h2>
          <motion.p
            variants={hi}
            className="text-textColor/60 max-w-xl text-base leading-relaxed"
          >
            Open to full-stack and frontend roles, freelance work, and creative web
            projects. If you've made it this far, let's talk.
          </motion.p>
          <motion.div
            variants={hi}
            className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
          />
        </motion.div>

        {/* Bold statement + channel cards */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">

          {/* Left: bold statement + availability */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-6 lg:max-w-xs lg:shrink-0"
          >
            <p className="text-textColor text-2xl font-bold leading-tight tracking-tight md:text-3xl">
              Let&apos;s build something{" "}
              <span className="text-accentColor">great</span>{" "}
              together.
            </p>
            <p className="text-textColor/60 text-sm leading-relaxed">
              I respond to emails within 24 hours. For quick questions, LinkedIn or
              GitHub works just as well.
            </p>

            {/* Availability status card */}
            <div className="border-explorerBorder bg-articleBg rounded-2xl border p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="bg-accentColor absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                  <span className="bg-accentColor relative inline-flex h-2.5 w-2.5 rounded-full" />
                </div>
                <span className="text-accentColor text-xs font-bold uppercase tracking-widest">
                  Available for work
                </span>
              </div>
              <p className="text-textColor/50 text-xs leading-relaxed">
                Currently open to full-time roles and select freelance projects.
                Remote-friendly, flexible timezones.
              </p>
            </div>
          </motion.div>

          {/* Right: contact channels */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-1 flex-col gap-4"
          >
            {CHANNELS.map(({ icon, label, value, href, description }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -2 }}
                className="group border-explorerBorder bg-articleBg hover:border-accentColor/30 flex items-center gap-5 rounded-2xl border p-5 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              >
                <div className="bg-accentColor/10 group-hover:bg-accentColor/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300">
                  <Icon icon={icon} className="text-accentColor h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-textColor/40 text-xs font-semibold uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-textColor mt-0.5 truncate text-sm font-bold">
                    {value}
                  </p>
                  <p className="text-textColor/35 mt-0.5 text-xs">
                    {description}
                  </p>
                </div>
                <Icon
                  icon="lucide:arrow-up-right"
                  className="text-textColor/20 group-hover:text-accentColor h-5 w-5 shrink-0 transition-colors duration-300"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex justify-start"
        >
          <Link
            to="/contact"
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-accentColor/40 bg-accentColor/10 px-6 py-3 text-sm font-semibold text-accentColor transition-all duration-300 hover:bg-accentColor hover:text-mainBg focus-visible:outline-2 focus-visible:outline-accentColor"
          >
            Send a message
            <Icon
              icon="lucide:arrow-right"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
