import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// component
import TablesArticles from "../component/tableArticles";
import Swal from "sweetalert2";
// url
import { local } from "../../url/constant"; // development
import { live } from "../../url/constant"; // productions

function DashboardArticles() {
  const [articles, setArticles] = useState(null);
  console.log(articles);

  useEffect(() => {
    getDataArticles();
  }, []); // taro search

  const getDataArticles = async () => {
    try {
      const { data } = await axios.get(`${live}/articles/`, {
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      console.log(data.article);

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
  // getDataArticles();

  const deleteId = async (id) => {
    try {
      await axios.delete(`${live}/articles/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      getDataArticles();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="w-full h-fit bg-[#FACC15] flex">
      <div className="w-[85%] ms-[14%] p-10">
        {/* title */}
        <h1 className="mb-3 text-[30px] text-white underline">List articles:</h1>
        <Link to={`create`} className="flex justify-evenly items-center w-[100px] h-7 bg-white shadow-lg transition-all duration-200 ease-in-out rounded-sm mb-5 hover:bg-[#18559D] hover:text-white">
          <i class="fa-solid fa-circle-plus"></i>
          Create
        </Link>

        {/* table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  id
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  title
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  content
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  img
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {articles &&
                articles.map((el) => {
                  return <TablesArticles key={el.id} data={el} deleteId={deleteId} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default DashboardArticles;
