import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import "../i18n/config";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
