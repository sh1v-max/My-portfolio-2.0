/* eslint-disable react/prop-types */
import SectionTitle from "./SectionTitle";
import StatCard from "./StatCard";

export default function StatsGrid({ user, totalStars, totalForks }) {
  return (
    <div>
      <SectionTitle title="Developer Metrics" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <StatCard label="Public Repos" value={user.public_repos} />
        <StatCard label="Total Stars" value={totalStars} />
        <StatCard label="Total Forks" value={totalForks} />
        <StatCard label="Contributions" value="1K+" />
      </div>
    </div>
  );
}
