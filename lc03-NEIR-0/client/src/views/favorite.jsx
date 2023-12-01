import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CardFavorite from "../component/cardFavorite";
import Swal from "sweetalert2";

function Favorite({}) {
  const [fav, setFav] = useState([]);
  useEffect(() => {
    listFavorite();
  }, []);
  const listFavorite = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/favourites", {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      console.log(data);
      setFav(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
  console.log(fav);
  return (
    <>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl tracking-widest text-white text-center uppercase font-bold">
          <span className="block">Favourites</span>
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {fav &&
            fav.map((el) => {
              return <CardFavorite key={el.id} data={el} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Favorite;
