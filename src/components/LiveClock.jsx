import { useState, useEffect } from "react";

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="hidden lg:flex flex-col items-start font-mono">
      <span className="text-textColor text-sm font-black tracking-tight leading-none uppercase">
        {formatTime(time)}
      </span>
      <span className="text-textColor/40 text-[9px] font-bold mt-1 uppercase tracking-[0.2em]">
        {formatDate(time)}
      </span>
    </div>
  );
}

export default LiveClock;
