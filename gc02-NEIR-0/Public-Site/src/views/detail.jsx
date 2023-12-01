import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// url
import { local } from "../../url/constant";
import { live } from "../../url/constant";

function DetailPublic() {
  const params = useParams();
  console.log(params);
  const [find, setFind] = useState(null);
  console.log(find);

  useEffect(() => {
    getDataArticles();
  }, []);

  const getDataArticles = async () => {
    try {
      // const { data } = await axios.get(`${local}/pub/articles/` + params.id); // development
      const { data } = await axios.get(`${live}/pub/articles/` + params.id); // productions
      // console.log(data.article);

      setFind(data.article); // di set
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
    <>
      <section className="w-full h-screen flex bg-white relative">
        {/* shape */}
        <div className="w-[50%] h-full bg-white absolute left-0 top-0 z-20 -skew-x-12"></div>
        {/* img */}
        <div className="w-[60%] h-full  absolute top-0 right-0">
          <img src={find && find.imgUrl} alt={find && find.imgUrl} className="w-full h-full" />
        </div>
        <div className="w-fit h-fit rounded-lg backdrop-blur-lg bg-opacity-200 absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 z-30 shadow-lg p-5">
          <h1 className="text-[40px]">{find && find.title}</h1>
          <p className="text-[20px] my-4">{find && find.content}</p>
          <Link to="/" className="bg-blue-400 hover:bg-sky-300 transition-all ease-in-out duration-300 text-white px-10 py-3 rounded-sm cursor-pointer">
            back
          </Link>
        </div>
      </section>
    </>
  );
}

export default DetailPublic;
