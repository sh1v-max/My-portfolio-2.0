function ContactSocials() {
  const socials = [
    {
      social: "Email",
      un: "singhshiv0427@gmail.com",
      href: "mailto:singhshiv0427@gmail.com",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      social: "LinkedIn",
      un: "shiv-shankar-singh-",
      href: "https://www.linkedin.com/in/shiv-shankar-singh-/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      social: "GitHub",
      un: "sh1v-max",
      href: "https://www.github.com/sh1v-max/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    // {
    //   social: "Instagram",
    //   un: "singh-shiv",
    //   href: "https://www.instagram.com/wiwiwiwi.exe/",
    //   icon: (
    //     <svg
    //       width="20"
    //       height="20"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     >
    //       <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    //       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    //       <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    //     </svg>
    //   ),
    // },
    // {
    //   social: "MonkeyType",
    //   un: "wazir",
    //   href: "https://monkeytype.com/profile/wazir",
    //   icon: (
    //     <svg
    //       width="20"
    //       height="20"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     >
    //       <rect width="20" height="14" x="2" y="5" rx="2" />
    //       <path d="M6 9h1" />
    //       <path d="M11 9h1" />
    //       <path d="M16 9h1" />
    //       <path d="M6 13h12" />
    //     </svg>
    //   ),
    // },
    // {
    //   social: "LeetCode",
    //   un: "shiv0427",
    //   href: "https://leetcode.com/u/shiv0427/",
    //   icon: (
    //     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.842.732a1.38 1.38 0 0 0 1.953-.053 1.378 1.378 0 0 0-.051-1.952L15.6.706a1.38 1.38 0 0 0-.543-.34 1.381 1.381 0 0 0-.575-.128l-.001.002z" />
    //       <path d="M15.894 20.174H8.55c-.762 0-1.38-.614-1.38-1.373 0-.76.618-1.375 1.38-1.375h7.344c.762 0 1.38.615 1.38 1.375 0 .759-.618 1.373-1.38 1.373z" />
    //     </svg>
    //   ),
    // },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-textColor/30">
          Digital Presence
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-textColor/10 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-5">
        {socials.map((social) => (
          <a
            key={social.social}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center gap-5 rounded-2xl border border-explorerBorder bg-articleBg/40 p-5 transition-all duration-300 hover:border-accentColor/40 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accentColor/5 text-accentColor transition-all duration-300 group-hover:bg-accentColor/10 group-hover:scale-110">
              {social.icon}
            </div>
            
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="text-sm font-bold text-textColor/80 transition-colors duration-300 group-hover:text-textColor">
                {social.social}
              </p>
              <p className="break-all text-[11px] font-medium leading-relaxed tracking-tight text-textColor/40 transition-colors duration-300 group-hover:text-textColor/60">
                {social.un}
              </p>
            </div>

            <div className="translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accentColor">
                <path d="M7 17l10-10M7 7h10v10" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ContactSocials;
