import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

// ─── Skill Data with Iconify icon names ───────────────────
const skills = [
  // Row 1
  {
    name: "React.js",
    category: "FRONTEND",
    icon: "logos:react",
    watermark: "logos:react",
    col: "col-span-3 sm:col-span-2",
    row: "row-span-2",
  },
  {
    name: "JavaScript",
    category: "LANGUAGE",
    icon: "logos:javascript",
    watermark: "logos:javascript",
    col: "col-span-2",
    row: "row-span-1",
  },
  {
    name: "HTML5",
    category: "FRONTEND",
    icon: "logos:html-5",
    watermark: "logos:html-5",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "Node.js",
    category: "BACKEND",
    icon: "logos:nodejs-icon",
    watermark: "logos:nodejs-icon",
    col: "col-span-1",
    row: "row-span-2",
  },

  // Row 2 (fills alongside React.js 2x2 and Node.js 1x2)
  {
    name: "CSS3",
    category: "FRONTEND",
    icon: "logos:css-3",
    watermark: "logos:css-3",
    col: "col-span-2 sm:col-span-1",
    row: "row-span-1",
  },
  {
    name: "Tailwind CSS",
    category: "FRONTEND",
    icon: "logos:tailwindcss-icon",
    watermark: "logos:tailwindcss-icon",
    col: "col-span-2",
    row: "row-span-1",
  },

  // Row 3
  {
    name: "Redux",
    category: "FRONTEND",
    icon: "logos:redux",
    watermark: "logos:redux",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "Express.js",
    category: "BACKEND",
    icon: "simple-icons:express",
    watermark: "simple-icons:express",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "MongoDB",
    category: "BACKEND",
    icon: "logos:mongodb-icon",
    watermark: "logos:mongodb-icon",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "REST APIs",
    category: "BACKEND",
    icon: "mdi:api",
    watermark: "mdi:api",
    col: "col-span-1",
    row: "row-span-2",
  },
  {
    name: "Firebase",
    category: "HOSTING",
    icon: "logos:firebase",
    watermark: "logos:firebase",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "Vercel",
    category: "HOSTING",
    icon: "simple-icons:vercel",
    watermark: "simple-icons:vercel",
    col: "col-span-1",
    row: "row-span-1",
  },

  // Row 4
  {
    name: "Git",
    category: "TOOLS",
    icon: "logos:git-icon",
    watermark: "logos:git-icon",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "GitHub",
    category: "TOOLS",
    icon: "mdi:github",
    watermark: "mdi:github",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "Postman",
    category: "TOOLS",
    icon: "logos:postman-icon",
    watermark: "logos:postman-icon",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "Netlify",
    category: "HOSTING",
    icon: "logos:netlify-icon",
    watermark: "logos:netlify-icon",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "React Router",
    category: "FRONTEND",
    icon: "logos:react-router",
    watermark: "logos:react-router",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "JWT",
    category: "BACKEND",
    icon: "logos:jwt-icon",
    watermark: "logos:jwt-icon",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "MySQL",
    category: "DATABASE",
    icon: "logos:mysql",
    watermark: "logos:mysql",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "Framer Motion",
    category: "FRONTEND",
    icon: "logos:framer",
    watermark: "logos:framer",
    col: "col-span-1",
    row: "row-span-1",
  },
  {
    name: "TypeScript",
    category: "LANGUAGE",
    icon: "logos:typescript-icon",
    watermark: "logos:typescript-icon",
    col: "col-span-1",
    row: "row-span-1",
  },
];

// ─── Animation Variants ───────────────────────────────────
const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function BentoSkills() {
  return (
    <div className="py-2">
      <motion.div
        className="grid w-full grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6"
        variants={gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={cardVariant}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-explorerBorder bg-articleBg/40 p-3 transition-colors duration-300 hover:border-accentColor/30 hover:bg-articleBg/70 md:p-4 ${skill.col} ${skill.row}`}
            style={{ minHeight: skill.row === "row-span-2" ? "140px" : "70px" }}
          >
            {/* Small Icon (Top Left) */}
            <div className="relative z-10">
              <Icon
                icon={skill.icon}
                width={skill.row === "row-span-2" ? 28 : 20}
                height={skill.row === "row-span-2" ? 28 : 20}
                className="transition-transform duration-300 group-hover:scale-125"
              />
            </div>

            {/* Name + Category (Bottom Left) */}
            <div className="relative z-10 mt-auto">
              <h4
                className={`font-bold leading-tight text-textColor ${
                  skill.row === "row-span-2"
                    ? "text-base md:text-lg"
                    : "text-[11px] md:text-xs"
                }`}
              >
                {skill.name}
              </h4>
              <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-textColor/40 md:text-[9px]">
                {skill.category}
              </p>
            </div>

            {/* Watermark Icon (Bottom Right, large and faded) */}
            <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-[0.04] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.08]">
              <Icon
                icon={skill.watermark}
                width={skill.row === "row-span-2" ? 120 : 70}
                height={skill.row === "row-span-2" ? 120 : 70}
                className="grayscale"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
