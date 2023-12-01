import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./component/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
