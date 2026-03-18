import { useCallback, useEffect, useRef, useState } from "react";
import useSidebar from "../../hooks/useSidebar";
import { t } from "i18next";
import { Icon, Package } from "lucide-react";
import { Link } from "react-router";

const AppSidebar = () => {
  const { navigation, isActive, isSidebarOpen, setIsSidebarOpen } =
    useSidebar();
  const handleResize = useCallback(() => {
    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  }, []);
  useEffect(() => {
    addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <aside
      className={` ${
        document.documentElement.dir === "rtl" ? "right-0" : "left-0"
      } top-0 z-40 min-h-full transition-transform ${
        isSidebarOpen ? "w-72" : "w-24"
      } `}
    >
      <div
        className="flex h-full flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 m-4 rounded-3xl shadow-xl ${
          document.documentElement.dir === 'rtl' ? 'border-l' : 'border-r'
        }"
      >
        <div className="flex h-20 items-center justify-center  border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 ">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
              <Package className="h-5 w-5 text-white" />
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="font-semibold text-gray-900 dark:text-white">
                  {t("app.title")}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("app.subtitle")}
                </p>
              </div>
            )}
          </div>
        </div>
        <nav className="flex-1 space-y-2 px-1.5 py-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {isSidebarOpen && (
                  <span className="font-medium">{item.name}</span>
                )}{" "}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
