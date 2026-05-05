import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const pageOrder = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/frontend-lab", label: "Lab" },
  { path: "/github", label: "GitHub" },
  { path: "/contact", label: "Contact" },
];

export default function PageNavigator() {
  const location = useLocation();
  const currentIndex = pageOrder.findIndex((p) => p.path === location.pathname);

  // Don't render if route isn't in the page flow
  if (currentIndex === -1) return null;

  const prevPage = currentIndex > 0 ? pageOrder[currentIndex - 1] : null;
  const nextPage =
    currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
      className="mx-auto mt-10 mb-8 flex max-w-5xl items-center justify-between px-4 sm:px-6 md:px-8"
      aria-label="Page navigation"
    >
      {/* ─── Previous ─── */}
      {prevPage ? (
        <Link to={prevPage.path} className="group">
          <motion.div
            className="flex flex-col items-start gap-0.5"
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className="text-[10px] font-medium uppercase tracking-widest text-textColor/30 transition-colors duration-200 group-hover:text-textColor/50">
              Previous
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-textColor/60 transition-colors duration-200 group-hover:text-accentColor">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              {prevPage.label}
            </span>
          </motion.div>
        </Link>
      ) : (
        <div />
      )}

      {/* ─── Decorative Divider ─── */}
      <div className="hidden items-center gap-1.5 sm:flex">
        {pageOrder.map((page, i) => (
          <div
            key={page.path}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 bg-accentColor"
                : "w-1.5 bg-textColor/15"
            }`}
          />
        ))}
      </div>

      {/* ─── Next ─── */}
      {nextPage ? (
        <Link to={nextPage.path} className="group">
          <motion.div
            className="flex flex-col items-end gap-0.5"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className="text-[10px] font-medium uppercase tracking-widest text-textColor/30 transition-colors duration-200 group-hover:text-textColor/50">
              Continue
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-textColor/60 transition-colors duration-200 group-hover:text-accentColor">
              {nextPage.label}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </motion.div>
        </Link>
      ) : (
        <div />
      )}
    </motion.nav>
  );
}
