import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../component/card";
import Swal from "sweetalert2";

function Home() {
  const navigate = useNavigate();
  const [hero, setHero] = useState([]);
  useEffect(() => {
    listCard();
  }, []);
  const listCard = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/heroes", {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      //   console.log(data);
      setHero(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
  // console.log(hero);

  const addFavoriter = async (id) => {
    // console.log("click", id);
    try {
      const heroes = await axios.get("http://localhost:3000/favourites", {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      // console.log(heroes.data);
      for (let i = 0; i < heroes.data.length; i++) {
        const el = heroes.data[i];
        // console.log(el.hero);
        if (el.hero.id === +id) {
          throw { name: "duplicate" };
          break;
        }
      }
      const { data } = await axios.post(
        "http://localhost:3000/favourites/" + id,
        {},
        {
          headers: {
            access_token: localStorage.access_token,
          },
        }
      );
      // console.log(data);
      navigate("/favourites");
    } catch (error) {
      console.log(error);
      if (error.name === "duplicate") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "you already have one",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    }
  };
  return (
    <>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl tracking-widest text-white text-center uppercase font-bold">
          <span className="block">Choose your Hero</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {hero &&
            hero.map((el) => {
              return <Card key={el.id} data={el} addFavoriter={addFavoriter} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
