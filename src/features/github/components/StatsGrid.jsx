/* eslint-disable react/prop-types */
import SectionTitle from "./SectionTitle";
import StatCard from "./StatCard";

export default function StatsGrid({ user, totalStars, totalForks }) {
  // "Contributions: 1K+" used to sit in this grid as a hardcoded string beside
  // three real figures. The REST endpoints this page uses carry no contribution
  // total (that needs the GraphQL API and a token), so it is replaced with a
  // number that is actually derivable. The calendar below shows the real
  // activity.
  const since = user.created_at ? new Date(user.created_at).getFullYear() : "—";
  return (
    <div>
      <SectionTitle title="Developer Metrics" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <StatCard label="Public Repos" value={user.public_repos} />
        <StatCard label="Total Stars" value={totalStars} />
        <StatCard label="Total Forks" value={totalForks} />
        <StatCard label="Building since" value={since} />
      </div>
    </div>
  );
}
