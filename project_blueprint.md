# Project Blueprint: VS Code Portfolio 2.0

> **Instruction for AI**: Use this blueprint to understand the architecture, project flow, and implementation details of this React portfolio. It is designed to mimic a functional VS Code environment.

## 1. Project Directory Tree
```text
src/
├── App.jsx                # Router configuration & Global Providers
├── index.css              # Global styles, Custom Scrollbars, Keyframe Animations
├── main.jsx               # React entry point
│
├── components/            # IDE Shell Components (Layout)
│   ├── Main.jsx           # Master Shell (Coordinates Sidebar, Explorer, Pages)
│   ├── SideBar.jsx        # Vertical Activity Bar (Icons)
│   ├── Explorer.jsx       # File Tree Navigation
│   ├── Tabs.jsx           # Horizontal Editor Tabs (Sync with Routes)
│   ├── NavBar.jsx         # Title Bar (File/Edit/Selection menu)
│   ├── Footer.jsx         # Status Bar (Git branch, Errors, Warning icons)
│   ├── Pages.jsx          # Content Viewport (renders <Outlet />)
│   └── ProjectButton.jsx  # Reusable Styled Button
│
├── features/              # Business Logic & Page Content (Feature-Based)
│   ├── home/              # Landing Page (Illustration + Intro)
│   ├── about/             # Bio & Tech Stack Visualization
│   ├── projects/          # Main Projects (Grid & Carousel)
│   ├── frontend-lab/      # UI Experiments Dashboard (33+ mini projects)
│   ├── github/            # Live GitHub Statistics Dashboard
│   ├── contact/           # Contact Form (React Hook Form + EmailJS)
│   ├── settings/          # Theme Selection UI
│   └── error/             # 404 & Error Boundaries
│
├── constants/             # Shared Logic & Registry
│   └── projectImages.js   # Centralized Asset Resolution (Scalable mapping)
│
├── context/               # State Management
│   └── ThemeContext.jsx   # Theme persistence & state (tw-colors logic)
│
├── services/              # API & Data Fetching
│   ├── apiGithub.js       # GitHub API calls
│   └── apiArticles.js     # Article fetching logic
│
└── assets/                # Static Resources
    ├── icons/             # Custom SVG icons for file types
    ├── images/            # Project screenshots
    └── frontend-lab/      # Asset group for UI experiments
```

---

## 2. Technical Flow & Logic

### 🎨 Theming System (tw-colors)
The project supports multiple themes (Dracula, Nord, Ayu, etc.).
- **Mechanism**: `tailwind.config.js` uses the `tw-colors` plugin to define color tokens for each theme.
- **Switching**: `ThemeContext.jsx` manages the `theme` state and persists it in `localStorage`.
- **Implementation**: The `Main.jsx` root `div` gets a class like `theme-dracula`, which Tailwind uses to swap all variable-based colors (e.g., `bg-mainBg`, `text-accentColor`).

### 🛣️ Routing & IDE Sync
The routing mimics opening files in an editor.
- **Definition**: Managed in `App.jsx` using `createBrowserRouter`.
- **Navigation**: Clicking an item in the `Explorer` or `SideBar` changes the URL.
- **Tab Sync**: `Tabs.jsx` checks `location.pathname` to highlight the "active file" and show the corresponding tab.
- **Outlet**: `Pages.jsx` uses the React Router `<Outlet />` to render the specific feature component into the "editor area".

### 📊 Data Loaders (GitHub Dashboard)
- **Pattern**: `App.jsx` defines a `loader` for the `/github` route.
- **Logic**: The `githubLoader.js` fetches user stats and repo data from the GitHub API *before* rendering.
- **UX**: If the fetch fails, a `GithubError.jsx` component is rendered automatically by the router's error boundary.

### ✨ Animations (Framer Motion)
- **Page Entry**: Features use `motion.div` with staggered variants to reveal content smoothly.
- **Layout**: The "floating" effect on the Home page illustration is a continuous `repeat: Infinity` transition.

---

## 3. UI Editing Cheat Sheet

| Component Goal | File to Edit |
| :--- | :--- |
| **Global Theme Colors** | `tailwind.config.js` (createThemes section) |
| **App Shell/Layout** | `src/components/Main.jsx` |
| **Scrollbars & Custom CSS** | `src/index.css` |
| **Add/Remove Sidebar Icons** | `src/components/SideBar.jsx` |
| **Add/Remove Explorer Files** | `src/components/Explorer.jsx` |
| **Main Landing Text** | `src/features/home/Home.jsx` |
| **Add New Projects** | `src/features/projects/project.js` |
| **Mini Projects/Experiments**| `src/features/frontend-lab/data/uiExperimentsData.js` |

---

## 4. Tech Stack Reference
- **Frontend**: React 18, Vite
- **Styles**: Tailwind CSS, tw-colors (Themes)
- **Routing**: React Router v6.4+ (Data Routers)
- **Animations**: Framer Motion
- **Icons**: Lucide-React, React-Icons
- **Forms**: React Hook Form, EmailJS
- **SEO**: React Helmet Async
