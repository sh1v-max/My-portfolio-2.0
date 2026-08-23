import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../services/apiGithub";

const GithubContext = createContext(null);

export function GithubProvider({ children }) {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUser()
      .then(({ user, repos }) => {
        setUser(user);
        setRepos(repos);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <GithubContext.Provider value={{ user, repos, loading, error }}>
      {children}
    </GithubContext.Provider>
  );
}

export const useGithub = () => useContext(GithubContext);
