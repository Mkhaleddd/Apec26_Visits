import { Outlet } from "react-router";
import Header from "./Header";

function AppLayout() {
  return (
    <div
      className="
        min-h-screen 
        px-2 md:px-10 lg:px-48 
        flex flex-col
        bg-white dark:bg-black
        transition-colors duration-500
      "
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
