/* eslint-disable react/prop-types */
import ExperimentCard from "./ExperimentCard";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";

export default function ExperimentsGrid({ projects }) {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 640) setCols(1); // mobile
      else if (window.innerWidth < 1024) setCols(2); // sm tablet
      else setCols(3); // lg desktop
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={`${project.title}-${index}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 1,
            delay: cols === 1 ? 0.3 : (index < cols ? 0.6 : 0.3) + (index % cols) * 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <ExperimentCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}
