/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";

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
              <Icon icon="lucide:github" className="h-5 w-5" />
              Follow
            </a>
          </div>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-textColor opacity-90">
            {user.bio ||
              "Full-Stack Developer passionate about building beautiful, interactive web experiences."}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-textColor opacity-80 md:justify-start">
            {user.location && (
              <span className="flex items-center gap-1.5">
                <Icon icon="lucide:map-pin" width="16" height="16" />
                {user.location}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Icon icon="lucide:calendar" width="16" height="16" />
              Joined {new Date(user.created_at).getFullYear()}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon icon="lucide:users" width="16" height="16" />
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
