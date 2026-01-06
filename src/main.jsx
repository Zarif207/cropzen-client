import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Router/Routes.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { RouterProvider } from "react-router";

const theme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", theme);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);