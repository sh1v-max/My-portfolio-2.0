import taskforge from "../../assets/images/taskforge.png";
import cinegraph from "../../assets/images/netflix.png";
import biteswift from "../../assets/images/BiteSwift/biteswift.png";
import bookverse from "../../assets/images/bookverse.png";
import portfolio from "../../assets/images/portfolio/portfolio.png";

export const projects = [
  {
    title: "TaskForge",
    description:
      "Full-stack task management app with JWT auth, CRUD operations, filtering, sorting, pagination, and a production-ready Express/MongoDB REST API backed by a 12-test suite.",
    image: taskforge,
    tags: ["node.js", "express", "mongodb", "mongoose", "jwt", "zod", "rest-api", "swagger", "react", "tailwind"],
    sourceCode: "https://github.com/sh1v-max/Taskforge",
    demo: "https://taskforge-eight-xi.vercel.app",
    caseStudy: "/projects/taskforge",
  },
  {
    title: "Cinegraph",
    description:
      "AI movie, TV & anime recommendation engine built on your own taste graph — rate titles, get a computed taste profile, and let Gemini suggest what to watch next with multi-turn conversation, personalized 'For You' rows, and a full filterable TMDB-backed catalog.",
    image: cinegraph,
    tags: ["react-19", "redux-toolkit", "firebase", "gemini-ai", "tailwind-v4", "react-router-7", "tmdb-api", "vite-6", "cloudflare-worker", "framer-motion", "shadcn-ui", "cloudinary"],
    sourceCode: "https://github.com/sh1v-max/Netflix-GPT",
    demo: "https://cinewatchgraph-ai.web.app",
    caseStudy: "/projects/cinegraph",
  },
  {
    title: "BiteSwift",
    description:
      "High-fidelity food delivery app with real-time cart management, shimmer UI, and lazy-loaded routes.",
    image: biteswift,
    tags: ["react", "redux-toolkit", "tailwind", "vite", "react-router", "swiggy-api", "custom-hooks"],
    sourceCode: "https://github.com/sh1v-max/BiteSwift",
    demo: "https://yourbiteswift.netlify.app/",
    caseStudy: "/projects/biteswift",
  },
  {
    title: "BookVerse",
    description:
      "Modern book discovery platform with search, trending sections, and detailed book pages via Open Library API.",
    image: bookverse,
    tags: ["react", "tailwind", "react-router", "open-library-api", "vite", "custom-hooks"],
    sourceCode: "https://github.com/sh1v-max/BookVerse",
    demo: "https://bookversedot.netlify.app/",
    caseStudy: "/projects/bookverse",
  },
  {
    title: "Portfolio",
    description:
      "A developer portfolio with multiple themes, a beautiful UI, and smooth animations.",
    image: portfolio,
    tags: ["react", "tailwind", "vite", "react-router", "context-api", "tw-colors", "react-helmet-async"],
    sourceCode: "https://github.com/sh1v-max/My-portfolio-2.0",
    demo: "https://singhshiv.netlify.app/",
    caseStudy: "/projects/portfolio",
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
