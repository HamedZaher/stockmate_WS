import { createBrowserRouter } from "react-router";
import { Layout } from "../pages/Layout";
import { Dashboard } from "../pages/Dashboard";
import { Inventory } from "../pages/Inventory";
import { Orders } from "../pages/Orders";
import Login from "../pages/Login";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "inventory", Component: Inventory },
      { path: "orders", Component: Orders },
    ],
  },
  {
    path: "login",
    Component: Login,
  },
]);
