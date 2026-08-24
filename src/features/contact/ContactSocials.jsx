import { useState } from "react";
import { Icon } from "@iconify/react";
import { personal } from "../../data/config";

function ContactSocials() {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const mainLinks = [
    {
      social: "Email",
      un: personal.email,
      href: `mailto:${personal.email}`,
      icon: <Icon icon="lucide:mail" width="24" height="24" />,
    },
    {
      social: "LinkedIn",
      un: personal.linkedinUsername,
      href: personal.linkedin,
      icon: <Icon icon="lucide:linkedin" width="24" height="24" />,
    },
    {
      social: "GitHub",
      un: personal.githubUsername,
      href: personal.github,
      icon: <Icon icon="lucide:github" width="24" height="24" />,
    },
  ];

  const followMeLinks = [
    {
      social: "Instagram",
      href: personal.instagram,
      icon: <Icon icon="lucide:instagram" width="24" height="24" />,
    },
    {
      social: "X",
      href: personal.twitter,
      icon: <Icon icon="simple-icons:x" width="24" height="24" />,
    },
    {
      social: "LeetCode",
      href: personal.leetcode,
      icon: <Icon icon="simple-icons:leetcode" width="24" height="24" />,
    },
    {
      social: "MonkeyType",
      href: personal.monkeytype,
      icon: <Icon icon="mdi:keyboard-outline" width="24" height="24" />,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Contact Information Section */}
      <div className="space-y-5">
        <h3 className="text-lg font-bold tracking-tight text-textColor">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {mainLinks.map((link) => (
            <a
              key={link.social}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-explorerBorder bg-articleBg/40 p-5 transition-all duration-300 hover:border-accentColor/40 hover:bg-articleBg hover:shadow-lg"
            >
              {/* Icon Container */}
              <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accentColor/5 text-accentColor transition-all duration-300 group-hover:scale-110 group-hover:bg-accentColor/10">
                {link.icon}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-textMuted">
                  {link.social}
                </p>
                <p className="mt-0.5 truncate text-base font-semibold text-textColor">
                  {link.un}
                </p>
              </div>

              {/* Copy button — email only */}
              {link.social === "Email" && (
                <button
                  onClick={copyEmail}
                  title={copied ? "Copied!" : "Copy email"}
                  className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 ${
                    copied
                      ? "border-accentColor/50 bg-accentColor/15 text-accentColor"
                      : "border-explorerBorder/50 bg-textColor/5 text-textMuted hover:border-accentColor/40 hover:bg-accentColor/10 hover:text-accentColor"
                  }`}
                >
                  <Icon
                    icon={copied ? "lucide:check" : "lucide:copy"}
                    width="15"
                    height="15"
                  />
                </button>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Socials Section */}
      <div className="space-y-5">
        <h3 className="text-lg font-bold tracking-tight text-textColor">
          Socials
        </h3>
        <div className="flex flex-wrap gap-4">
          {followMeLinks.map((link) => (
            <a
              key={link.social}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-16 w-16 items-center justify-center rounded-xl border border-explorerBorder bg-articleBg/40 text-textSecondary ring-1 ring-textColor/10 transition-all duration-300 hover:border-accentColor hover:bg-accentColor/10 hover:text-accentColor hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentColor"
              aria-label={`${link.social} (opens in a new tab)`}
              title={link.social}
            >
              <span aria-hidden="true">{link.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactSocials;
