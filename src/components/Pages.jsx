import { Outlet, useNavigation } from "react-router-dom";

function Pages() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="relative flex-1 overflow-hidden bg-mainBg">
      {/* Fixed Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Subtle grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--textColor) 1px, transparent 1px), linear-gradient(90deg, var(--textColor) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Scrolling Content Layer */}
      <div className="absolute inset-0 z-10 flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-mainBg/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 text-sm font-mono text-accentColor">
                <span className="h-4 w-2 bg-accentColor animate-pulse" />
                <span className="animate-pulse">Resolving workspace data...</span>
              </div>
              <div className="h-[2px] w-48 overflow-hidden rounded-full bg-explorerBorder">
                <div className="h-full w-1/3 animate-[translateX_1.5s_ease-in-out_infinite] rounded-full bg-accentColor relative -left-1/3" />
              </div>
            </div>
            <style>{`
              @keyframes translateX {
                0% { transform: translateX(0); }
                50% { transform: translateX(400%); }
                100% { transform: translateX(0); }
              }
            `}</style>
          </div>
        )}

        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Pages;
