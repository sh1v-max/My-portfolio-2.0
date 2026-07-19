import { Icon } from "@iconify/react";
import { personal } from "../../data/config";

function ContactSocials() {
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
        <h3 className="text-xl font-bold text-textColor">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {mainLinks.map((link) => (
            <a
              key={link.social}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-explorerBorder bg-articleBg/40 p-4 transition-all duration-300 hover:border-accentColor/40 hover:bg-articleBg hover:shadow-lg"
            >
              {/* Icon Container */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accentColor/5 text-accentColor transition-all duration-300 group-hover:scale-110 group-hover:bg-accentColor/10">
                {link.icon}
              </div>
              
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-textColor/60">
                  {link.social}
                </p>
                <p className="truncate text-base font-medium text-textColor">
                  {link.un}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Socials Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-bold text-textColor">
          Socials
        </h3>
        <div className="flex flex-wrap gap-4">
          {followMeLinks.map((link) => (
            <a
              key={link.social}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-16 w-16 items-center justify-center rounded-xl border border-explorerBorder bg-articleBg/40 text-textColor/70 transition-all duration-300 hover:border-accentColor hover:bg-accentColor/10 hover:text-accentColor hover:shadow-md"
              title={link.social}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactSocials;
