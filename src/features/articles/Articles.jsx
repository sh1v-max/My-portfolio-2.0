import { Helmet, HelmetProvider } from "react-helmet-async";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../../services/apiArticles";
import { useLoaderData } from "react-router";

function Articles() {
  const articles = useLoaderData();
  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Articles</title>
      </Helmet>
      <section className="min-h-[85vh] px-6 py-16 sm:px-10 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-14 flex flex-col items-start gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accentColor/30 bg-accentColor/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accentColor">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accentColor" />
              Latest Insights
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-textColor sm:text-5xl">
              Technical Blog
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-textColor/60">
              Recent posts from my{" "}
              <a
                className="text-accentColor underline decoration-accentColor/30 underline-offset-4 transition-colors hover:decoration-accentColor"
                href="https://dev.to"
                target="_blank"
                rel="noreferrer"
              >
                dev.to
              </a>{" "}
              profile, covering React, JavaScript, and modern web architecture.
            </p>
            <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-accentColor to-accentColor/30" />
          </div>

          <div className="grid gap-x-5 gap-y-5 md:grid-cols-2 xl:grid-cols-4">
            {articles &&
              articles.map((article) => {
                return (
                  <ArticleCard
                    key={article.id}
                    url={article.canonical_url}
                    image={article.cover_image}
                    title={article.title}
                    desc={article.description}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}
export async function loader() {
  const articles = await getArticles();
  return articles;
}

export default Articles;
