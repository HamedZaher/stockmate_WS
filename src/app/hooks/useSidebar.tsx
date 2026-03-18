import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileBarChart,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
const useSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  const { t } = useTranslation();
  const navigation = [
    { name: t("nav.dashboard"), href: "/", icon: LayoutDashboard },
    { name: t("nav.inventory"), href: "/inventory", icon: Package },
    { name: t("nav.orders"), href: "/orders", icon: ShoppingCart },
  ];
  return {
    navigation,
    isActive,
    isSidebarOpen,
    setIsSidebarOpen,
    isHidden,
    setIsHidden,
  };
};

export default useSidebar;
