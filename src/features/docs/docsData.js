// Each entry points at a self-contained static HTML file in public/docs/ —
// its own sidebar, search, and progress tracking, built to stand alone
// rather than be reimplemented as React. Opened in a new tab so its UI
// never has to fight the site's own NavBar/theme chrome.

export const docs = [
  {
    id: "interview-prep",
    title: "Interview Prep",
    description:
      "A self-quizzing reference for JavaScript, React, and Node.js interviews — execution context, closures, hooks, the event loop, and more, each with runnable examples, common mistakes, and a quiz.",
    href: "/docs/interview-prep.html",
    icon: "lucide:graduation-cap",
    format: "Interactive Guide",
    topicCount: 20,
    groups: ["JavaScript", "React", "Node.js", "Databases", "System Design", "TypeScript", "DSA", "Browser & Web"],
  },
];
