import netflix from "../../assets/images/netflix.jpg";
import biteswift from "../../assets/images/biteswift.jpg";
import bookverse from "../../assets/images/bookverse.jpg";

export const projects = [
  {
    title: "Netflix-GPT",
    description:
      "AI-powered streaming platform with Firebase auth, dynamic movie carousels, and GPT-driven semantic search.",
    image: netflix,
    tags: ["react", "redux-toolkit", "firebase", "openai", "tailwind"],
    sourceCode: "https://github.com/sh1v-max/Netflix-GPT",
    demo: "https://netflixgpt-e671d.firebaseapp.com/",
  },
  {
    title: "BiteSwift",
    description:
      "High-fidelity food delivery app with real-time cart management, shimmer UI, and lazy-loaded routes.",
    image: biteswift,
    tags: ["react", "redux-toolkit", "tailwind", "vite"],
    sourceCode: "https://github.com/sh1v-max/BiteSwift",
    demo: "https://yourbiteswift.netlify.app/",
  },
  {
    title: "BookVerse",
    description:
      "Modern book discovery platform with search, trending sections, and detailed book pages via Open Library API.",
    image: bookverse,
    tags: ["react", "tailwind", "react-router", "open-library-api"],
    sourceCode: "https://github.com/sh1v-max/BookVerse",
    demo: "https://bookversedot.netlify.app/",
  },
];
