import { useTranslation } from "react-i18next";
import React from "react";
import {
  inventoryData,
  activityLogs,
  categoryData,
  stockTrendData,
} from "../../data/mockData";
import { t } from "i18next";

import {
  Package,
  TrendingDown,
  ShoppingCart,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
export function Dashboard() {
  const { t } = useTranslation();

  const lowStockItems = inventoryData.filter(
    (item) => item.status === "low-stock" || item.status === "out-of-stock"
  );
  const expiringItems = inventoryData.filter(
    (item) => item.status === "expiring-soon"
  );
  const totalItems = inventoryData.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalValue = totalItems * 12.5; // Mock calculation

  const stats = [
    {
      title: t("dashboard.totalItems"),
      value: totalItems.toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      iconBg: "bg-gradient-to-br from-blue-600 to-blue-700",
    },
    {
      title: t("dashboard.lowStockAlerts"),
      value: lowStockItems.length,
      change: "+3",
      trend: "up",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100/50",
      iconBg: "bg-gradient-to-br from-red-600 to-red-700",
    },
    {
      title: t("dashboard.pendingOrders"),
      value: "8",
      change: "-2",
      trend: "down",
      icon: ShoppingCart,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100/50",
      iconBg: "bg-gradient-to-br from-orange-600 to-orange-700",
    },
    {
      title: t("dashboard.expiringSoon"),
      value: expiringItems.length,
      change: "0",
      trend: "neutral",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100/50",
      iconBg: "bg-gradient-to-br from-yellow-600 to-yellow-700",
    },
  ];
  return (
    <div className="space-y-8 p-2">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t("dashboard.title")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {t("dashboard.subtitle")}
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
          return (
            <div
              key={stat.title}
              className={`${stat.bgColor} rounded-3xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.title}
                  </p>
                  <p className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  {stat.trend !== "neutral" && (
                    <div
                      className={`mt-3 flex items-center gap-1 text-sm font-medium ${
                        stat.trend === "up"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      <TrendIcon className="h-4 w-4" />
                      <span>{stat.change}</span>
                    </div>
                  )}
                </div>
                <div className={`${stat.iconBg} rounded-2xl p-4 shadow-lg`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
