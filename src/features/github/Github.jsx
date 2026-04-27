import ActivityCalendar from "react-github-calendar";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData, Link } from "react-router-dom";
import StarIcon from "../../components/icons/StarIcon";
import ForkIcon from "../../components/icons/ForkIcon";

/* eslint-disable react/prop-types */
// Helper SVG for GitHub
const GitHubSvg = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-6 border-b border-explorerBorder pb-2">
    <h3 className="text-2xl font-bold text-textColor">{title}</h3>
    {subtitle && <p className="mt-1 text-sm text-bgText">{subtitle}</p>}
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-transparent bg-articleBg p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accentColor hover:shadow-md">
    <span className="text-4xl font-extrabold text-accentColor">{value}</span>
    <span className="mt-2 text-center text-sm font-medium uppercase tracking-wider text-textColor opacity-80">
      {label}
    </span>
  </div>
);

const Badge = ({ children }) => (
  <span className="rounded-full border border-accentColor/20 bg-accentColor/10 px-3 py-1 text-sm font-medium text-accentColor">
    {children}
  </span>
);

const RepoCardItem = ({ repo }) => (
  <div className="flex flex-col justify-between rounded-xl border border-explorerBorder bg-articleBg p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accentColor hover:shadow-md">
    <div>
      <div className="flex items-start justify-between">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="mr-2 truncate text-xl font-bold text-accentColor hover:underline"
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
      <p className="mt-3 line-clamp-3 text-sm text-textColor opacity-80">
        {repo.description || "No description provided."}
      </p>
    </div>

    <div className="mt-5 flex items-center justify-between text-sm text-textColor opacity-80">
      <div className="flex items-center gap-4">
        {repo.language && (
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-accentColor"></span>
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 transition-colors hover:text-accentColor">
          <StarIcon className="h-4 w-4" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1 transition-colors hover:text-accentColor">
          <ForkIcon className="h-4 w-4" />
          {repo.forks_count}
        </span>
      </div>
      <span className="hidden text-xs opacity-60 sm:block">
        {new Date(repo.updated_at).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    </div>
  </div>
);

export default function Github() {
  const [user, repos] = useLoaderData();

  if (!user || !repos) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Shiv | Github Dashboard</title>
        </Helmet>
        <div className="flex h-[80vh] w-full flex-col items-center justify-center p-8 text-textColor">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 opacity-50"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h2 className="mb-2 text-2xl font-bold">Data Unavailable</h2>
          <p className="text-lg opacity-80">
            Failed to load GitHub data. Please try again later.
          </p>
        </div>
      </HelmetProvider>
    );
  }

  // Derived Stats
  const totalStars = repos.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0,
  );
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

  // Featured Repos: Top 6 by stars
  const featuredRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  const theme = {
    dark: ["#161B22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  const skills = [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "React.js",
    "TailwindCSS",
    "Redux Toolkit",
    "Git & GitHub",
    "REST APIs",
    "Node.js",
  ];

  const learningItems = [
    "Backend APIs with Node.js & Express",
    "MongoDB & Database Design",
    "Advanced React Patterns",
    "Full-Stack Next.js Applications",
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Github Dashboard</title>
      </Helmet>

      <div className="mx-auto max-w-7xl space-y-12 bg-mainBg p-4 pb-20 md:p-8">
        {/* SECTION 1: HERO PROFILE HEADER */}
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
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
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

        {/* SECTION 2: QUICK STATS GRID */}
        <div>
          <SectionTitle title="Developer Metrics" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <StatCard label="Public Repos" value={user.public_repos} />
            <StatCard label="Total Stars" value={totalStars} />
            <StatCard label="Total Forks" value={totalForks} />
            <StatCard label="Contributions" value="1K+" />
          </div>
        </div>

        {/* SECTION 5 & 6: SKILLS AND LEARNING (Grid Layout) */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* SKILLS PANEL */}
          <div className="rounded-2xl border border-explorerBorder bg-articleBg p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-textColor">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accentColor"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>

          {/* CURRENTLY LEARNING PANEL */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-explorerBorder bg-[#1e1e1e] font-mono shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#404040] bg-[#2d2d2d] px-4 py-2 text-sm text-textColor opacity-80">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-yellow-400"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              currently_learning.js
            </div>
            <div className="flex-1 overflow-x-auto p-6 text-sm leading-relaxed text-[#d4d4d4]">
              <span className="text-[#569cd6]">const</span>{" "}
              <span className="text-[#4fc1ff]">learningGoals</span>{" "}
              <span className="text-[#d4d4d4]">=</span>{" "}
              <span className="text-[#d4d4d4]">[</span>
              <div className="my-1 ml-2 flex flex-col gap-1 border-l-2 border-[#404040] pl-4">
                {learningItems.map((item, i) => (
                  <div key={i} className="whitespace-nowrap">
                    {/* <span className="text-[#ce9178]">"{item}"</span> */}
                    <span>&quot;{item}&quot;</span>
                    {i < learningItems.length - 1 && (
                      <span className="text-[#d4d4d4]">,</span>
                    )}
                  </div>
                ))}
              </div>
              <span className="text-[#d4d4d4]">];</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: FEATURED REPOSITORIES */}
        <div>
          <SectionTitle
            title="Featured Projects"
            subtitle="Top starred repositories from my portfolio"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredRepos.length > 0 ? (
              featuredRepos.map((repo) => (
                <RepoCardItem key={repo.id} repo={repo} />
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-textColor opacity-60">
                No repositories found.
              </div>
            )}
          </div>
        </div>

        {/* SECTION 4: CONTRIBUTION DASHBOARD */}
        <div>
          <SectionTitle
            title="Contribution Graph"
            subtitle={`${new Date().getFullYear()} GitHub Activity`}
          />
          <div className="flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-explorerBorder bg-articleBg p-4 shadow-sm md:p-8">
            <div className="flex w-full justify-center overflow-x-auto pb-4">
              <div className="min-w-max text-textColor">
                <ActivityCalendar
                  username="sh1v-max"
                  fontSize={14}
                  blockSize={12}
                  blockMargin={4}
                  theme={theme}
                  hideColorLegend={false}
                  hideMonthLabels={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: QUICK LINKS / CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 border-t border-explorerBorder pt-10">
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-explorerBorder bg-articleBg px-6 py-3 font-semibold text-textColor shadow-sm transition-all hover:-translate-y-1 hover:border-accentColor"
          >
            <GitHubSvg className="h-5 w-5" />
            Visit GitHub Profile
          </a>
          <Link
            to="/contact"
            className="flex items-center gap-2 rounded-lg bg-accentColor px-6 py-3 font-semibold text-mainBg shadow-sm transition-all hover:-translate-y-1 hover:bg-opacity-90 hover:shadow-md"
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
      </div>
    </HelmetProvider>
  );
}

// export default Github;
