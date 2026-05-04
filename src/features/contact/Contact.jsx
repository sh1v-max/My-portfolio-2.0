import { useForm } from "react-hook-form";
import ContactSocials from "./ContactSocials";
import { Helmet, HelmetProvider } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
      <section className="min-h-[85vh] px-6 py-16 sm:px-10 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-14 flex flex-col items-start gap-3"
          >
            <span className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
              Open for opportunities
            </span>
            <h1 className="text-textColor text-4xl font-extrabold tracking-tight sm:text-5xl">
              Get in Touch
            </h1>
            <p className="text-textColor/60 max-w-xl text-base leading-relaxed">
              Have a question or want to work together? Feel free to reach out
              via the form below or through my social links.
            </p>
            <div className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-gradient-to-r" />
          </motion.div>

          <div className="xl:divide-accentColor flex w-full flex-col gap-x-8 gap-y-8 xl:flex-row xl:divide-x-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="xl:w-1/2 "
            >
              <ContactSocials />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col xl:w-1/2  xl:pl-10"
            >
              <form
                ref={formData}
                className="text-textColor space-y-4 pt-5"
                onSubmit={handleSubmit(sendEmail)}
              >
                <div className="flex flex-col  ">
                  <label
                    className="text-base font-semibold  md:text-lg"
                    htmlFor="name"
                  >
                    NAME
                  </label>
                  <input
                    className="input "
                    name="name"
                    type="text"
                    id="name"
                    {...register("name", {
                      required: { value: true, message: "Name is required" },
                    })}
                  />
                  <p className="error text-sm text-red-600">
                    {errors.name?.message}{" "}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-base font-semibold md:text-lg"
                    htmlFor="email"
                  >
                    EMAIL
                  </label>
                  <input
                    className="input"
                    type="email"
                    id="email"
                    name="email"
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email format",
                      },
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                    })}
                  />
                  <p className="error text-sm text-red-600">
                    {errors.email?.message}{" "}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-base font-semibold md:text-lg"
                    htmlFor="subject"
                  >
                    SUBJECT
                  </label>
                  <input
                    className="input"
                    type="text"
                    name="subject"
                    id="subject"
                    {...register("subject", {
                      required: {
                        value: true,
                        message: "Subject is required",
                      },
                    })}
                  />
                  <p className="error text-sm text-red-600">
                    {errors.subject?.message}{" "}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-base font-semibold md:text-lg"
                    htmlFor="message"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    className="bg-articleBg  focus:border-accentColor focus:ring-accentColor  w-full p-2 text-xl focus:outline-none focus:ring-1"
                    id="message"
                    name="message"
                    cols="30"
                    rows="6"
                    {...register("message", {
                      required: {
                        value: true,
                        message: "Message is required",
                      },
                      validate: {
                        isLessThanfiveChar: (fieldValue) => {
                          return (
                            fieldValue.length > 4 ||
                            "Should be of minimum 5 characters"
                          );
                        },
                      },
                    })}
                  ></textarea>
                  <p className="error text-sm text-red-600">
                    {errors.message?.message}{" "}
                  </p>
                </div>
                <button
                  type="submit"
                  className=" bg-accentColor px-6 py-1 text-lg font-medium text-black"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}

export default Contact;
