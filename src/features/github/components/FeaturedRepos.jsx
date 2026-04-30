/* eslint-disable react/prop-types */
import SectionTitle from "./SectionTitle";
import RepoCardItem from "./RepoCardItem";

export default function FeaturedRepos({ featuredRepos }) {
  return (
    <div>
      <SectionTitle
        title="Featured Repositories"
        subtitle="Pinned repositories from my portfolio"
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredRepos.length > 0 ? (
          featuredRepos.map((repo) => (
            <RepoCardItem key={repo.id} repo={repo} />
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-textColor opacity-60">
            No repositories found.
          </div>
        )}
      </div>
    </div>
  );
}
