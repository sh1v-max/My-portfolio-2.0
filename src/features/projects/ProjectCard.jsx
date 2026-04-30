/* eslint-disable react/prop-types */
import Tag from "./Tag";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ProjectButton from "../../components/ProjectButton";

function ProjectCard({ img, title, desc, tags, srcCode, demo }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-explorerBorder bg-articleBg transition-all duration-500 hover:border-accentColor/50 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
      {/* image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-articleBg/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <img
          src={img}
          alt={`${title} project screenshot`}
          className="h-52 w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* line */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-accentColor to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
        <div className="h-px w-full bg-gradient-to-r from-transparent via-explorerBorder to-transparent" />

        {/* buttons */}
        <div className="flex items-center gap-3">
          <ProjectButton
            href={demo}
            icon={ExternalLink}
            variant="primary"
            className="flex-1 !px-4 !py-2.5 !text-sm"
          >
            Live Demo
          </ProjectButton>

          <ProjectButton
            href={srcCode}
            icon={FaGithub}
            variant="outline"
            className="flex-1 !px-4 !py-2.5 !text-sm"
          >
            GitHub
          </ProjectButton>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
