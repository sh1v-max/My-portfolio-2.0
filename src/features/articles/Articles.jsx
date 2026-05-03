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
            <span className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
              Latest Insights
            </span>
            <h1 className="text-textColor text-4xl font-extrabold tracking-tight sm:text-5xl">
              Technical Blog
            </h1>
            <p className="text-textColor/60 max-w-xl text-base leading-relaxed">
              Recent posts from my{" "}
              <a
                className="text-accentColor decoration-accentColor/30 hover:decoration-accentColor underline underline-offset-4 transition-colors"
                href="https://dev.to"
                target="_blank"
                rel="noreferrer"
              >
                dev.to
              </a>{" "}
              profile, covering React, JavaScript, and modern web architecture.
            </p>
            <div className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-gradient-to-r" />
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
