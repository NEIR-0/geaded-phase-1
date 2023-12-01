import { Outlet } from "react-router-dom";
import Navbar from "./component/navbar";

function App() {
  return (
    <>
      <Navbar />

      {/* ini childrennya */}
      <Outlet />
    </>
  );
}

export default App;
