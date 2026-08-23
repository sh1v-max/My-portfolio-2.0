/* eslint-disable react/prop-types */
import Tag from "./Tag";
import { Icon } from "@iconify/react";
import ProjectButton from "../../components/ProjectButton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProjectCard({ img, title, desc, tags, srcCode, demo, caseStudy }) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.018 }}
      transition={{ type: "spring", stiffness: 140, damping: 22, mass: 1 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-explorerBorder bg-articleBg transition-[border-color,box-shadow] duration-500 ease-out hover:border-accentColor/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
    >
      {/* image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-10 bg-linear-to-t from-articleBg/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <img
          src={img}
          alt={`${title} project screenshot`}
          width={600}
          height={400}
          className="h-52 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* line */}
        <div className="absolute left-0 top-0 h-0.5 w-full bg-linear-to-r from-transparent via-accentColor to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col gap-4 p-5 pt-4">
        {/* title */}
        <h3 className="text-xl font-bold tracking-tight text-textColor transition-colors duration-300 group-hover:text-accentColor">
          {title}
        </h3>

        {/* description */}
        <p className="flex-1 text-sm leading-relaxed text-textSecondary">
          {desc}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} tagName={tag} />
          ))}
        </div>

        {/* divider — only when there are buttons below */}
        {(caseStudy || demo || srcCode) && (
          <div className="h-px w-full bg-linear-to-r from-transparent via-explorerBorder to-transparent" />
        )}

        {/* buttons */}
        <div className="flex flex-col gap-2">
          {caseStudy && (
            <Link to={caseStudy} className="block w-full">
              <motion.div
                className="border-accentColor/40 text-accentColor hover:bg-accentColor hover:text-mainBg flex w-full items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon icon="lucide:file-text" width="15" />
                Case Study
              </motion.div>
            </Link>
          )}
          {(demo || srcCode) && (
            <div className="flex items-center gap-3">
              {demo && (
                <ProjectButton
                  href={demo}
                  icon={() => <Icon icon="lucide:external-link" />}
                  variant="primary"
                  className="flex-1 px-4! py-2.5! text-sm!"
                >
                  Demo
                </ProjectButton>
              )}

              {srcCode && (
                <ProjectButton
                  href={srcCode}
                  icon={() => <Icon icon="lucide:github" />}
                  variant="outline"
                  className="flex-1 px-4! py-2.5! text-sm!"
                >
                  GitHub
                </ProjectButton>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
