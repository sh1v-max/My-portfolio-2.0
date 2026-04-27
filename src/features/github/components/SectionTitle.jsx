/* eslint-disable react/prop-types */
const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-6 border-b border-explorerBorder pb-2">
    <h3 className="text-2xl font-bold text-textColor">{title}</h3>
    {subtitle && <p className="mt-1 text-sm text-bgText">{subtitle}</p>}
  </div>
);

export default SectionTitle;
