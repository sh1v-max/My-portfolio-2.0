import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { personal } from "../../data/config";
import ContactForm from "../contact/ContactForm";
import SectionHeader from "../../components/SectionHeader";

const CHANNELS = [
  {
    icon: "lucide:mail",
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: "lucide:linkedin",
    label: "LinkedIn",
    value: `in/${personal.linkedinUsername}`,
    href: personal.linkedin,
  },
  {
    icon: "lucide:github",
    label: "GitHub",
    value: `@${personal.githubUsername}`,
    href: personal.github,
  },
];

export default function ContactTeaser() {
  return (
    <section className="bg-articleBg/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">

        <SectionHeader
          eyebrow="Get in touch"
          title="Let's build something great"
          lede="Open to full-stack and frontend roles, freelance work, and creative web projects. If you've made it this far, let's talk."
          size="md"
          className="mb-14"
        />

        {/*
          The form itself, not a link to it.

          This is the last section of the page, so it is the moment a visitor is
          most likely to act — and it used to be the one section that could not
          be acted on without navigating somewhere else. On mobile the form
          comes first (`order-first`), because someone who scrolled this far
          already knows how to reach me; the channels below are the fallback.
        */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">

          {/* Left: availability + direct channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Availability status card */}
            <div className="border-explorerBorder bg-articleBg rounded-2xl border p-6 ring-1 ring-textColor/10">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="bg-accentColor absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                  <span className="bg-accentColor relative inline-flex h-2.5 w-2.5 rounded-full" />
                </div>
                {/* The words carry the meaning, not the colour of the dot. */}
                <span className="text-accentColor text-[13px] font-bold uppercase tracking-widest">
                  Available for work
                </span>
              </div>
              <p className="text-textSecondary text-sm leading-relaxed">
                Currently open to full-time roles and select freelance projects.
                Remote-friendly, flexible timezones. I reply to email within 24 hours.
              </p>
            </div>

            {/* Direct channels — for anyone who would rather not use a form */}
            <div className="flex flex-col gap-3.5">
              <p className="text-textMuted text-[13px] font-bold uppercase tracking-[0.16em]">
                Or reach me directly
              </p>
              {CHANNELS.map(({ icon, label, value, href }, i) => (
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
                  className="group border-explorerBorder bg-articleBg hover:border-accentColor/30 flex min-h-16 items-center gap-4 rounded-2xl border p-5 ring-1 ring-textColor/10 transition-[border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentColor"
                >
                  <div className="bg-accentColor/10 group-hover:bg-accentColor/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300">
                    <Icon icon={icon} aria-hidden="true" className="text-accentColor h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-textMuted text-[13px] font-semibold uppercase tracking-[0.12em]">
                      {label}
                    </p>
                    <p className="text-textColor mt-1 truncate text-base font-semibold">
                      {value}
                    </p>
                  </div>
                  <Icon
                    icon="lucide:arrow-up-right"
                    aria-hidden="true"
                    className="text-textMuted group-hover:text-accentColor h-4 w-4 shrink-0 transition-colors duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: the working form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-first lg:order-none"
          >
            <ContactForm idPrefix="contact-home" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
