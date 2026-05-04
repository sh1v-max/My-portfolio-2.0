import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

import HeroProfile from "./components/HeroProfile";
import StatsGrid from "./components/StatsGrid";
import SkillsAndLearning from "./components/SkillsAndLearning";
import FeaturedRepos from "./components/FeaturedRepos";
import ContributionGraph from "./components/ContributionGraph";
import QuickLinks from "./components/QuickLinks";

const headerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Github() {
  const { user, repos } = useLoaderData();

  if (!user || !repos) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Shiv | Github Dashboard</title>
        </Helmet>
        <div className="text-textColor flex h-[80vh] w-full flex-col items-center justify-center p-8">
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

      <section className="min-h-[85vh] px-6 py-16 sm:px-10 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl space-y-12 overflow-hidden">
          {/* Page Header */}
          <motion.div
            variants={headerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 flex flex-col items-start gap-3"
          >
            <motion.span 
              variants={headerItem}
              className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            >
              <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
              {user.public_repos}+ Repositories
            </motion.span>
            <motion.h1 
              variants={headerItem}
              className="text-textColor text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              GitHub Dashboard
            </motion.h1>
            <motion.p 
              variants={headerItem}
              className="text-textColor/60 max-w-xl text-base leading-relaxed"
            >
              An overview of my open-source contributions, coding activity, and
              featured projects directly from the GitHub API.
            </motion.p>
            <motion.div 
              variants={headerItem}
              className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-gradient-to-r" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <HeroProfile user={user} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <StatsGrid
              user={user}
              totalStars={totalStars}
              totalForks={totalForks}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <SkillsAndLearning skills={skills} learningItems={learningItems} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <FeaturedRepos featuredRepos={featuredRepos} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ContributionGraph theme={theme} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <QuickLinks user={user} />
          </motion.div>
        </div>
      </section>
    </HelmetProvider>
  );
}
