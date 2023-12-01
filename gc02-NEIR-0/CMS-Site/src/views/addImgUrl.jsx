import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BtnSubmit from "../component/btn";
// url
import { local } from "../../url/constant"; // development
import { live } from "../../url/constant"; // productions

function AddImgUrl() {
  const [img, setImg] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState(null);
  console.log(articles);

  useEffect(() => {
    getDataArticles();
  }, []); // taro search

  const getDataArticles = async () => {
    try {
      const { data } = await axios.get(`${live}/articles/` + params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      // console.log(data.article)
      setArticles(data.article); // di set
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };

  const uploadFile = (e) => {
    console.log(e.target.files[0]); // pake "files[0]"
    setImg(e.target.files[0]);
  };

  const axiosUpload = async (e) => {
    e.preventDefault();
    try {
      // console.log("masuk");
      const formData = new FormData();
      formData.append("imgUrl", img);
      Swal.fire({
        icon: "succes",
        title: "berhasil upload img",
        text: "sabar ya say~ masih loading database, nanti auto ke dashboard",
      });

      await axios.patch(`${live}/articles/` + params.id, formData, {
        // passing bodynya (formData)
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
          "Content-Type": "multipart/form-data",
        },
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
      <form onSubmit={axiosUpload} className="h-[70%] w-[30%] bg-white shadow-lg flex flex-col justify-around p-5 rounded-lg">
        <img src={articles && articles.imgUrl} alt={articles && articles.imgUrl} className="rounded-lg" />
        <p>select:</p>
        <input onChange={uploadFile} type="file" className="bg-white shadow-lg" />
        {/* button */}
        <div className="w-full h-fit text-end">
          <BtnSubmit name={"Submit"} />
        </div>
      </form>
    </section>
  );
}

export default AddImgUrl;
