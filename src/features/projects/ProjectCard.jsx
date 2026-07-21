/* eslint-disable react/prop-types */
import Tag from "./Tag";
import { Icon } from "@iconify/react";
import ProjectButton from "../../components/ProjectButton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProjectCard({ img, title, desc, tags, srcCode, demo, caseStudy }) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-explorerBorder bg-articleBg transition duration-300 hover:border-accentColor/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
    >
      {/* image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-10 bg-linear-to-t from-articleBg/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <motion.img
          src={img}
          alt={`${title} project screenshot`}
          className="h-52 w-full object-cover object-top"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
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
        <p className="flex-1 text-sm leading-relaxed text-textColor/70">
          {desc}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} tagName={tag} />
          ))}
        </div>

        {/* divider */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-explorerBorder to-transparent" />

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
          <div className="flex items-center gap-3">
            <ProjectButton
              href={demo}
              icon={() => <Icon icon="lucide:external-link" />}
              variant="primary"
              className="flex-1 px-4! py-2.5! text-sm!"
            >
              Demo
            </ProjectButton>

            <ProjectButton
              href={srcCode}
              icon={() => <Icon icon="lucide:github" />}
              variant="outline"
              className="flex-1 px-4! py-2.5! text-sm!"
            >
              GitHub
            </ProjectButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
