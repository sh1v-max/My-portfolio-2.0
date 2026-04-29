/* eslint-disable react/prop-types */
function Tag({ tagName }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accentColor/20 bg-accentColor/10 px-3 py-1 text-xs font-medium tracking-wide text-accentColor transition-all duration-300 hover:border-accentColor/50 hover:bg-accentColor/20 hover:shadow-sm">
      {tagName}
    </span>
  );
}

export default Tag;
