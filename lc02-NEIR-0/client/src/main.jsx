import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css"; // kalo pake tailwinds harus import index.css

import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import RegisterPage from "./views/register.jsx";
import LoginPage from "./views/login.jsx";
import Clubs from "./views/clubs.jsx";
import MyClubs from "./views/myClubs.jsx";
import UpdateClub from "./views/updateClub.jsx";

const auth = () => {
  if (!localStorage.token) {
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
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <Clubs />,
        loader: auth,
      },
      {
        path: "/myclubs/:ClubId", // club
        element: <MyClubs />,
        loader: auth,
      },
      {
        path: "/myclubs/:id", // user
        element: <MyClubs />,
        loader: auth,
      },
      {
        path: "/my-clubs",
        element: <MyClubs />,
        loader: auth,
      },
      {
        path: "/update-club/:myClubId",
        element: <UpdateClub />,
        loader: auth,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
