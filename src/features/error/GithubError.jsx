import { useRouteError } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function GithubError() {
  const { theme } = useTheme();
  const error = useRouteError();

  return (
    <div
      className={`flex min-h-[80vh] flex-col items-center justify-center text-center theme-${theme} bg-mainBg text-textColor px-6`}
    >
      {/* Icon */}
      <div className="mb-6 rounded-full border border-accentColor/30 bg-accentColor/10 p-4 backdrop-blur-sm">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accentColor"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
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
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accentColor px-4 py-2 text-sm font-semibold text-mainBg transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
      >
        Retry
      </button>
    </div>
  );
}

export default GithubError;