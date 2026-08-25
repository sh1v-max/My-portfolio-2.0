import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { personal } from "../data/config";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [copied, copy] = useCopyToClipboard();

  const socialLinks = [
    {
      name: "GitHub",
      href: personal.github,
      icon: <Icon icon="mdi:github" width="18" height="18" />,
    },
    {
      name: "LinkedIn",
      href: personal.linkedin,
      icon: <Icon icon="mdi:linkedin" width="18" height="18" />,
    },
    {
      name: "Email",
      href: `mailto:${personal.email}`,
      icon: <Icon icon="lucide:mail" width="18" height="18" />,
    },
  ];

  return (
    <footer className="border-t border-explorerBorder/40 bg-mainBg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 md:px-8">
        {/* Left: Brand */}
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <Link to="/" className="text-sm font-bold tracking-tight text-textColor">
            Shiv<span className="text-accentColor">.</span>
          </Link>
          <p className="text-xs text-textMuted">
            © {currentYear} {personal.name}. All rights reserved.
          </p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-textMuted transition-all duration-200 hover:bg-explorerBorder/30 hover:text-accentColor"
            >
              {social.icon}
            </a>
          ))}
          {/* mailto: doesn't reliably open a compose window on every
              browser/OS — copy is the fallback that always works. */}
          <button
            type="button"
            onClick={() => copy(personal.email)}
            title={copied ? "Copied!" : "Copy email"}
            aria-label={copied ? "Email copied" : "Copy email address"}
            className={`flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-200 ${
              copied ? "text-accentColor" : "text-textMuted hover:bg-explorerBorder/30 hover:text-accentColor"
            }`}
          >
            <Icon icon={copied ? "lucide:check" : "lucide:copy"} width="16" height="16" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
