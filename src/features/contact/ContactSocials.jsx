function ContactSocials() {
  const socials = [
    {
      social: "Email",
      un: "singhshiv0427@gmail.com",
      href: "mailto:singhshiv0427@gmail.com",
    },
    {
      social: "Linkedin",
      un: "shiv-shankar-singh-",
      href: "https://www.linkedin.com/in/shiv-shankar-singh-/",
    },
    {
      social: "Github",
      un: "sh1v-max",
      href: "https://www.github.com/sh1v-max/",
    },
    {
      social: "Instagram",
      un: "singh-shiv",
      href: "https://www.instagram.com/wiwiwiwi.exe/",
    },
    {
      social: "MonkeyType",
      un: "wazir",
      href: "https://monkeytype.com/profile/wazir",
    },
    {
      social: "LeetCode",
      un: "shiv0427",
      href: "https://leetcode.com/u/shiv0427/",
    },
  ];
  return (
    <div className="line-container flex flex-col">
      <p className="  text-3xl text-textColor">Socials</p>
      <div className="flex flex-col space-y-2 pt-5">
        <p className="line text-base text-textColor md:text-2xl">
          .socials &#123;{" "}
        </p>
        {socials.map((social) => {
          return (
            <div className="  line text-base md:text-2xl" key={social.social}>
              <span className="pl-5 text-textColor md:pl-8">
                {social.social}:
              </span>
              <a
                className=" pl-2 text-base text-accentColor hover:underline md:text-2xl"
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.un};
              </a>
            </div>
          );
        })}
        <p className="line text-base text-textColor md:text-2xl">&#125;</p>
      </div>
    </div>
  );
}

export default ContactSocials;
