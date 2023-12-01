import { useState, useEffect } from "react";
import axios from "axios";
// component
import TablesCategories from "../component/tableCtgy";
// url
import { local } from "../../url/constant"; // development
import { live } from "../../url/constant"; // productions

function DashboardCategories() {
  const [categories, setCategories] = useState(null);
  console.log(categories);

  useEffect(() => {
    getDataCategories();
  }, []); // taro search

  const getDataCategories = async () => {
    try {
      const { data } = await axios.get(`${live}/categories/`, {
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      // console.log(data);

      setCategories(data.categories); // di set
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };
  // getDataCategories();
  return (
    <section className="w-full h-screen bg-yellow-400 flex">
      <div className="w-[40%] ms-[14%] p-10">
        {/* title */}
        <h1 className="mb-3 text-[30px] text-white underline">List category:</h1>

        {/* table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  id
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  title
                </th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((el) => {
                  return <TablesCategories key={el.id} data={el} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default DashboardCategories;
