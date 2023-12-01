import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <nav className="py-3 bg-purple-900 navbar-color">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white text-2xl uppercase font-bold">Hacktiv Legends</span>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4 align-middle font-bold">
              <Link to={"/"} className="text-white opacity-80 text-md uppercase hover:opacity-100 px-3 py-2">
                Home
              </Link>
              <Link to={"/favourites"} className="text-white opacity-80 text-md uppercase hover:opacity-100 px-3 py-2">
                Favourites
              </Link>
              <button onClick={logout} className="text-white opacity-80 text-md uppercase hover:opacity-100 px-3 py-2">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
