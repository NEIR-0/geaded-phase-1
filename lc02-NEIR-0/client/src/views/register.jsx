import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
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
      // console.log("masu <<<<<<<");
      const { data } = await axios.post("https://api.p2.lc2s5.foxhub.space/register", form);
      // console.log(data)
    } catch (error) {
      console.log(error);
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
      <form onSubmit={submitForm}>
        <ul>
          <li>
            <input type="text" name="fullName" onChange={inputUser} />
          </li>
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

export default RegisterPage;
