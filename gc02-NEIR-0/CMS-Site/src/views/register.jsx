import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// alert
import Swal from "sweetalert2";
// useable btn
import BtnSubmit from "../component/btn";
// url
import { local } from "../../url/constant";
import { live } from "../../url/constant";

function Register() {
  const navigate = useNavigate(); // buat redirect
  const [form, setForm] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  //   console.log(form);

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
      // await axios.post(`${local}/register` // development
      await axios.post(`${live}/register`, form, {
        // productions
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });

      Swal.fire({
        icon: "succes",
        title: "succes register",
        text: "new staff already register",
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };

  return (
    <section className="w-full h-screen bg-[#FACC15] flex justify-center items-center">
      {/* form */}
      <div className="w-[30%] h-fit bg-white shadow-lg px-10 rounded-lg">
        {/* title */}
        <div className="text-center text-sky-400 mt-10">
          <h1 className="text-[30px] mb-5">Staff Register:</h1>
        </div>
        {/* form */}
        <form onSubmit={submit} className="mb-10">
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              email
            </label>
            <input onChange={changeInput} name="email" type="text" id="email" className="w-full p-2.5 shadow-md rounded-md" placeholder="name@flowbite.com" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              password
            </label>
            <input onChange={changeInput} name="password" type="text" id="password" className="w-full p-2.5 shadow-md rounded-md" placeholder="password..." />
          </div>
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              phone number
            </label>
            <input onChange={changeInput} name="phoneNumber" type="text" id="phoneNumber" className="w-full p-2.5 shadow-md rounded-md" placeholder="088*****" />
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              address
            </label>
            <input onChange={changeInput} name="address" type="text" id="address" className="w-full p-2.5 shadow-md rounded-md" placeholder="jl.kenangan indah..." />
          </div>
          {/* button */}
          <div className="w-full h-fit flex justify-center">
            <BtnSubmit name={"Submit"} />
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
