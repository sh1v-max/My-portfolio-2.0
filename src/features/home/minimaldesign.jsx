import { Link } from "react-router-dom";
import Illustration from "./Illustration";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setTypingComplete(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleViewWork = () => {
    console.log("Navigate to projects");
  };

  const handleContact = () => {
    console.log("Navigate to contact");
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Home</title>
      </Helmet>

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Cursor follower */}
        <div
          className="pointer-events-none fixed z-50 h-6 w-6 transition-all duration-100 ease-out"
          style={{
            left: mousePos.x - 12,
            top: mousePos.y - 12,
            background:
              "radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
          <div
            className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-cyan-500 opacity-20 mix-blend-multiply blur-xl filter"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute left-40 top-40 h-60 w-60 animate-pulse rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-xl filter"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 animate-bounce rounded-full bg-white opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Large background text */}
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform select-none opacity-5 max-sm:hidden lg:left-10">
          <div className="text-6xl font-black leading-none lg:text-[12rem]">
            <h1 className="transform bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-transform duration-700 hover:scale-105">
              I BUILD
            </h1>
            <h1 className="transform bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent transition-transform duration-700 hover:scale-105">
              AMAZING
            </h1>
            <h1 className="transform bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent transition-transform duration-700 hover:scale-105">
              WEBSITES
            </h1>
          </div>
        </div>

        {/* Main content */}
        <div
          className={`relative z-20 flex min-h-screen flex-col items-center justify-center gap-y-10 p-4 transition-all duration-1000 md:flex-row md:items-center md:justify-between md:px-28 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Left side - Text content */}
          <div className="max-w-2xl flex-1">
            <div className="mb-6">
              <div className="mb-4 inline-block rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/30">
                <span className="text-sm font-medium text-purple-300">
                  👋 Hello, I'm
                </span>
              </div>
              <h2 className="mb-4 text-4xl font-black leading-tight text-white transition-transform duration-300 hover:scale-105 md:text-6xl xl:text-8xl">
                <span className="animate-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Shiv Shankar Singh
                </span>
              </h2>
            </div>

            <div className="relative mb-8">
              <div className="typewriter overflow-hidden">
                <h2
                  className={`whitespace-nowrap text-xl font-bold text-gray-300 md:text-3xl ${
                    typingComplete ? "border-r-0" : "border-r-2 border-cyan-400"
                  } pr-1`}
                >
                  Front End Web Developer
                </h2>
              </div>
              <div className="absolute -bottom-2 left-0 h-1 w-20 origin-left transform animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"></div>
            </div>

            <p className="mb-10 max-w-lg text-lg leading-relaxed text-gray-400 transition-colors duration-300 hover:text-gray-300">
              I craft beautiful, interactive web experiences that bring ideas to
              life. Passionate about clean code and stunning design that makes a
              difference.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleViewWork}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </button>

              <button
                onClick={handleContact}
                className="group relative overflow-hidden rounded-full border-2 border-cyan-400 px-8 py-4 font-semibold text-cyan-400 transition-all duration-300 hover:scale-105 hover:bg-cyan-400 hover:text-slate-900 hover:shadow-2xl hover:shadow-cyan-400/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Let's Connect
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h3a1 1 0 011 1v2h3a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h2z"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Social links */}
            <div className="mt-8 flex gap-4">
              {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                <button
                  key={social}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 text-gray-400 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-400"
                >
                  <span className="text-xs font-medium">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="flex max-w-lg flex-1 items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl"></div>
              <div className="relative transition-transform duration-500 hover:scale-105">
                <Illustration />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce text-gray-400">
          <div className="flex cursor-pointer flex-col items-center gap-2 transition-colors duration-300 hover:text-cyan-400">
            <span className="text-sm">Scroll Down</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        <style jsx>{`
          .typewriter h2 {
            animation: typing 3.5s steps(40, end);
          }

          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
        `}</style>
      </div>
    </HelmetProvider>
  );
}

export default Home;

{
  /* <Link
className=" border-2 border-black px-4 py-3 font-medium   md:px-12 md:text-xl"
to={`${"/projects"}`}
>
View Work
</Link>
<Link
className="  border-2 border-black px-4 py-3 font-medium   md:px-12 md:text-xl"
to={`${"/contact"}`}
>
Contact Me
</Link> */
}
