import netflix from "../../assets/images/netflix.png";
import biteswift from "../../assets/images/biteswift.png";
import bookverse from "../../assets/images/bookverse.png";
import portfolio from "../../assets/images/portfolio.png";

export const projects = [
  {
    title: "Netflix-GPT",
    description:
      "AI-powered streaming platform with Firebase auth, dynamic movie carousels, and GPT-driven semantic search.",
    image: netflix,
    tags: ["react", "redux-toolkit", "firebase", "openai", "tailwind", "react-router", "tmdb-api", "vite"],
    sourceCode: "https://github.com/sh1v-max/Netflix-GPT",
    demo: "https://netflixgpt-e671d.firebaseapp.com/",
  },
  {
    title: "BiteSwift",
    description:
      "High-fidelity food delivery app with real-time cart management, shimmer UI, and lazy-loaded routes.",
    image: biteswift,
    tags: ["react", "redux-toolkit", "tailwind", "vite", "react-router", "swiggy-api", "custom-hooks"],
    sourceCode: "https://github.com/sh1v-max/BiteSwift",
    demo: "https://yourbiteswift.netlify.app/",
  },
  {
    title: "BookVerse",
    description:
      "Modern book discovery platform with search, trending sections, and detailed book pages via Open Library API.",
    image: bookverse,
    tags: ["react", "tailwind", "react-router", "open-library-api", "vite", "custom-hooks"],
    sourceCode: "https://github.com/sh1v-max/BookVerse",
    demo: "https://bookversedot.netlify.app/",
  },
  {
    title: "Portfolio",
    description:
      "A developer portfolio with multiple themes, a beautiful UI, and smooth animations.",
    image: portfolio,
    tags: ["react", "tailwind", "vite", "react-router", "context-api", "tw-colors", "react-helmet-async"],
    sourceCode: "https://github.com/sh1v-max/My-portfolio-2.0",
    demo: "https://singhshiv.netlify.app/",
  },
  {
    title: "TaskForge",
    description:
      "Full-stack task management app with JWT auth, CRUD operations, filtering, sorting, pagination, and a production-ready Express/MongoDB REST API backed by a 12-test suite.",
    image: "https://placehold.co/600x400/1f2428/88c0d0?text=TaskForge",
    tags: ["node.js", "express", "mongodb", "mongoose", "jwt", "zod", "rest-api", "swagger", "react", "tailwind"],
    sourceCode: "https://github.com/sh1v-max/TaskforgeAPI",
    demo: "https://github.com/sh1v-max/TaskforgeAPI",
  },
  {
    title: "Coming Soon...",
    description:
      "I'm currently brewing up something exciting! Stay tuned for my next big project.",
    image: "https://placehold.co/600x400/1f2428/88c0d0?text=Coming+Soon",
    tags: ["top-secret", "cooking", "stay-tuned"],
    sourceCode: "#",
    demo: "#",
  },
];
