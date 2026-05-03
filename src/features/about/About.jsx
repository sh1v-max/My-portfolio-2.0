import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import react_icon from "../../assets/icons/react_icon.svg";
import html_icon from "../../assets/icons/html_icon.svg";
import css_icon from "../../assets/icons/css_icon.svg";
import js_icon from "../../assets/icons/js_icon.svg";
import tailwind_icon from "../../assets/icons/tw-icon.svg";
import profile_pic from "../../assets/images/peakpx.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function About() {
  const techStack = [
    { name: "HTML", icon: html_icon },
    { name: "CSS", icon: css_icon },
    { name: "JavaScript", icon: js_icon },
    { name: "React", icon: react_icon },
    { name: "Tailwind", icon: tailwind_icon },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | About</title>
      </Helmet>

      <section className="min-h-[85vh] px-6 py-16 sm:px-10 md:px-16 lg:px-20">
        <motion.div
          className="mx-auto max-w-6xl text-textColor"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section: Photo & Title */}
        <div className="mb-16 flex flex-col items-center gap-12 lg:flex-row lg:items-start">
          <motion.div className="relative group" variants={itemVariants}>
            <div className="box border-4 border-accentColor overflow-hidden">
               <img 
                src={profile_pic} 
                alt="Shiv Shankar Singh" 
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
            {/* Subtle glow behind blob */}
            <div className="absolute -inset-4 z-[-1] rounded-full bg-accentColor/10 blur-2xl transition-all duration-500 group-hover:bg-accentColor/20" />
          </motion.div>

          <motion.div className="flex-1 text-center lg:text-left" variants={itemVariants}>
            {/* Social Proof Badge */}
            <motion.span 
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-accentColor/30 bg-accentColor/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accentColor shadow-[0_0_15px_rgba(136,192,208,0.1)]"
              variants={itemVariants}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accentColor" />
              33+ Projects Built
            </motion.span>

            <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-6xl lg:text-7xl">
              Front-End <span className="text-accentColor">Developer</span>
            </h1>
            <p className="text-lg leading-relaxed text-textColor/80 md:text-xl lg:max-w-2xl">
              Hi, I&apos;m <span className="font-bold text-white">Shiv Shankar Singh</span>. 
              A passionate Front-end React Developer based in Varanasi, India. 📍
            </p>
          </motion.div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Bio as Code Block */}
          <motion.div variants={itemVariants} className="overflow-hidden rounded-xl border border-explorerBorder bg-articleBg/40 p-1 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-2 border-b border-explorerBorder bg-titlebarBg/50 px-4 py-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-xs font-mono text-textColor/50">aboutMe.json</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed sm:text-base">
              <div className="flex">
                <span className="text-purple-400">const</span>&nbsp;
                <span className="text-blue-400">developer</span>&nbsp;
                <span className="text-white">=</span>&nbsp;
                <span className="text-yellow-200">{"{"}</span>
              </div>
              <div className="pl-4">
                <p><span className="text-blue-300">name:</span> <span className="text-green-300">&apos;Shiv Shankar Singh&apos;</span>,</p>
                <p><span className="text-blue-300">role:</span> <span className="text-green-300">&apos;Frontend Developer&apos;</span>,</p>
                <p><span className="text-blue-300">specialization:</span> <span className="text-green-300">&apos;React Ecosystem&apos;</span>,</p>
                <p><span className="text-blue-300">location:</span> <span className="text-green-300">&apos;Varanasi, India&apos;</span>,</p>
                <p><span className="text-blue-300">currentlyBuilding:</span> <span className="text-green-300">&apos;Premium VSCode Portfolio&apos;</span>,</p>
                <p><span className="text-blue-300">learning:</span> <span className="text-yellow-200">[</span><span className="text-green-300">&apos;Next.js&apos;</span>, <span className="text-green-300">&apos;Three.js&apos;</span><span className="text-yellow-200">]</span>,</p>
                <p><span className="text-blue-300">coffeeLover:</span> <span className="text-orange-300">true</span></p>
              </div>
              <div className="text-yellow-200">{"};"}</div>
            </div>
          </motion.div>

          {/* Narrative Bio */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center gap-6">
            <h2 className="text-2xl font-bold text-accentColor lg:text-3xl">My Journey</h2>
            <p className="text-lg text-textColor/70 leading-relaxed">
              As a Junior Front-End Developer, I possess an impressive arsenal of skills in <span className="text-white font-medium">HTML, CSS, JavaScript, React and Tailwind</span>. 
              I excel in designing and maintaining responsive websites that offer a smooth user experience.
            </p>
            <p className="text-lg text-textColor/70 leading-relaxed">
              I am a team player who thrives in collaborating with cross-functional teams to produce outstanding web applications. 
              My goal is to translate complex problems into beautiful, intuitive, and high-performance digital experiences.
            </p>
            
            {/* Sub-badge or info */}
            <div className="mt-4 flex items-center gap-4 rounded-lg bg-accentColor/5 p-4 border border-accentColor/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accentColor/20 text-accentColor">
                💡
              </div>
              <div>
                <p className="text-sm font-bold text-accentColor">Current Focus</p>
                <p className="text-sm text-textColor/60">Optimizing user experiences with Motion & Logic.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Section */}
        <motion.div className="mt-24 text-center" variants={itemVariants}>
          <h3 className="mb-12 text-2xl font-bold text-white lg:text-4xl">
            My <span className="text-accentColor">Tech Stack</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                className="group flex flex-col items-center gap-3"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-articleBg/80 p-4 border border-explorerBorder shadow-lg transition-all duration-300 group-hover:border-accentColor/50 group-hover:shadow-[0_0_20px_rgba(136,192,208,0.2)] flex items-center justify-center">
                  <img src={tech.icon} alt={tech.name} className="h-full w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0" />
                </div>
                <span className="text-xs font-semibold tracking-wider text-textColor/40 uppercase transition-colors duration-300 group-hover:text-accentColor">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </motion.div>
      </section>
    </HelmetProvider>
  );
}

export default About;
