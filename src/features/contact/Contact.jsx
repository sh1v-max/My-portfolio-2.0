import { useForm } from "react-hook-form";
import ContactSocials from "./ContactSocials";
import { Helmet, HelmetProvider } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import toast from "react-hot-toast";
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

function Contact() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const formData = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const sendEmail = () => {
    const sendPromise = emailjs.sendForm(
      `${import.meta.env.VITE_SERVICE_ID}`,
      `${import.meta.env.VITE_TEMPLATE_ID}`,
      formData.current,
      `${import.meta.env.VITE_EMAILJS_KEY}`,
    );

    toast.promise(sendPromise, {
      loading: "Sending message...",
      success: "Message sent! Thank you for contacting. 😁",
      error: "Failed to send message. ❌",
    });

    sendPromise.then(
      () => {
        reset();
      },
      (error) => {
        console.log(error.text);
      },
    );
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Contact</title>
      </Helmet>

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
              className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
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
            <motion.p
              variants={headerItem}
              className="text-textColor/60 w-full text-justify text-base leading-relaxed"
            >
              If you’ve made it this far, we’d probably enjoy building something together. I’m open to frontend roles, freelance work, and creative web projects.

            </motion.p>

            {/* Availability Indicator - Moved to Header */}
            <motion.div
              variants={headerItem}
              className="flex items-center gap-3 pt-1"
            >
              <div className="relative flex h-2 w-2">
                <span className="bg-accentColor absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-accentColor relative inline-flex h-2 w-2 rounded-full"></span>
              </div>
              <span className="text-textColor/40 text-xs font-semibold uppercase tracking-widest">
                Currently accepting new projects
              </span>
            </motion.div>

            {/* line break  */}
            <motion.div
              variants={headerItem}
              className="from-accentColor to-accentColor/30 mt-3 h-1 w-16 rounded-full bg-gradient-to-r"
            />
          </motion.div>

          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left Column: Socials */}
            <motion.div
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

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <form
                ref={formData}
                className="space-y-5"
                onSubmit={handleSubmit(sendEmail)}
              >
                <div>
                  <input
                    className="w-full rounded-2xl bg-white/[0.03] px-5 py-4 text-sm text-textColor transition-all duration-300 placeholder:text-textColor/40 hover:bg-white/[0.06] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-accentColor/50"
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Your name"
                    {...register("name", {
                      required: { value: true, message: "Name is required" },
                    })}
                  />
                  {errors.name && <p className="mt-1.5 ml-2 text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div>
                  <input
                    className="w-full rounded-2xl bg-white/[0.03] px-5 py-4 text-sm text-textColor transition-all duration-300 placeholder:text-textColor/40 hover:bg-white/[0.06] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-accentColor/50"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    {...register("email", {
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email format",
                      },
                      required: { value: true, message: "Email is required" },
                    })}
                  />
                  {errors.email && <p className="mt-1.5 ml-2 text-xs text-red-400">{errors.email.message}</p>}
                </div>

                <div>
                  <input
                    className="w-full rounded-2xl bg-white/[0.03] px-5 py-4 text-sm text-textColor transition-all duration-300 placeholder:text-textColor/40 hover:bg-white/[0.06] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-accentColor/50"
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    {...register("subject", {
                      required: { value: true, message: "Subject is required" },
                    })}
                  />
                  {errors.subject && <p className="mt-1.5 ml-2 text-xs text-red-400">{errors.subject.message}</p>}
                </div>

                <div>
                  <textarea
                    className="w-full resize-none rounded-2xl bg-white/[0.03] px-5 py-4 text-sm text-textColor transition-all duration-300 placeholder:text-textColor/40 hover:bg-white/[0.06] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-accentColor/50"
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell me about your project..."
                    {...register("message", {
                      required: { value: true, message: "Message is required" },
                      minLength: { value: 5, message: "Minimum 5 characters" }
                    })}
                  ></textarea>
                  {errors.message && <p className="mt-1.5 ml-2 text-xs text-red-400">{errors.message.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-accentColor px-8 py-4 text-sm font-bold text-mainBg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(136,192,208,0.3)] active:scale-[0.98]"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Page Navigation */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <PageNavigator />
      </div>
    </HelmetProvider>
  );
}

export default Contact;
