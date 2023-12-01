import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const inputUser = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    // console.log(name, value);

    setForm({
      ...form,
      [name]: value,
    });
  };
  console.log(form);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      console.log("masu <<<<<<<");
      const { data } = await axios.post("https://api.p2.lc2s5.foxhub.space/login", form);
      //   console.log(data.access_token);
      localStorage.token = data.access_token;
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  // ucupcuk@gmail.com
  // ucup
  return (
    <>
      <form onSubmit={submitForm}>
        <ul>
          <li>
            <input type="text" name="email" onChange={inputUser} />
          </li>
          <li>
            <input type="text" name="password" onChange={inputUser} />
          </li>
        </ul>
        <button>Submit</button>
      </form>
    </>
  );
}

export default LoginPage;
