/* eslint-disable react/prop-types */
import GitHubSvg from "./GitHubSvg";

export default function HeroProfile({ user }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-explorerBorder bg-articleBg p-8 shadow-lg">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accentColor opacity-5 blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-start">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="h-32 w-32 rounded-full border-4 border-accentColor/20 shadow-md transition-transform hover:scale-105"
        />

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div>
              <h1 className="text-3xl font-extrabold text-textColor md:text-4xl">
                {user.name || user.login}
              </h1>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-medium text-accentColor hover:underline"
              >
                @{user.login}
              </a>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accentColor px-6 py-2.5 font-semibold text-mainBg transition-all hover:bg-opacity-90 hover:shadow-lg md:mt-0"
            >
              <GitHubSvg className="h-5 w-5" />
              Follow
            </a>
          </div>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-textColor opacity-90">
            {user.bio ||
              "Front-end developer passionate about building beautiful, interactive web experiences."}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-textColor opacity-80 md:justify-start">
            {user.location && (
              <span className="flex items-center gap-1.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {user.location}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Joined {new Date(user.created_at).getFullYear()}
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <strong className="text-textColor">{user.followers}</strong>{" "}
              Followers
            </span>
            <span className="flex items-center gap-1.5">
              <strong className="text-textColor">{user.following}</strong>{" "}
              Following
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
