import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/Home.jsx";
import Dashboard from "./dashboard/index.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Signin from "./auth/signin/index.jsx";
import Header from "./components/custom/Header.jsx";
import EditResume from "./dashboard/resume/[resumeId]/edit/index.jsx";
import ViewResumeInfo from "./my-resumes/[resumeId]/view/ViewResume.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/auth/sign-in",
    element: <Signin />,
  },
  {
    path: "/my-resumes/:resumeId/view",
    element: <ViewResumeInfo />
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
