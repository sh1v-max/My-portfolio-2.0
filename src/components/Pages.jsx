import { Outlet, useNavigation } from "react-router-dom";

function Pages() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="relative flex-1 overflow-y-auto overflow-x-hidden bg-mainBg custom-scrollbar">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-mainBg/80 backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-accentColor border-t-transparent"></div>
        </div>
      )}

      <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-10">
        <Outlet />
      </section>
    </div>
  );
}

export default Pages;
