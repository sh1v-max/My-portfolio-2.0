/* eslint-disable react/prop-types */
import StarIcon from "../../../components/icons/StarIcon";
import ForkIcon from "../../../components/icons/ForkIcon";
import GitHubSvg from "./GitHubSvg";

const RepoCardItem = ({ repo }) => (
  <div className="flex flex-col justify-between rounded-xl border border-explorerBorder bg-articleBg p-6 shadow-sm transition-all hover:border-accentColor hover:shadow-md">
    <div className="min-w-0">
      <div className="flex items-start justify-between gap-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="min-w-0 flex-1 truncate text-xl font-bold text-accentColor hover:underline"
          title={repo.name}
        >
          {repo.name}
        </a>
        <div className="flex shrink-0 gap-2 text-textColor opacity-70">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accentColor"
              title="Live Demo"
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
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accentColor"
            title="Source Code"
          >
            <GitHubSvg className="h-5 w-5" />
          </a>
        </div>
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-textColor opacity-80 break-words">
        {repo.description || "No description provided."}
      </p>
    </div>

    <div className="mt-5 flex flex-wrap items-center justify-between gap-y-3 text-sm text-textColor opacity-80">
      <div className="flex flex-wrap items-center gap-3">
        {repo.language && (
          <span className="flex items-center gap-1.5 font-medium shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-accentColor shrink-0"></span>
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 transition-colors hover:text-accentColor shrink-0">
          <StarIcon className="h-4 w-4" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1 transition-colors hover:text-accentColor shrink-0">
          <ForkIcon className="h-4 w-4" />
          {repo.forks_count}
        </span>
      </div>
      <span className="text-xs opacity-60 shrink-0">
        {new Date(repo.updated_at).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    </div>
  </div>
);

export default RepoCardItem;
