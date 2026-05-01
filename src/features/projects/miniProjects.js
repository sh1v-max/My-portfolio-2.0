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
} from "../../assets/frontend-lab-images";

export const miniProjects = [
  {
    title: "Countdown Timer",
    description:
      "Configurable countdown component with real-time tick, pause/resume controls, and smooth circular progress ring.",
    image: countdownTimer,
    tags: ["react", "setInterval", "time-calc"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/12-Countdown-timer",
    demo: "https://countdowntimerhere.netlify.app/",
  },
  {
    title: "File Explorer",
    description:
      "Hierarchical file system UI with recursive tree rendering, expand/collapse, and file-type icons.",
    image: fileExplorer,
    tags: ["react", "recursion", "tree-structure"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/13-File-explorer",
    demo: "https://fileexplorerjs.netlify.app/",
  },
  {
    title: "Interactive Grid",
    description:
      "Click-to-select grid system with multi-select, highlight states, and useRef-driven grid state management.",
    image: interactiveGrid,
    tags: ["react", "useRef", "grid-state"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/14-Interactive-grid",
    demo: "https://interactivegridis.netlify.app/",
  },
  {
    title: "Typing Effect",
    description:
      "Animated typing text simulation with configurable speed, looping, and backspace deletion effect.",
    image: typingEffect,
    tags: ["react", "string-manipulation", "timers"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/25-Typing-effect",
    demo: "https://typingeffecthere.netlify.app/",
  },
  {
    title: "Drag & Drop Upload",
    description:
      "File upload zone with drag-and-drop support, file previews, and File API integration.",
    image: dragAndDropUpload,
    tags: ["react", "file-api", "drag-events"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/26-File-uploader",
    demo: "https://uploadfilehere.netlify.app/",
  },
  {
    title: "Indeterminate Checkbox",
    description:
      "Hierarchical checkbox system with DFS-powered indeterminate states, parent-child sync logic.",
    image: indeterminateCheckbox,
    tags: ["react", "dfs", "refs"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/27-Indeterminate-checkbox",
    demo: "https://indeterminate-checkbox.netlify.app/",
  },
  {
    title: "Traffic Light",
    description:
      "Animated traffic light simulator with state machine transitions, configurable durations per phase.",
    image: trafficLight,
    tags: ["react", "state-machines", "timers"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/28-Traffic-light",
    demo: "https://trafficlighthere.netlify.app/",
  },
  {
    title: "Multi Select Search",
    description:
      "Advanced user search with pill-style selections, API integration, and full keyboard navigation support.",
    image: multiSelectSearch,
    tags: ["react", "api", "keyboard-nav"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/40-Multi-select-search",
    demo: "https://multiselectusersearch.netlify.app/",
  },
  {
    title: "QuizGuru",
    description:
      "Interactive quiz app with scoring, progress tracking, timed questions, and result breakdown.",
    image: quizGuru,
    tags: ["react", "quiz-logic", "progress"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/41-Quiz-app",
    demo: "https://yourquizguru.netlify.app/",
  },
  {
    title: "Selectable Grid",
    description:
      "Multi-select grid with drag-to-select, shift-click range selection, and complex selection state logic.",
    image: selectableGrid,
    tags: ["react", "drag-select", "complex-state"],
    sourceCode:
      "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/42-Selectable-grid",
    demo: "https://selectablegrid.netlify.app/",
  },
];
