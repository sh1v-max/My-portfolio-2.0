import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import Main from "./components/Main";
import MainScrollPage from "./features/home/MainScrollPage";
import { ThemeProvider } from "./context/ThemeContext";
import { GithubProvider } from "./context/GithubContext";
import ErrorPage from "./features/error/ErrorPage";
import GithubError from "./features/error/GithubError";
import RouteFallback from "./components/RouteFallback";

// Home stays eager: it is the landing route and the most common entry point, so
// splitting it would only trade a smaller bundle for a flash of fallback on the
// one page that must feel instant.
//
// Everything else is split. The five case-study pages alone are ~2,300 lines and
// are reached by a minority of visitors, so they have no business sitting in the
// initial download.
// /projects is retired: the home page renders the same component as its work
// section, so a separate route would be a second URL for identical content.
// Deep links to it are redirected to the section below.
const About = lazy(() => import("./features/about/About"));
const Contact = lazy(() => import("./features/contact/Contact"));
const TaskForgeDetail = lazy(() => import("./features/projects/TaskForgeDetail"));
const NetflixGPTDetail = lazy(() => import("./features/projects/NetflixGPTDetail"));
const BiteSwiftDetail = lazy(() => import("./features/projects/BiteSwiftDetail"));
const BookVerseDetail = lazy(() => import("./features/projects/BookVerseDetail"));
const PortfolioDetail = lazy(() => import("./features/projects/PortfolioDetail"));
const Github = lazy(() => import("./features/github/Github"));
const Settings = lazy(() => import("./features/theme/Settings"));
const UIExperiments = lazy(() => import("./features/frontend-lab/UIExperiments"));

// One Suspense boundary per route rather than a single one around the outlet, so
// a slow chunk only ever blanks the page body — the nav, footer and back button
// stay mounted and interactive while it loads.
const split = (Component) => (
  <Suspense fallback={<RouteFallback />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <MainScrollPage /> },
      { path: "/projects", element: <Navigate to="/#projects" replace /> },
      { path: "/about", element: split(About) },
      { path: "/contact", element: split(Contact) },
      { path: "/projects/taskforge", element: split(TaskForgeDetail) },
      { path: "/projects/cinegraph", element: split(NetflixGPTDetail) },
      { path: "/projects/biteswift", element: split(BiteSwiftDetail) },
      { path: "/projects/bookverse", element: split(BookVerseDetail) },
      { path: "/projects/portfolio", element: split(PortfolioDetail) },
      {
        path: "/github",
        element: split(Github),
        errorElement: <GithubError />,
      },
      { path: "/frontend-lab", element: split(UIExperiments) },
      { path: "/settings", element: split(Settings) },
    ],
  },
]);

function App() {
  return (
    <GithubProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </GithubProvider>
  );
}

export default App;
