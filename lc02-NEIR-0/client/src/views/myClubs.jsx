import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CardClubs from "../component/cardClubs";
import Swal from "sweetalert2";

function MyClubs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    dataClubs();
  }, []);

  const dataClubs = async () => {
    try {
      // console.log("object <<<<<<");
      const { data } = await axios.get("https://api.p2.lc2s5.foxhub.space/myclubs", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      // console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const deletedId = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.delete("https://api.p2.lc2s5.foxhub.space/myclubs/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      console.log(data);
      dataClubs();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      {data &&
        data.map((el) => {
          return (
            <CardClubs
              // key={el.Club.id}
              data={el}
              deletedId={deletedId}
            />
          );
        })}
    </>
  );
}

export default MyClubs;
