/* eslint-disable react/prop-types */
import ContactSocials from "./ContactSocials";
import ContactForm from "./ContactForm";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import PageNavigator from "../../components/PageNavigator";

const headerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function Contact({ asSection = false }) {
  return (
    <HelmetProvider>
      {!asSection && <Helmet><title>Shiv | Contact</title></Helmet>}

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 md:px-8">
          {/* Page Header */}
          <motion.div
            variants={headerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col items-start gap-3"
          >
            <motion.span
              variants={headerItem}
              className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold uppercase tracking-widest"
            >
              <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
              Get in Touch
            </motion.span>
            <motion.h1
              variants={headerItem}
              className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
            >
              Contact Me
            </motion.h1>
            {/* Ragged right, not justified: justification opens rivers of white
                space in a short measure and hurts exactly the readability it is
                reaching for. */}
            <motion.p
              variants={headerItem}
              className="text-textSecondary max-w-2xl text-base leading-relaxed"
            >
              If you&rsquo;ve made it this far, we&rsquo;d probably enjoy building something
              together. I&rsquo;m open to full-stack and frontend roles, freelance work, and
              creative web projects.
            </motion.p>

            {/* Availability Indicator */}
            <motion.div
              variants={headerItem}
              className="flex items-center gap-3 pt-1"
            >
              <div className="relative flex h-2 w-2">
                <span className="bg-accentColor absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-accentColor relative inline-flex h-2 w-2 rounded-full"></span>
              </div>
              <span className="text-textMuted text-xs font-semibold uppercase tracking-widest">
                Available for work
              </span>
            </motion.div>

            {/* line break  */}
            <motion.div
              variants={headerItem}
              className="from-accentColor to-accentColor/30 mt-3 h-1 w-16 rounded-full bg-linear-to-r"
            />
          </motion.div>

          {/* items-start, not items-center: the two columns are different
              heights, and centring them left the socials floating against the
              form's midpoint. */}
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Column: Socials — below the form on small screens, so the
                primary action is not buried behind a tall block of links. */}
            <motion.div
              className="order-last lg:order-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <ContactSocials />
            </motion.div>

            {/* Right Column: the shared form — same component the home page
                mounts, so the two can never drift apart. */}
            <motion.div
              className="order-first lg:order-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <ContactForm idPrefix="contact-page" />
            </motion.div>
          </div>
        </div>
      </section>

      {!asSection && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <PageNavigator />
        </div>
      )}
    </HelmetProvider>
  );
}

export default Contact;
