/* eslint-disable react/prop-types */
const Badge = ({ children }) => (
  <span className="rounded-full border border-accentColor/20 bg-accentColor/10 px-3 py-1 text-sm font-medium text-accentColor">
    {children}
  </span>
);

export default Badge;
