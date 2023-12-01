import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import CardList from "../component/card";
import Swal from "sweetalert2";

function Clubs() {
  const [club, setClubs] = useState(null);
  const [mineClubs, setCMineClubs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dataClubs();
    myClubs();
  }, []);

  const dataClubs = async () => {
    try {
      //   console.log("test <<<<<<<<<");
      const { data } = await axios.get("https://api.p2.lc2s5.foxhub.space/clubs", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      //   console.log(data);
      setClubs(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const myClubs = async () => {
    try {
      //   console.log("test <<<<<<<<<");
      const { data } = await axios.get("https://api.p2.lc2s5.foxhub.space/myclubs", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      console.log(data);
      setCMineClubs(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  // join club check Duplicate
  const addClubs = async (id) => {
    try {
      // console.log(id);
      for (let i = 0; i < mineClubs.length; i++) {
        const element = mineClubs[i];
        if (element.ClubId === id) {
          throw { name: "duplicate" };
        } else {
          const { data } = await axios.post(
            "https://api.p2.lc2s5.foxhub.space/myclubs/" + id,
            {},
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            }
          );
          // console.log(data);
          navigate("/my-clubs");
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.name,
      });
    }
  };

  return (
    <>
      <h1>Club</h1>
      {club &&
        club.map((el) => {
          //   return `<h1>Club</h1>`;
          return <CardList key={el.id} data={el} addClubs={addClubs} />;
        })}
    </>
  );
}

export default Clubs;
