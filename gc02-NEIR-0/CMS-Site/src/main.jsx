import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// react-router-doom
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom"; // pake redirect

// views
import AddImgUrl from "./views/addImgUrl";
import DashboardArticles from "./views/dashboardArticles";
import EditAdd from "./views/editAdd";
import Login from "./views/login";
import MainCms from "./views/mainCms";
import DashboardCategories from "./views/dashboardCtgy";
import Register from "./views/register";

const unauthorized = () => {
  if (!localStorage.access_token) {
    return redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <MainCms />,
        children: [
          {
            path: "",
            element: <DashboardArticles />,
          },
          {
            path: "create",
            element: <EditAdd name={"create"} />,
          },
          {
            path: "edit/:id",
            element: <EditAdd name={"edit"} />,
          },
          {
            path: "update/:id",
            element: <AddImgUrl />,
          },
          {
            path: "category",
            element: <DashboardCategories />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
        loader: unauthorized,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
