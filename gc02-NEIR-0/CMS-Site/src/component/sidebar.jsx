import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
function SideBar() {
  const { pathname } = useLocation();
  console.log(pathname);
  const removeToken = () => {
    localStorage.clear();
  };

  // style
  const firstStyle = "flex items-center justify-end py-3 pe-6  group-hover:pe-12 transition-all ease-in-out duration-300 text-black hover:text-white hover:bg-[#FACC15]";
  const firstStyleActive = "flex items-center justify-end py-3 pe-6 group-hover:pe-12 transition-all ease-in-out duration-300 text-white bg-[#FACC15]";
  const secondStyle = "flex items-center justify-end py-3 pe-7  group-hover:pe-12 transition-all ease-in-out duration-300 text-black hover:text-white hover:bg-[#FACC15]";
  const secondStyleActive = "flex items-center justify-end py-3 pe-7 group-hover:pe-12 transition-all ease-in-out duration-300 text-white bg-[#FACC15]";

  return (
    <>
      {/* side bar */}
      <div
        className="w-[15%] h-screen bg-[#18559D] fixed 
      -left-[10%] hover:left-0 transition-all duration-300 ease-in-out group
      "
      >
        {/* logo */}
        <div className="w-full h-20 flex justify-center items-center">
          <img
            src="https://img.freepik.com/free-photo/psychedelic-paper-shapes-with-copy-space_23-2149378246.jpg?w=900&t=st=1699664689~exp=1699665289~hmac=38d3a80fa5ade76e7834baa361f59739d8790e2e4bb07511524d6dfdeaef93db"
            alt="test"
            className="w-full h-full"
          />
        </div>
        <ul className=" h-[100px]">
          <Link to="/dashboard">
            <li className={pathname === "/dashboard" ? firstStyleActive : firstStyle}>
              <h2 className="text-[23px] me-5">articles</h2>
              <i className="fa-solid fa-house text-[23px]" />
            </li>
          </Link>
          <Link to="category">
            <li className={pathname === "/dashboard/category" ? secondStyleActive : secondStyle}>
              <h2 className="text-[23px] me-5">category</h2>
              <i class="fa-solid fa-tags text-[23px]"></i>
            </li>
          </Link>
          <Link to="register">
            <li className={pathname === "/dashboard/register" ? secondStyleActive : secondStyle}>
              <h2 className="text-[23px] me-5">register</h2>
              <i className="fa-solid fa-user text-[23px]" />
            </li>
          </Link>
          <Link onClick={removeToken} to="/login">
            <li className={pathname === "/login" ? firstStyleActive : firstStyle}>
              <h2 className="text-[23px] me-5">Logout</h2>
              <i class="fa-solid fa-door-open text-[23px]"></i>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
