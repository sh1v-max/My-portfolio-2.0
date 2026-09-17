import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import PageNavigator from "../../components/PageNavigator";
import { docs } from "./docsData";

const headerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const headerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Docs() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Docs</title>
      </Helmet>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">

          {/* ── Header ── */}
          <motion.div
            variants={headerContainer}
            initial="hidden"
            animate="show"
            className="mb-12 flex flex-col items-start gap-4"
          >
            <motion.span
              variants={headerItem}
              className="inline-flex items-center gap-2 rounded-full border border-accentColor/30 bg-accentColor/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accentColor shadow-[0_0_15px_color-mix(in_srgb,var(--accentColor)_20%,transparent)]"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accentColor" />
              {docs.length} {docs.length === 1 ? "Guide" : "Guides"}
            </motion.span>

            <motion.h1
              variants={headerItem}
              className="text-4xl font-extrabold tracking-tight text-textColor sm:text-5xl"
            >
              Docs &amp; Notes
            </motion.h1>

            <motion.p
              variants={headerItem}
              className="text-base leading-relaxed text-textSecondary md:w-1/2"
            >
              Reference material written for myself first — study notes and interactive
              guides I keep coming back to, published here in case they&apos;re useful
              to anyone else.
            </motion.p>

            <motion.div
              variants={headerItem}
              className="mt-2 h-1 w-20 rounded-full bg-linear-to-r from-accentColor to-transparent opacity-80"
            />
          </motion.div>

          {/* ── Docs grid ── */}
          <div className="grid gap-5 sm:grid-cols-2">
            {docs.map((doc) => (
              <motion.a
                key={doc.id}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group border-explorerBorder bg-articleBg hover:border-accentColor/40 relative flex flex-col overflow-hidden rounded-2xl border p-6 shadow-lg transition-colors duration-300"
              >
                {/* Icon */}
                <div className="text-accentColor mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accentColor/10">
                  <Icon icon={doc.icon} width="22" height="22" />
                </div>

                {/* Title + external icon */}
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold text-textColor">{doc.title}</h2>
                  <Icon
                    icon="lucide:arrow-up-right"
                    width="18"
                    className="text-textMuted group-hover:text-accentColor mt-0.5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>

                <p className="text-textSecondary mb-6 flex-1 text-sm leading-relaxed">
                  {doc.description}
                </p>

                {/* Group tags */}
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {doc.groups.map((g) => (
                    <span
                      key={g}
                      className="border-explorerBorder text-textMuted rounded-full border px-2.5 py-1 text-[11px] font-medium"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Footer meta */}
                <div className="border-explorerBorder/60 flex items-center justify-between border-t pt-4 text-xs font-medium">
                  <span className="text-textMuted flex items-center gap-1.5">
                    <Icon icon="lucide:layout-list" width="14" />
                    {doc.topicCount} topics
                  </span>
                  <span className="text-accentColor flex items-center gap-1.5">
                    <Icon icon="lucide:sparkles" width="14" />
                    {doc.format}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <PageNavigator />
      </div>
    </HelmetProvider>
  );
}
