import { Outlet, useNavigation } from "react-router-dom";
import Tabs from "./Tabs";

function Pages() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="w-full overflow-x-auto bg-mainBg">
      <Tabs />
      <section className="relative min-h-[85vh] bg-mainBg">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-mainBg bg-opacity-80">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-accentColor border-t-transparent"></div>
          </div>
        )}
        <Outlet />
      </section>
    </div>
  );
}

export default Pages;
