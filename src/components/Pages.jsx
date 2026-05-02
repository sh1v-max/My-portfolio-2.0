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
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-accentColor border-t-transparent"></div>
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
