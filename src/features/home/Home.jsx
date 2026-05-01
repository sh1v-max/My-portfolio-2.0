import { Link } from "react-router-dom";
import Illustration from "./Illustration";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";

function Home() {
  // Variants for staggered text entry
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Home</title>
      </Helmet>

      <section className="relative flex min-h-[75svh] items-center justify-center overflow-hidden bg-mainBg px-6 py-12 sm:px-10 md:px-16 lg:px-28">
        {/* Background Decorative Text */}
        <motion.div 
          className="absolute left-10 z-0 flex select-none flex-col gap-y-2 text-[12rem] font-extrabold leading-none text-bgText max-lg:hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span>I BUILD</span>
          <span>PRETTY</span>
          <span>WEBSITES</span>
        </motion.div>

        <motion.div 
          className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Left: Text Content */}
          <motion.div 
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >


            <motion.h1 
              className="mb-2 text-4xl font-bold text-textColor sm:text-5xl md:text-6xl xl:text-8xl"
              variants={itemVariants}
            >
              Hi, I&apos;m Shiv
            </motion.h1>

            <motion.h2 
              className="mb-6 text-xl font-semibold text-accentColor md:text-2xl xl:text-4xl"
              variants={itemVariants}
            >
              Frontend Developer
            </motion.h2>

            <motion.p 
              className="mb-10 max-w-lg text-lg leading-relaxed text-textColor/70 md:text-xl"
              variants={itemVariants}
            >
              I build fast, scalable, and user-focused web applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Link to="/projects">
                <motion.button 
                  className="rounded-lg bg-accentColor px-8 py-3 text-lg font-bold text-white transition-all duration-300 hover:bg-accentColor/90 hover:shadow-[0_0_20px_rgba(136,192,208,0.3)] active:scale-[0.98]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Work
                </motion.button>
              </Link>
              <motion.a
                href="/assets/docs/resume.pdf"
                download
                className="rounded-lg border-2 border-accentColor/50 px-8 py-3 text-lg font-bold text-textColor transition-all duration-300 hover:border-accentColor hover:bg-accentColor/10 active:scale-[0.98]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Illustration */}
          <motion.div 
            className="w-full max-w-md lg:max-w-xl"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Illustration />
          </motion.div>
        </motion.div>
      </section>
    </HelmetProvider>
  );
}

export default Home;
