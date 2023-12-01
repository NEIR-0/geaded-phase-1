// react-route-doom
import { Outlet } from "react-router-dom";

// component
import SideBar from "../component/sidebar";

function MainCms() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}

export default MainCms;
