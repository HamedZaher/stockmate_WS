import AppSidebar from "../components/controls/Sidebar";
import { Outlet } from "react-router";
import AppHeader from "../components/controls/AppHeader";
export function Layout() {
  return (
    <div className="min-h-screen min-w-screen flex flex-row overflow-hidden">
      <AppSidebar />
      <main className="p-2 scrollable-content  w-full h-screen overflow-auto">
        <AppHeader />
        <Outlet />
      </main>
    </div>
  );
}
