/* eslint-disable react/prop-types */
const StatCard = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-transparent bg-articleBg p-6 shadow-sm transition-all hover:border-accentColor hover:shadow-md">
    <span className="text-4xl font-extrabold text-accentColor">{value}</span>
    <span className="mt-2 text-center text-sm font-medium uppercase tracking-wider text-textColor opacity-80">
      {label}
    </span>
  </div>
);

export default StatCard;
