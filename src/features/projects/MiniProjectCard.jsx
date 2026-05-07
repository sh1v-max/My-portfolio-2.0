/* eslint-disable react/prop-types */
import Tag from "./Tag";
import { Icon } from "@iconify/react";
import ProjectButton from "../../components/ProjectButton";
import { motion } from "framer-motion";

function MiniProjectCard({
  title,
  description,
  image,
  tags,
  sourceCode,
  demo,
}) {
  return (
    <motion.article 
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        rotateX: 2,
        rotateY: -2,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative flex h-[460px] flex-col overflow-hidden rounded-[24px] border border-white/5 bg-[#161b22]/40 backdrop-blur-xl transition-all duration-500 hover:border-accentColor/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(136,192,208,0.1)]"
    >
      {/* glass shine effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* image section */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#161b22] via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-tr from-accentColor/10 to-transparent" />
        <img
          src={image}
          alt={`${title} preview`}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* floating tag or category if we had one, but we'll use title area */}
      </div>

      {/* content area */}
      <div className="relative z-10 flex flex-1 flex-col gap-3.5 p-6 pt-5">
        {/* title with animated underline */}
        <div className="relative inline-block w-fit">
          <h3 className="text-xl font-bold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-accentColor">
            {title}
          </h3>
          <div className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accentColor transition-all duration-500 group-hover:w-full" />
        </div>

        {/* description - truncated for consistency */}
        <p className="line-clamp-3 text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70">
          {description}
        </p>

        {/* tags - more compact */}
        <div className="mt-auto flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Tag key={tag} tagName={tag} />
          ))}
          {tags.length > 3 && (
            <span className="text-[10px] font-medium text-white/30 self-center">
              +{tags.length - 3} more
            </span>
          )}
        </div>

        {/* buttons - sleek modern style */}
        <div className="mt-4 flex items-center gap-3">
          <ProjectButton
            href={demo}
            icon={() => <Icon icon="lucide:external-link" className="h-3.5 w-3.5" />}
            variant="primary"
            className="h-10 flex-1 rounded-xl text-xs font-bold"
          >
            Live Demo
          </ProjectButton>

          <a
            href={sourceCode}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-accentColor/40 hover:bg-accentColor/10 hover:text-accentColor"
            title="View Source"
          >
            <Icon icon="lucide:github" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default MiniProjectCard;
