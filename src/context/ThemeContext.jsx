/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

// Create a context for the theme
const ThemeContext = createContext();

// Create a provider component to wrap your App component
function ThemeProvider({ children }) {
  // Load initial theme from localStorage or default to "nightOwl"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "nightOwl";
  });

  // Update localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Create a custom hook to access the theme context
function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
export { useTheme, ThemeProvider };
