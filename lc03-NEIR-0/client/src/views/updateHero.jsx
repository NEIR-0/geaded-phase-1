import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateHero() {
  const navigate = useNavigate();
  const params = useParams();
  const [form, setForm] = useState({
    role: "",
    power: 0,
  });

  const [heroes, setHero] = useState({});
  useEffect(() => {
    findHero();
  }, []);
  const findHero = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/favourites", {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      //   console.log(data);
      for (let i = 0; i < data.length; i++) {
        const el = data[i];
        // console.log(el.hero);
        if (el.id === +params.id) {
          setForm({
            role: el.role,
            power: el.power,
          });
          setHero(el.hero);
          break;
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const inputUser = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submitUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3000/favourites/" + params.id, form, {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      //   console.log(data);
      navigate("/favourites");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
  // console.log(form);
  console.log(heroes);

  return (
    <>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl tracking-widest text-white text-center uppercase font-bold">
          <span className="block">Update Hero</span>
        </h2>
        <div className="mt-10 grid grid-cols-10">
          <div className="col-start-2 col-span-3">
            <img src={heroes && heroes.imageUrl} className="w-full h-full object-center object-cover opacity-70 group-hover:opacity-100 rounded-md" />
          </div>
          <div className="col-start-6 col-span-4">
            <div className="card px-10 py-5 sm:px-20 sm:py-10 rounded-md">
              <form className="mt-6 mb-6 space-y-6" onSubmit={submitUser}>
                <div className="mb-5">
                  <label for="power-update" className="sr-only">
                    Power
                  </label>
                  <input
                    onChange={inputUser}
                    value={form && form.power}
                    name="power"
                    id="power-update"
                    type="text"
                    autoComplete="off"
                    required
                    className="block w-full px-3 py-2 border rounded-sm text-purple-900 focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-lg tracking-wider"
                    placeholder="Power (ex: 2200)"
                  />
                </div>
                <div>
                  <label for="role-update" className="sr-only">
                    Role
                  </label>
                  <select
                    id="role-update"
                    className="block w-full px-3 py-2 border rounded-sm text-purple-900 focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-lg tracking-wider"
                    name="role"
                    onChange={inputUser}
                    value={form && form.role}
                  >
                    <option value="-" disabled>
                      -- Select Role --
                    </option>
                    <option value="Jungler">Jungler</option>
                    <option value="Roamer">Roamer</option>
                    <option value="Mid Laner">Mid Laner</option>
                    <option value="Gold Laner">Gold Laner</option>
                    <option value="Exp Laner">Exp Laner</option>
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-sm text-purple-900 bg-white bg-opacity-90 hover:bg-white hover:bg-opacity-80 focus:outline-none focus:ring focus:border-purple-500 focus:ring-purple-500 text-lg tracking-wider font-bold"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateHero;
