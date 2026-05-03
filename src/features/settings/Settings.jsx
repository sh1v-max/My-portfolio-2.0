/* eslint-disable react/prop-types */
import ThemeCard from "./ThemeCard";
import Dracula from "../../assets/images/dracula.png";
import NightOwl from "../../assets/images/night-owl.png";
import Github from "../../assets/images/github-dark.png";
import Nord from "../../assets/images/nord.png";
import Ayu from "../../assets/images/ayu.png";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Settings() {
  const themeInfo = [
    {
      name: "Dracula",
      publisher: "Dracula theme",
      theme: "dracula",
      img: Dracula,
    },
    {
      name: "NightOwl",
      publisher: "sarah.drasner",
      theme: "nightOwl",
      img: NightOwl,
    },
    {
      name: "github",
      publisher: "GitHub",
      theme: "github",
      img: Github,
    },
    {
      name: "Nord",
      publisher: "arcticicestudio",
      theme: "nord",
      img: Nord,
    },
    { name: "Ayu Mirage", publisher: "teabyii", theme: "ayuMirage", img: Ayu },
    { name: "Ayu Dark", publisher: "teabyii", theme: "ayuDark", img: Ayu },
  ];

  return (
    <HelmetProvider>
      <section className="min-h-[85vh] px-6 py-16 sm:px-10 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Helmet>
            <title> Shiv | Settings</title>
          </Helmet>
          <h2 className="text-3xl font-semibold text-textColor">Manage Themes</h2>
          <div className="grid gap-5 pt-8 md:grid-cols-3 xl:grid-cols-4">
            {themeInfo.map((th) => {
              return (
                <ThemeCard
                  key={th.name}
                  name={th.name}
                  img={th.img}
                  publisher={th.publisher}
                  theme={th.theme}
                  // changeTheme={changeTheme}
                />
              );
            })}
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}

export default Settings;
