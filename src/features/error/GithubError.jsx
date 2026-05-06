import { useRouteError } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Icon } from "@iconify/react";

function GithubError() {
  const { theme } = useTheme();
  const error = useRouteError();

  return (
    <div
      className={`flex min-h-[80vh] flex-col items-center justify-center text-center theme-${theme} bg-mainBg text-textColor px-6`}
    >
      {/* Icon */}
      <div className="mb-6 rounded-full border border-accentColor/30 bg-accentColor/10 p-4 backdrop-blur-sm">
        <Icon 
          icon="lucide:alert-circle" 
          className="text-accentColor" 
          width="40" 
          height="40" 
        />
      </div>

      {/* Title */}
      <h2 className="mb-2 text-2xl font-bold">
        GitHub Data Unavailable
      </h2>

      {/* Message */}
      <p className="max-w-md text-sm opacity-70 leading-relaxed">
        Looks like the GitHub API limit was reached or something went wrong while fetching data.
        Please try again after some time.
      </p>

      {/* Optional error detail (safe fallback) */}
      {error?.message && (
        <p className="mt-2 text-xs opacity-40">
          {error.message}
        </p>
      )}

      {/* Retry button */}
      <button
        onClick={() => window.location.reload()}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accentColor px-6 py-2.5 text-sm font-semibold text-mainBg transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
      >
        <Icon icon="lucide:refresh-cw" width="16" height="16" />
        Retry
      </button>
    </div>
  );
}

export default GithubError;