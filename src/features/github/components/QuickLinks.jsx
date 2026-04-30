/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import GitHubSvg from "./GitHubSvg";

export default function QuickLinks({ user }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 border-t border-explorerBorder pt-10">
      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-lg border border-explorerBorder bg-articleBg px-6 py-3 font-semibold text-textColor shadow-sm transition-all hover:border-accentColor"
      >
        <GitHubSvg className="h-5 w-5" />
        Visit GitHub Profile
      </a>
      <Link
        to="/contact"
        className="flex items-center gap-2 rounded-lg bg-accentColor px-6 py-3 font-semibold text-mainBg shadow-sm transition-all hover:bg-opacity-90 hover:shadow-md"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        Contact Me
      </Link>
    </div>
  );
}
