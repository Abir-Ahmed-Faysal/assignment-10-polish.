import { RouterProvider } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Router/Router";
import AuthContextProvider from "./Context/AuthContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
