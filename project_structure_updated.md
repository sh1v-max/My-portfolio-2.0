# My Portfolio VSCode - Project Structure

This document outlines the entire file architecture of the `My-portfolio-vsc` project. It is structured using a **Feature-Based Architecture**, meaning code is grouped by the domain/page it belongs to rather than by file type.

## Root Directory (`/src`)

The `/src` folder is the entry point of the React application.

*   **`main.jsx`**: The React DOM entry point. Injects the app into `index.html`.
*   **`App.jsx`**: The root component. Handles routing (`react-router-dom`), wraps the app in the `ThemeContext`, and sets up the global `Toaster`.
*   **`index.css` & `App.css`**: Global CSS files containing Tailwind v4 setup, native CSS variables for theming, and custom scrollbar styles.

---

## `/src/assets`
Contains all static assets that do not require processing by React.
*   `/docs/resume.pdf`: The downloadable resume.
*   `/images/`: Screenshots of projects, VSCode themes (Dracula, Nord, etc.), and other static imagery.
*   `/icons/`: Raw SVG icons and `.ico` files.
*   `/frontend-lab/`: Contains images specifically for the UI experiments showcase.

---

## `/src/components`
Contains **Shared / Global Layout Components**. These components are visible on almost every page and form the "IDE" shell.
*   **`Main.jsx`**: The layout wrapper. Assembles NavBar, SideBar, Footer, and the main `<Pages/>` outlet.
*   **`NavBar.jsx`**: Top navigation bar (mobile and desktop).
*   **`BottomNav.jsx`**: Mobile-only bottom navigation bar.
*   **`SideBar.jsx`**: The left-most activity bar (Home, Code, GitHub icons).
*   **`Explorer.jsx`**: The secondary sidebar showing the file tree navigation.
*   **`Tabs.jsx`**: The horizontal tabs showing open "files" (pages).
*   **`Pages.jsx`**: The React Router `<Routes>` definition container.
*   **`ScrollToTop.jsx`**: Utility component to reset window scroll on route change.
*   **`FloatingThemeButton.jsx` / `ThemeIllustration.jsx`**: The floating action button to change themes.
*   **`/icons/`**: A collection of `.jsx` files returning SVG elements (slowly being replaced by `@iconify/react`).

---

## `/src/context`
Contains React Context providers for global state management.
*   **`ThemeContext.jsx`**: Manages the current theme state, persists it to `localStorage`, and updates the root `document.documentElement` class for Tailwind to react to.

---

## `/src/features`
The core of the application logic. Separated by domains/pages.

### `/about`
*   **`About.jsx`**: The main about page.
*   **`BentoSkills.jsx`**: A grid layout displaying primary tech stack.
*   **`MarqueeSkills.jsx`**: Infinite scrolling marquee for secondary skills.

### `/contact`
*   **`Contact.jsx`**: The contact form logic (using `react-hook-form` and `EmailJS`).
*   **`ContactSocials.jsx`**: Links and icons for GitHub, LinkedIn, etc.

### `/error`
*   **`ErrorPage.jsx`**: A generic 404/Not Found page styled like a terminal error.
*   **`GithubError.jsx`**: Specific error boundary fallback if the GitHub API rate limits.

### `/frontend-lab`
*   **`UIExperiments.jsx`**: Main page component for the UI Lab.
*   **`/components/`**: Modular parts like `SearchBar`, `FilterTabs`, `HeroSection`, and `ExperimentCard`.
*   **`/data/uiExperimentsData.js`**: The local JSON data object holding all experiment details.
*   **`/utils/filterUtils.js`**: Utility logic for searching and filtering the experiments.

### `/github`
*   **`Github.jsx`**: The main Developer Dashboard page.
*   **`githubLoader.jsx`**: Data fetching logic used with React Router's loader pattern.
*   **`/components/`**: Visual sub-components like `ContributionGraph` (using `react-github-calendar`), `StatsGrid`, `HeroProfile`, and `RepoCard`.

### `/home`
*   **`Home.jsx`**: The landing page with the typewriter effect.
*   **`Illustration...jsx`**: Various animated SVG illustrations for the home page.

### `/projects`
*   **`Projects.jsx`**: Main portfolio projects page.
*   **`ProjectCard.jsx` & `MiniProjectCard.jsx`**: Card UI for different project sizes.
*   **`MiniProjectsCarousel.jsx`**: Swiper.js implementation for small experiments.
*   **`project.js` & `miniProjects.js`**: Local data arrays containing project titles, descriptions, and links.

### `/settings` (Unused/In-progress)
*   *Originally intended for a full settings page, currently handled by the `FloatingThemeButton`.*

---

## `/src/services`
Contains API calling logic, keeping fetch logic out of UI components.
*   **`apiGithub.js`**: Axios instances and functions to fetch user data and repositories from the GitHub API.
*   **`apiArticles.js`**: Logic to fetch blog posts (e.g., from Dev.to).
