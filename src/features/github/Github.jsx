import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

import HeroProfile from "./components/HeroProfile";
import StatsGrid from "./components/StatsGrid";
import SkillsAndLearning from "./components/SkillsAndLearning";
import FeaturedRepos from "./components/FeaturedRepos";
import ContributionGraph from "./components/ContributionGraph";
import QuickLinks from "./components/QuickLinks";

export default function Github() {
  const {user, repos} = useLoaderData();
  
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

  // derived Stats
  const totalStars = repos.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0,
  );
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

  // pinned repositories
  const pinnedRepoNames = [
    "Netflix-GPT",
    "BiteSwift",
    "BookVerse",
    "Backend-Projects",
    "Practice-UI-design-React-and-JS",
    "JavaScript-DSA",
  ];

  const featuredRepos = repos
    .filter((repo) => pinnedRepoNames.includes(repo.name))
    .sort((a, b) => b.stargazers_count - a.stargazers_count);

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

      <div className="mx-auto w-full max-w-7xl space-y-12 overflow-hidden bg-mainBg p-4 pb-20 md:p-8">
        <HeroProfile user={user} />
        <StatsGrid user={user} totalStars={totalStars} totalForks={totalForks} />
        <SkillsAndLearning skills={skills} learningItems={learningItems} />
        <FeaturedRepos featuredRepos={featuredRepos} />
        <ContributionGraph theme={theme} />
        <QuickLinks user={user} />
      </div>
    </HelmetProvider>
  );
}
