import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-yellow-300">nabar</h1>
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Logout
      </button>
      <Link to={`my-clubs`}>my club</Link>
      <Link to={``}>home</Link>
    </>
  );
}

export default Navbar;
