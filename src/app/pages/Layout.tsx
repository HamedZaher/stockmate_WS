import AppSidebar from "../components/controls/Sidebar";
import { Outlet } from "react-router";
import AppHeader from "../components/controls/AppHeader";
export function Layout() {
  return (
    <div className="max-h-screen flex flex-row overflow-hidden">
      <AppSidebar />
      <main className="scrollable-content overflow-auto">
        <AppHeader />
        <Outlet />
      </main>
    </div>
  );
}
