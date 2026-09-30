import taskforge from "../../assets/images/taskforge.png";
import cinegraph from "../../assets/images/cinegraph/home.png";
import biteswift from "../../assets/images/BiteSwift/biteswift.png";
import bookverse from "../../assets/images/bookverse.png";
import portfolio from "../../assets/images/portfolio/portfolio.png";
import docmind from "../../assets/images/docmind/chat.png";
import bharatdiet from "../../assets/images/bharatdiet/home.png";

// Descriptions are kept under ~120 characters so they render in full wherever
// they appear — the projects list, and both Home teasers (one of which clamps
// to two lines). The case study page carries the depth.
//
// `role` is the one line a description cannot carry: what I actually did on the
// project, as opposed to what the project is. It is what turns a screenshot into
// evidence of work.
//
// `tags` is the core stack only, not the full dependency list: these are a
// scan-in-one-second signal on a card, and every detail page already lists the
// complete stack.

export const projects = [
  {
    title: "DocMind",
    role:
      "Backend + AI — RAG over pgvector, SSE streaming, Zod-validated LLM output.",
    description:
      "Upload a PDF, chat with it, get quizzed on it. RAG with memory, streamed answers and validated quizzes.",
    image: docmind,
    tags: ["typescript", "express", "postgres-pgvector", "gemini-ai", "rag", "sse"],
    sourceCode: "https://github.com/sh1v-max/AI-Backend",
    demo: "https://docmind-jet.vercel.app/",
    caseStudy: "/projects/docmind",
  },
  {
    title: "TaskForge",
    role:
      "Full-stack — JWT auth, REST API, filtering and pagination on Express/MongoDB.",
    description:
      "Full-stack task manager with JWT auth, CRUD, filtering and pagination on an Express/MongoDB REST API.",
    image: taskforge,
    tags: ["node.js", "express", "mongodb", "jwt", "react"],
    sourceCode: "https://github.com/sh1v-max/Taskforge",
    demo: "https://taskforge-eight-xi.vercel.app",
    caseStudy: "/projects/taskforge",
  },
  {
    title: "Cinegraph",
    role:
      "Full-stack — computed taste profiles, Gemini prompt design, TMDB data layer.",
    description:
      "AI recommendation engine for movies, TV and anime, with taste profiles and Gemini-powered picks.",
    image: cinegraph,
    tags: ["react-19", "redux-toolkit", "gemini-ai", "firebase", "tmdb-api"],
    sourceCode: "https://github.com/sh1v-max/Netflix-GPT",
    demo: "https://cinewatchgraph-ai.web.app",
    caseStudy: "/projects/cinegraph",
  },
  {
    title: "BharatDiet",
    role:
      "Frontend + engine — greedy meal allocator, nutrition maths, 164 Vitest tests.",
    description:
      "Nutrition planner for real Indian food. Meal plans by region, diet and budget, backed by 164 tests.",
    image: bharatdiet,
    tags: ["react-19", "vitest", "algorithms", "tailwind", "seo"],
    sourceCode: "https://github.com/sh1v-max/BharatDiet",
    demo: "https://bharat-diet.vercel.app/",
    caseStudy: "/projects/bharatdiet",
  },
  {
    title: "BiteSwift",
    role:
      "Frontend — Redux cart state, shimmer loading states, route-level code splitting.",
    description:
      "Food delivery app with real-time cart management, shimmer loading states, and lazy-loaded routes.",
    image: biteswift,
    tags: ["react", "redux-toolkit", "tailwind", "swiggy-api"],
    sourceCode: "https://github.com/sh1v-max/BiteSwift",
    demo: "https://yourbiteswift.netlify.app/",
    caseStudy: "/projects/biteswift",
  },
  {
    title: "Portfolio",
    role:
      "Design and build — six-theme token system, motion language, live GitHub dashboard.",
    description:
      "A developer portfolio with six switchable themes, motion-driven UI, and a live GitHub dashboard.",
    image: portfolio,
    tags: ["react", "tailwind", "framer-motion", "vite"],
    sourceCode: "https://github.com/sh1v-max/My-portfolio-2.0",
    demo: "https://singhshiv.netlify.app/",
    caseStudy: "/projects/portfolio",
  },
  {
    title: "BookVerse",
    role:
      "Frontend — debounced search, custom data-fetching hooks, responsive layout.",
    description:
      "Book discovery platform with search, trending sections, and detailed book pages via the Open Library API.",
    image: bookverse,
    tags: ["react", "tailwind", "react-router", "open-library-api"],
    sourceCode: "https://github.com/sh1v-max/BookVerse",
    demo: "https://bookversedot.netlify.app/",
    caseStudy: "/projects/bookverse",
  },
];
