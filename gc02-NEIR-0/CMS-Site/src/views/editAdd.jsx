import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import BtnSubmit from "../component/btn";
// url
import { local } from "../../url/constant"; // development
import { live } from "../../url/constant"; // productions

function EditAdd({ name }) {
  const params = useParams();
  console.log(params, "<<<<<<<<<<<<<<");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    imgUrl: "",
    categoryId: "",
  });
  console.log(form);
  const [ctgy, setCtgy] = useState([]);

  useEffect(() => {
    if (params.id) {
      const fetch = async () => {
        try {
          console.log("masuk, >>>>>>>>>>>>");
          const { data } = await axios.get(`${live}/articles/` + params.id, {
            headers: {
              Authorization: "Bearer " + localStorage.access_token,
            },
          });
          console.log(data.article);
          setForm(() => {
            return {
              title: data.article.title,
              content: data.article.content,
              imgUrl: data.article.imgUrl,
              categoryId: data.article.categoryId,
            };
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: error.response.data.message,
          });
        }
      };
      fetch();
    }
  }, [params.id]);

  const inputForm = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);

    setForm((old) => {
      return {
        // jangan lupa return
        ...old, // titiknya ada tiga
        [name]: value, // jangan lupa array
      };
    });
  };

  useEffect(() => {
    dataCtgy();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        await axios.put(`${live}/articles/` + params.id, form, {
          headers: {
            Authorization: "Bearer " + localStorage.access_token,
          },
        });
        Swal.fire({
          icon: "succes",
          title: "succes edit",
          text: "succes edit new articles",
        });
      } else {
        await axios.post(`${live}/articles`, form, {
          headers: {
            Authorization: "Bearer " + localStorage.access_token,
          },
        });
        Swal.fire({
          icon: "succes",
          title: "succes create",
          text: "succes create new articles",
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };

  const dataCtgy = async () => {
    try {
      const { data } = await axios.get(`${live}/categories`, {
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      // console.log(data.categories);
      setCtgy(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="w-full h-screen bg-[#FACC15] flex justify-center items-center">
      {/* form */}
      <div className="w-[30%] h-fit bg-white shadow-lg px-10 rounded-lg">
        <h1 className="text-center text-[40px] mb-5 mt-5 text-sky-500">{name}:</h1>
        {/* form */}
        <form onSubmit={create} className="mb-10">
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              title
            </label>
            <input onChange={inputForm} name="title" type="text" id="title" value={form.title} className="w-full p-2.5 shadow-md rounded-md" placeholder="title.." />
          </div>
          <div className="mb-6">
            <label htmlFor="Content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Content
            </label>
            <input onChange={inputForm} name="content" type="text" id="Content" value={form.content} className="w-full p-2.5 shadow-md rounded-md" placeholder="content..." />
          </div>
          <div className="mb-6">
            <label htmlFor="ImgUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ImgUrl
            </label>
            <input onChange={inputForm} name="imgUrl" type="text" id="ImgUrl" value={form.imgUrl} className="w-full p-2.5 shadow-md rounded-md" placeholder="img url..." />
          </div>
          <div className="mb-6">
            <label htmlFor="Category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <select name="categoryId" id="Category" onChange={inputForm} value={form.categoryId} className="w-full h-10 px-4 shadow-md">
              <option value="">Select</option>
              {ctgy &&
                ctgy.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
            </select>
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

export default EditAdd;
