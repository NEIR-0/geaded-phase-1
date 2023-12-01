import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateClub() {
  const { myClubId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    imageUrl: "",
    title: "",
    description: "",
  });
  console.log(form);

  const inputUser = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      console.log("massuk <<<<<<<");

      console.log("https://api.p2.lc2s5.foxhub.space/clubs/" + myClubId);
      const { data } = await axios.put("https://api.p2.lc2s5.foxhub.space/clubs/" + myClubId, form, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      console.log(data);
      navigate("/my-clubs");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={updateData}>
        <ul>
          <li>
            <input type="text" name="imageUrl" onChange={inputUser} />
          </li>
          <li>
            <input type="text" name="title" onChange={inputUser} />
          </li>
          <li>
            <input type="text" name="description" onChange={inputUser} />
          </li>
        </ul>
        <button>submit</button>
      </form>
    </>
  );
}

export default UpdateClub;
