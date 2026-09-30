// ─── Single source of truth for personal data ─────────────────────────────
// Edit here → updates everywhere automatically.

export const personal = {
  name: "Shiv Shankar Singh",
  shortName: "SHIV",
  role: "Full-Stack Developer",
  location: "Varanasi, India",
  email: "singhshiv0427@gmail.com",
  github: "https://github.com/sh1v-max/",
  githubUsername: "sh1v-max",
  linkedin: "https://www.linkedin.com/in/shiv-shankar-singh-/",
  linkedinUsername: "shiv-shankar-singh-",
  instagram: "https://www.instagram.com/wiwiwiwi.exe/",
  twitter: "https://twitter.com/",
  leetcode: "https://leetcode.com/u/shiv0427/",
  monkeytype: "https://monkeytype.com/profile/wazir",
};

export const stats = {
  themes: "6",
};

// Grouped rather than one flat list: "React, Node, MongoDB, Git" in a single row
// tells a reader what I have touched, but not where I actually work. The
// grouping is the information.
export const skillGroups = [
  {
    label: "Frontend",
    items: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Node.js + TypeScript", "Express.js", "MongoDB", "PostgreSQL + pgvector", "REST APIs & JWT Auth"],
  },
  {
    label: "AI & Tooling",
    items: ["RAG & vector search", "LLM APIs (Gemini) + SSE streaming", "Structured output with Zod", "Git & GitHub, Vite, Vitest"],
  },
];

export const availability = {
  open: true,
  label: "Available for work",
  detail: "Open to full-time roles and select freelance projects. Remote-friendly.",
};

// Matched against the live repo names from the GitHub API, so these must be the
// current names. Netflix-GPT was renamed to CineGraph, and the old name matched
// nothing, which quietly dropped it from the featured list.
export const pinnedRepos = [
  "AI-Backend",
  "CineGraph",
  "BharatDiet",
  "BiteSwift",
  "BookVerse",
  "Backend-Projects",
  "Practice-UI-design-React-and-JS",
  "JavaScript-DSA",
];

export const githubSkills = [
  "HTML5",
  "CSS3",
  "JavaScript (ES6+)",
  "React.js",
  "TailwindCSS",
  "Redux Toolkit",
  "Git & GitHub",
  "REST APIs",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "RAG & Vector Search",
];

// Next phases of DocMind first. The first three are what the About teaser shows.
export const currentlyLearning = [
  "Background jobs with BullMQ & Redis",
  "AI agents & tool calling",
  "Testing & observability",
  "Full-Stack Next.js Applications",
];
