import { motion } from "framer-motion";
import ThemeCard from "./ThemeCard";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTheme } from "../../context/ThemeContext";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

function Settings() {
  const { theme: currentTheme } = useTheme();
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const themeInfo = [
    {
      name: "Midnight Velvet",
      publisher: "Singh shiv",
      theme: "dracula",
      description: "A dark theme with vibrant purple accents",
      palette: ["#282a36", "#bd93f9", "#efefef"],
      downloads: "28M+",
    },
    {
      name: "Nocturnal Echo",
      publisher: "Singh shiv",
      theme: "nightOwl",
      description: "Fine-tuned for those who like to code late into the night",
      palette: ["#011627", "rgb(95, 126, 151)", "#89a4bb"],
      downloads: "14M+",
    },
    {
      name: "Code Abyss",
      publisher: "Singh shiv",
      theme: "github",
      description: "The official dark theme from GitHub's code editor",
      palette: ["#24292e", "#f9826c", "#efefef"],
      downloads: "32M+",
    },
    {
      name: "Polar Breeze",
      publisher: "Singh shiv",
      theme: "nord",
      description: "Arctic, north-bluish clean and elegant design",
      palette: ["#2e3440", "#88c0d0", "#efefef"],
      downloads: "9M+",
    },
    {
      name: "Golden Mirage",
      publisher: "Singh shiv",
      theme: "ayuMirage",
      description: "Balanced warm and cool tones for a mirage-like atmosphere",
      palette: ["#1f2430", "#e6b450", "#efefef"],
      downloads: "6M+",
    },
    {
      name: "Stellar Onyx",
      publisher: "Singh shiv",
      theme: "ayuDark",
      description: "Deep, dark canvas with golden highlights for focus",
      palette: ["#0a0e14", "#e6b450", "#efefef"],
      downloads: "5M+",
    },
  ];

  const activeTheme = themeInfo.find((t) => t.theme === currentTheme);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Settings</title>
      </Helmet>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-14 flex flex-col items-start gap-3"
          >
            <span className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
              Customize Experience
            </span>
            <h1 className="text-textColor text-4xl font-bold tracking-tight md:text-5xl">
              Appearance
            </h1>
            <p className="text-textColor/60 max-w-xl text-base leading-relaxed">
              Personalize your workspace with a variety of themes inspired by
              popular code editors. Choose a style that matches your workflow.
            </p>
            <div className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-gradient-to-r" />
          </motion.div>

          {/* Currently Active Theme Banner */}
          {activeTheme && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="border-accentColor/20 from-accentColor/5 via-articleBg/60 to-accentColor/5 mb-10 overflow-hidden rounded-2xl border bg-gradient-to-r p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-accentColor/15 text-accentColor flex h-12 w-12 items-center justify-center rounded-xl">
                    <Icon icon="lucide:palette" width="24" height="24" />
                  </div>
                  <div>
                    <p className="text-textColor/40 text-xs font-medium uppercase tracking-widest">
                      Currently Active
                    </p>
                    <p className="text-textColor text-xl font-bold">
                      {activeTheme.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activeTheme.palette.map((color, i) => (
                    <div
                      key={i}
                      className="h-6 w-6 rounded-full border border-white/10 shadow-md transition-transform hover:scale-125"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Theme Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="text-textColor/40 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
              <Icon icon="lucide:layout-grid" className="text-accentColor" width="16" height="16" />
              Available Themes
            </div>
            <div className="bg-explorerBorder h-px flex-1" />
            <span className="text-textColor/30 text-xs font-medium">
              {themeInfo.length} themes
            </span>
          </motion.div>

          {/* Theme Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {themeInfo.map((th, index) => (
              <motion.div
                key={th.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: cols === 1 ? 0.15 : (index < cols ? 0.4 : 0.1) + (index % cols) * 0.1,
                  ease: [0.25, 0.1, 0.25, 1] 
                }}
              >
                <ThemeCard {...th} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}

export default Settings;
