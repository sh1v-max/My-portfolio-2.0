/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function QuickLinks({ user }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 border-t border-explorerBorder pt-10">
      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-lg border border-explorerBorder bg-articleBg px-6 py-3 font-semibold text-textColor shadow-sm transition-all hover:border-accentColor"
      >
        <Icon icon="lucide:github" className="h-5 w-5" />
        Visit GitHub Profile
      </a>
      <Link
        to="/contact"
        className="flex items-center gap-2 rounded-lg bg-accentColor px-6 py-3 font-semibold text-mainBg shadow-sm transition-all hover:bg-opacity-90 hover:shadow-md"
      >
        <Icon icon="lucide:mail" width="20" height="20" />
        Contact Me
      </Link>
    </div>
  );
}
