import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <section className="w-full h-12 fixed bg-white shadow-md flex justify-between">
        <div className="w-[200px] h-full  flex justify-center items-center">
          <h1 className="text-sky-400">
            <i class="fa-solid fa-newspaper" />
            Local-News
          </h1>
        </div>
        <div className="w-[150px] h-full  flex justify-around items-center">
          <Link to="https://cms-localnews.nier-zero.my.id/login" className="text-white bg-sky-400 px-9 py-3 hover:bg-sky-500 transition-all duration-300 ease-in-out cursor-pointer">
            sign in
          </Link>
        </div>
      </section>
    </>
  );
}

export default Navbar;
