import Main from "./components/Main";
import Home from "./features/home/Home";
import About from "./features/about/About";
import Contact from "./features/contact/Contact";
import Projects from "./features/projects/Projects";
import TaskForgeDetail from "./features/projects/TaskForgeDetail";
import NetflixGPTDetail from "./features/projects/NetflixGPTDetail";
import BiteSwiftDetail from "./features/projects/BiteSwiftDetail";
import BookVerseDetail from "./features/projects/BookVerseDetail";
import PortfolioDetail from "./features/projects/PortfolioDetail";
// import Articles, {
//   loader as ArticlesLoader,
// } from "./features/articles/Articles";
// import Github, { loader as GithubLoader } from "./features/github/Github";
import Github from "./features/github/Github";
import Settings from "./features/theme/Settings";
import UIExperiments from "./features/frontend-lab/UIExperiments";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { GithubProvider } from "./context/GithubContext";
import ErrorPage from "./features/error/ErrorPage";
import GithubError from "./features/error/GithubError";

const router = createBrowserRouter([
  {
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/taskforge",
        element: <TaskForgeDetail />,
      },
      {
        path: "/projects/netflix-gpt",
        element: <NetflixGPTDetail />,
      },
      {
        path: "/projects/biteswift",
        element: <BiteSwiftDetail />,
      },
      {
        path: "/projects/bookverse",
        element: <BookVerseDetail />,
      },
      {
        path: "/projects/portfolio",
        element: <PortfolioDetail />,
      },
      // {
      //   path: "/articles",
      //   element: <Articles />,
      //   loader: ArticlesLoader,
      // },
      {
        path: "/github",
        element: <Github />,
        errorElement: <GithubError />,
      },
      {
        path: "/frontend-lab",
        element: <UIExperiments />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <GithubProvider>
    <ThemeProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1e2228",
            color: "#e2e8f0",
            border: "1px solid #88c0d0",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#88c0d0", secondary: "#1e2228" },
          },
          error: {
            iconTheme: { primary: "#bf616a", secondary: "#1e2228" },
          },
        }}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
    </GithubProvider>
  );
}

export default App;
