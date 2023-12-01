import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Login from "./views/login.jsx";
import Home from "./views/home.jsx";
import Favorite from "./views/favorite.jsx";
import UpdateHero from "./views/updateHero.jsx";

const authentications = () => {
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
        path: "/",
        element: <Home />,
        loader: authentications,
      },
      {
        path: "/favourites",
        element: <Favorite />,
        loader: authentications,
      },
      {
        path: "/update/:id",
        element: <UpdateHero />,
        loader: authentications,
      },
    ],
  },
]);

const auth = () => {
  if (!localStorage) {
    return redirect("/login");
  }
  return;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
