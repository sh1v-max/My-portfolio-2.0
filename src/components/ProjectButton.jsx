/* eslint-disable react/prop-types */

export default function ProjectButton({
  href,
  children,
  icon: Icon,
  variant = "primary",
  className = "",
}) {
  const baseStyles =
    "group/btn inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-300 active:scale-[0.97]";

  const variantStyles = {
    primary: "bg-accentColor text-mainBg hover:brightness-110 hover:shadow-lg",
    outline:
      "border border-explorerBorder text-textColor hover:border-accentColor/50 hover:bg-accentColor/10 hover:text-accentColor",
  };

  const iconAnimation =
    variant === "primary"
      ? "group-hover/btn:translate-x-0.5"
      : "group-hover/btn:rotate-12";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {Icon && (
        <Icon
          className={`h-3.5 w-3.5 transition-transform duration-300 ${iconAnimation}`}
        />
      )}
      {children}
    </a>
  );
}
