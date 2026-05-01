import {
  toastNotification,
  starRating,
  wallheaven,
  otpInput,
  imageCarousel,
  searchBar,
  infiniteScrolling,
  countdownTimer,
  fileExplorer,
  interactiveGrid,
  tictactoe,
  snakeGame,
  multiStepForm,
  myDashboard,
  memoryGame,
  calendar,
  nestedComments,
  cryptoConverter,
  typingEffect,
  dragAndDropFile,
  indeterminateCheckbox,
  trafficLight,
  faqAccordion,
  stopwatch,
  digitalClock,
  overlappingCircles,
  calculator,
  dialogPopup,
  switchComponent,
  roadsideStore,
  multiSelectSearch,
  quizGuru,
  selectableGrid,
} from "@/assets/frontend-lab-images";

export const uiExperiments = [
  // BEGINNER
  {
    title: "Toast Notification",
    description: "Dynamic toast messages with auto-dismiss",
    level: "Beginner",
    category: "UI",
    image: toastNotification,
    tags: ["useState", "event handling"],
    demo: "https://youtoastnotificationhere.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/05-Toast"
  },
  {
    title: "Star Rating",
    description: "Interactive 5-star rating system",
    level: "Beginner",
    category: "UI",
    image: starRating,
    tags: ["Click events", "state management"],
    demo: "https://rate-my-star.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/06-Star-rating"
  },
  {
    title: "WallHeaven",
    description: "Image pagination with API integration",
    level: "Beginner",
    category: "API",
    image: wallheaven,
    tags: ["API calls", "pagination logic"],
    demo: "https://astranoutintheocean.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/07-React-pagination"
  },
  {
    title: "OTP Input",
    description: "Multi-digit OTP input field",
    level: "Beginner",
    category: "Forms",
    image: otpInput,
    tags: ["Input focus", "validation"],
    demo: "https://enteryourotp.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/08-React-OTP-Input"
  },
  {
    title: "Image Carousel",
    description: "Responsive image slider",
    level: "Beginner",
    category: "UI",
    image: imageCarousel,
    tags: ["Array manipulation", "navigation"],
    demo: "https://delightimagecarousel.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/09-Image-carousel"
  },
  {
    title: "Search Bar",
    description: "Live search with filtering",
    level: "Beginner",
    category: "Forms",
    image: searchBar,
    tags: ["onChange", "array filtering"],
    demo: "https://searchthebar.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS"
  },
  {
    title: "Infinite Scrolling",
    description: "Load more content on scroll",
    level: "Beginner",
    category: "API",
    image: infiniteScrolling,
    tags: ["Scroll events", "API pagination"],
    demo: "https://keepscrollingthis.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/11-Infinite-scroll"
  },
  {
    title: "Countdown Timer",
    description: "Configurable countdown component",
    level: "Beginner",
    category: "Logic",
    image: countdownTimer,
    tags: ["setInterval", "time calculations"],
    demo: "https://countdowntimerhere.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/12-Countdown-timer"
  },
  {
    title: "File Explorer",
    description: "Hierarchical file system UI",
    level: "Beginner",
    category: "UI",
    image: fileExplorer,
    tags: ["Tree structure", "recursion"],
    demo: "https://fileexplorerjs.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/13-File-explorer"
  },
  {
    title: "Interactive Grid",
    description: "Click-to-select grid system",
    level: "Beginner",
    category: "UI",
    image: interactiveGrid,
    tags: ["useRef", "grid state management"],
    demo: "https://interactivegridis.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/14-Interactive-grid"
  },

  // INTERMEDIATE
  {
    title: "Tic Tac Toe",
    description: "Classic game with win detection",
    level: "Intermediate",
    category: "Games",
    image: tictactoe,
    tags: ["Game logic", "state patterns"],
    demo: "https://magictictactoe.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/15-Tic-Tac-Toe"
  },
  {
    title: "Snake Game",
    description: "Arrow-key controlled snake game",
    level: "Intermediate",
    category: "Games",
    image: snakeGame,
    tags: ["Keyboard events", "game loops"],
    demo: "https://killmysnake.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/16-Snake-game"
  },
  {
    title: "Multi-Step Form",
    description: "Progress-based form stepper",
    level: "Intermediate",
    category: "Forms",
    image: multiStepForm,
    tags: ["Form validation", "multi-step UI"],
    demo: "https://multistepstepper.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/19-React-stepper"
  },
  {
    title: "Dashboard Tabs",
    description: "Data visualization dashboard",
    level: "Intermediate",
    category: "UI",
    image: myDashboard,
    tags: ["Tab navigation", "data display"],
    demo: "https://reactdashboardtab.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/20-React-tab"
  },
  {
    title: "Memory Game",
    description: "Card-matching memory challenge",
    level: "Intermediate",
    category: "Games",
    image: memoryGame,
    tags: ["Game state", "animations"],
    demo: "https://doyourmemory.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/21-Memory-game"
  },
  {
    title: "Simple Calendar",
    description: "Interactive calendar component",
    level: "Intermediate",
    category: "UI",
    image: calendar,
    tags: ["Date manipulation", "rendering"],
    demo: "https://reactcalendarme.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/22-Calendar"
  },
  {
    title: "Nested Comments",
    description: "Reddit-style comment system",
    level: "Intermediate",
    category: "UI",
    image: nestedComments,
    tags: ["Recursive components", "threading"],
    demo: "https://discusskarma.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/23-Nested-comments"
  },
  {
    title: "Crypto Converter",
    description: "Real-time cryptocurrency converter",
    level: "Intermediate",
    category: "API",
    image: cryptoConverter,
    tags: ["API integration", "calculations"],
    demo: "https://striffcrypto.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/24-Crypto-converter"
  },
  {
    title: "Typing Effect",
    description: "Animated typing text simulation",
    level: "Intermediate",
    category: "UI",
    image: typingEffect,
    tags: ["String manipulation", "timers"],
    demo: "https://typingeffecthere.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/25-Typing-effect"
  },
  {
    title: "Drag & Drop Upload",
    description: "File upload with drag-and-drop",
    level: "Intermediate",
    category: "Forms",
    image: dragAndDropFile,
    tags: ["File API", "drag events"],
    demo: "https://uploadfilehere.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/26-File-uploader"
  },
  {
    title: "Indeterminate Checkbox",
    description: "Hierarchical checkbox system",
    level: "Intermediate",
    category: "Logic",
    image: indeterminateCheckbox,
    tags: ["DFS algorithm", "refs"],
    demo: "https://indeterminate-checkbox.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/27-Indeterminate-checkbox"
  },
  {
    title: "Traffic Light",
    description: "Animated traffic light simulator",
    level: "Intermediate",
    category: "Logic",
    image: trafficLight,
    tags: ["State machines", "timers"],
    demo: "https://trafficlighthere.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/28-Traffic-light"
  },

  // ADVANCED
  {
    title: "FAQ Accordion",
    description: "Expandable FAQ with bulk operations",
    level: "Advanced",
    category: "UI",
    image: faqAccordion,
    tags: ["Complex state management"],
    demo: "https://faq-accordiondot.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/29-FAQ-component"
  },
  {
    title: "Stopwatch",
    description: "Precision stopwatch with lap timing",
    level: "Advanced",
    category: "Logic",
    image: stopwatch,
    tags: ["High-precision timing", "persistence"],
    demo: "https://isyourstopwatch.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/30-Stopwatch"
  },
  {
    title: "Digital Clock",
    description: "Live system-synced digital clock",
    level: "Advanced",
    category: "UI",
    image: digitalClock,
    tags: ["Real-time updates", "formatting"],
    demo: "https://sync-clock.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/31-Digital-clock"
  },
  {
    title: "Overlapping Circles",
    description: "2D collision detection system",
    level: "Advanced",
    category: "Logic",
    image: overlappingCircles,
    tags: ["Geometry calculations", "interactions"],
    demo: "https://overlappingcircles.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/32-Overlapping-circles"
  },
  {
    title: "Calculator",
    description: "Full-featured arithmetic calculator",
    level: "Advanced",
    category: "Logic",
    image: calculator,
    tags: ["Expression parsing", "operations"],
    demo: "https://npmcalculator.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/34-Calculator"
  },
  {
    title: "Dialog Popup",
    description: "Accessible modal with React Portals",
    level: "Advanced",
    category: "UI",
    image: dialogPopup,
    tags: ["Portals", "accessibility", "focus trap"],
    demo: "https://dialogpopup.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/36-Dialog"
  },
  {
    title: "Switch Component",
    description: "Accessible theme/settings switch",
    level: "Advanced",
    category: "UI",
    image: switchComponent,
    tags: ["ARIA compliance", "accessibility"],
    demo: "https://reactswitch.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/37-Switch"
  },
  {
    title: "RoadsideStore",
    description: "eCommerce with breadcrumbs navigation",
    level: "Advanced",
    category: "UI",
    image: roadsideStore,
    tags: ["Routing", "state management"],
    demo: "https://roadsidestore.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/39-Breadcrumbs"
  },
  {
    title: "Multi Select Search",
    description: "Advanced user search with pills",
    level: "Advanced",
    category: "API",
    image: multiSelectSearch,
    tags: ["API integration", "keyboard nav"],
    demo: "https://multiselectusersearch.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/40-Multi-select-search"
  },
  {
    title: "QuizGuru",
    description: "Interactive quiz with scoring",
    level: "Advanced",
    category: "Logic",
    image: quizGuru,
    tags: ["Quiz logic", "progress tracking"],
    demo: "https://yourquizguru.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/41-Quiz-app"
  },
  {
    title: "Selectable Grid",
    description: "Multi-select grid with drag selection",
    level: "Advanced",
    category: "Logic",
    image: selectableGrid,
    tags: ["Complex selection logic"],
    demo: "https://selectablegrid.netlify.app/",
    sourceCode: "https://github.com/sh1v-max/Practice-UI-design-React-and-JS/tree/main/42-Selectable-grid"
  },
  {
    title: "Coming Soon...",
    description: "Currently brewing something awesome in the lab. Stay tuned!",
    level: "Advanced",
    category: "UI",
    image: "https://placehold.co/600x400/1f2428/88c0d0?text=Work+In+Progress",
    tags: ["react", "frontend", "magic"],
    demo: "#",
    sourceCode: "#"
  }
];
