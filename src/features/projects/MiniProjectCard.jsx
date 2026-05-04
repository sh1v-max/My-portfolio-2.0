/* eslint-disable react/prop-types */
import Tag from "./Tag";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ProjectButton from "../../components/ProjectButton";
import { motion } from "framer-motion";

function MiniProjectCard({
  title,
  description,
  image,
  tags,
  sourceCode,
  demo,
  index = 0,
}) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 1, 
        delay: (index % 4) * 0.15, // Staggers up to 4 visible cards
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-explorerBorder bg-articleBg/80 backdrop-blur-sm transition-colors transition-shadow duration-500 hover:border-accentColor/50 hover:shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
    >
      {/* top glow line */}
      <div className="absolute left-0 top-0 z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-accentColor to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-articleBg/90 via-articleBg/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <img
          src={image}
          alt={`${title} preview`}
          className="h-44 w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col gap-3 p-5 pt-4">
        {/* title */}
        <h3 className="text-lg font-bold tracking-tight text-textColor transition-colors duration-300 group-hover:text-accentColor">
          {title}
        </h3>

        {/* description */}
        <p className="flex-1 text-sm leading-relaxed !text-textColor/70">
          {description}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Tag key={tag} tagName={tag} />
          ))}
        </div>

        {/* divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-explorerBorder to-transparent" />

        {/* buttons */}
        <div className="flex items-center gap-2.5">
          <ProjectButton
            href={demo}
            icon={ExternalLink}
            variant="primary"
            className="flex-1"
          >
            Live Demo
          </ProjectButton>

          <ProjectButton
            href={sourceCode}
            icon={FaGithub}
            variant="outline"
            className="flex-1"
          >
            GitHub
          </ProjectButton>
        </div>
      </div>
    </motion.article>
  );
}

export default MiniProjectCard;
