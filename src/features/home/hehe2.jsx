import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Your original Illustration component
function Illustration() {
  return (
    <div className="h-[400px] w-[450px] text-accentColor max-sm:h-[334px] max-sm:w-full">
      <svg
        viewBox="0 0 486 534"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx={167} cy={60} r={60} fill="#D7F484" />
        <circle cx={37.5} cy={215.5} r={37.5} fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M486 144.469c-38.145-31.86-87.255-51.033-140.842-51.033-121.415 0-219.842 98.427-219.842 219.842 0 14.167 1.34 28.02 3.9 41.441 47.414-86.154 91.678-142.17 146.717-170.767 56.069-29.132 121.816-29.08 210.067-6.68v-32.803zm0 48.288v289.33c-38.145 31.86-87.255 51.033-140.842 51.033-100.321 0-184.947-67.197-211.325-159.037l1.502.805c49.937-93.22 94.046-149.844 147.514-177.625 52.014-27.025 114.411-27.498 203.151-4.506z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function Home() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Home</title>
      </Helmet>

      <div className="relative border flex min-h-[75svh] items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Large background text */}
        <div className="absolute left-10 z-10 gap-y-0 text-[12rem] font-extrabold leading-none text-bgText max-sm:hidden">
          <h1 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent opacity-10">I BUILD</h1>
          <h1 className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent opacity-10">PRETTY</h1>
          <h1 className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent opacity-10">WEBSITES</h1>
        </div>

        {/* Main content */}
        <div className="relative z-20 flex flex-col items-center gap-y-10 p-4 md:w-full md:flex-row md:items-center md:justify-between md:px-28">
          <div>
            <h2 className="text-3xl font-bold text-[#eee] md:text-5xl xl:text-8xl mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Shiv Shankar Singh
              </span>
            </h2>
            <div className="typewriter w-max">
              <h2 className="text-xl font-bold text-[#eee] md:text-3xl">
                Front End Web Developer
              </h2>
            </div>
            <Link to="/projects">
              <button className="mt-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2.5 font-medium text-white md:px-9 md:text-xl rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                View Work
              </button>
            </Link>
            <Link to="/contact">
              <button className="ml-3 border-2 border-cyan-400 px-5 py-2 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 md:ml-6 md:px-8 md:text-xl rounded-lg transition-all duration-300 hover:scale-105">
                Contact Me
              </button>
            </Link>
          </div>
          <Illustration />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Home;