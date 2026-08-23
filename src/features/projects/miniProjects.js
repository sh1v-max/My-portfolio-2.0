import {
  countdownTimer,
  fileExplorer,
  interactiveGrid,
  typingEffect,
  dragAndDropFile as dragAndDropUpload,
  indeterminateCheckbox,
  trafficLight,
  multiSelectSearch,
  quizGuru,
  selectableGrid,
} from "../../assets/frontend-lab";

// Descriptions stay under ~75 characters so they fit the card's two-line clamp
// in full. Anything longer renders with a trailing ellipsis, which reads as
// truncated copy rather than a deliberately short summary.

export const miniProjects = [
  {
    title: "Countdown Timer",
    description:
      "Live countdown with pause, resume, and a progress ring.",
    image: countdownTimer,
    tags: ["react", "setInterval", "time-calc"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/12-Countdown-timer",
    demo: "https://countdowntimerhere.netlify.app/",
  },
  {
    title: "File Explorer",
    description:
      "Recursive file tree with expand, collapse, and type icons.",
    image: fileExplorer,
    tags: ["react", "recursion", "tree-structure"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/13-File-explorer",
    demo: "https://fileexplorerjs.netlify.app/",
  },
  {
    title: "Interactive Grid",
    description:
      "Click-to-select grid with multi-select and highlight states.",
    image: interactiveGrid,
    tags: ["react", "useRef", "grid-state"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/14-Interactive-grid",
    demo: "https://interactivegridis.netlify.app/",
  },
  {
    title: "Typing Effect",
    description:
      "Typing animation with configurable speed, looping, and backspace.",
    image: typingEffect,
    tags: ["react", "string-manipulation", "timers"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/25-Typing-effect",
    demo: "https://typingeffecthere.netlify.app/",
  },
  {
    title: "Drag & Drop Upload",
    description:
      "Drag-and-drop upload zone with previews, built on the File API.",
    image: dragAndDropUpload,
    tags: ["react", "file-api", "drag-events"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/26-File-uploader",
    demo: "https://uploadfilehere.netlify.app/",
  },
  {
    title: "Indeterminate Checkbox",
    description:
      "Nested checkboxes with DFS-driven indeterminate parent states.",
    image: indeterminateCheckbox,
    tags: ["react", "dfs", "refs"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/27-Indeterminate-checkbox",
    demo: "https://indeterminate-checkbox.netlify.app/",
  },
  {
    title: "Traffic Light",
    description:
      "Traffic light simulator driven by a state machine with timed phases.",
    image: trafficLight,
    tags: ["react", "state-machines", "timers"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/28-Traffic-light",
    demo: "https://trafficlighthere.netlify.app/",
  },
  {
    title: "Multi Select Search",
    description:
      "User search with pill selections and full keyboard navigation.",
    image: multiSelectSearch,
    tags: ["react", "api", "keyboard-nav"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/40-Multi-select-search",
    demo: "https://multiselectusersearch.netlify.app/",
  },
  {
    title: "QuizGuru",
    description:
      "Quiz app with scoring, timed questions, and a result breakdown.",
    image: quizGuru,
    tags: ["react", "quiz-logic", "progress"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/41-Quiz-app",
    demo: "https://yourquizguru.netlify.app/",
  },
  {
    title: "Selectable Grid",
    description:
      "Grid with drag-to-select and shift-click range selection.",
    image: selectableGrid,
    tags: ["react", "drag-select", "complex-state"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/42-Selectable-grid",
    demo: "https://selectablegrid.netlify.app/",
  },
];
