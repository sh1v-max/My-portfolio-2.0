import Main from "./components/Main";
import Home from "./features/home/Home";
import About from "./features/about/About";
import Contact from "./features/contact/Contact";
import Projects from "./features/projects/Projects";
// import Articles, {
//   loader as ArticlesLoader,
// } from "./features/articles/Articles";
// import Github, { loader as GithubLoader } from "./features/github/Github";
import Github from "./features/github/Github";
import { githubLoader } from "./features/github/githubLoader";
import Settings from "./features/theme/Settings";
import UIExperiments from "./features/frontend-lab/UIExperiments";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
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
      // {
      //   path: "/articles",
      //   element: <Articles />,
      //   loader: ArticlesLoader,
      // },
      {
        path: "/github",
        element: <Github />,
        errorElement: <GithubError />,
        loader: githubLoader,
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
    <ThemeProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--articleBg)",
            color: "var(--accentColor)",
            border: "1px solid var(--explorerBorder)",
          },
        }}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
