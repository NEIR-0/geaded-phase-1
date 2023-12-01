import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BtnSubmit from "../component/btn";
// url
import { local } from "../../url/constant";
import { live } from "../../url/constant";

function Login() {
  const navigate = useNavigate(); // buat redirect
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeInput = (e) => {
    // console.log(e.target); // <input name="email" type="text" class="h-10 w-60">
    const { name, value } = e.target;
    setForm(() => {
      return {
        ...form, // spreate operator
        [name]: value,
      };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      // console.log(form);
      // admin@gmail.com
      // adminajah
      // const { data } = await axios.post(`${local}/login`, form); // development
      const { data } = await axios.post(`${live}/login`, form); // productions
      Swal.fire({
        icon: "succes",
        title: "succes login",
        text: `hello ${form.email}`,
      });

      localStorage.access_token = data.token;
      // console.log(localStorage.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center px-52">
      <div className="w-full h-[80%] rounded-xl flex shadow-md">
        <div className="left w-[60%] h-full rounded-s-xl">
          {/* sticker */}
          <img src="https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="foto" className="w-full h-full rounded-s-xl" />
        </div>
        <div className="right w-[40%] h-fullrounded-e-xl flex flex-col justify-center items-center">
          {/* form */}
          <form onSubmit={submit} className="flex flex-col justify-around h-[400px]">
            {/* title */}
            <div className="text-left">
              <h1 className="text-[30px] text-sky-400">Welcome Back</h1>
              <h1 className="text-[15px] text-sky-400">Login your account here!</h1>
            </div>
            {/* email, password */}
            <ul className="h-[150px] w-full flex flex-col justify-around items-center">
              <li className="flex justify-center items-center">
                <i className="fa-solid fa-user text-[25px] pe-4" />
                <input onChange={changeInput} name="email" type="text" className="h-9 w-60 border border-sky-400 rounded-md outline-none px-3" />
              </li>
              <li className="flex justify-center items-center">
                <i className="fa-solid fa-lock text-[25px] pe-4" />
                <input onChange={changeInput} name="password" type="text" className="h-9 w-60 border border-sky-400 rounded-md outline-none px-3" />
              </li>
            </ul>
            {/* button */}
            <BtnSubmit name={"Login"} />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
