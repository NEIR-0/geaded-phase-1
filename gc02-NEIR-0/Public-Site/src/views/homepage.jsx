import { useEffect, useState } from "react";
// component
import Card from "../component/card";
import axios from "axios";
import Swal from "sweetalert2";
// url
import { local } from "../../url/constant";
import { live } from "../../url/constant";
import Descriptions from "../component/des";

function Home() {
  const [articles, setArticles] = useState();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("id");
  const [directions, setDirections] = useState("asc");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    // console.log(sort, directions);
    getDataArticles();
  }, [search, directions, page, category]); // taro search

  const getDataArticles = async () => {
    try {
      // console.log(search);
      const options = {
        params: {},
      };
      if (search) {
        // console.log(params.params);
        options.params.filter = search;
      }
      if (directions) {
        // console.log(params.params);
        options.params.sort = sort;
        options.params.directions = directions;
      }
      if (page) {
        // console.log(params.params);
        options.params.page = page;
        options.params.size = size;
      }
      if (category) {
        // console.log(params.params);
        options.params.categories = category;
      }

      // console.log(options);
      // const { data } = await axios.get(`${local}/pub/articles`, options); // development
      const { data } = await axios.get(`${live}/pub/articles`, options); // productions
      // console.log(data.article);
      // console.log(data.article.length, size, data.article.length / size);

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

  const inputCtgy = (e) => {
    // console.log(e.target.value);
    setCategory(e.target.value);
  };

  return (
    <>
      <section className="background w-full h-screen mt">
        <div className="left w-[40%] h-screen bg-white flex justify-center items-center">
          <div className="flex-col">
            <h1 className="text-[60px] font-bold">local News</h1>
            <p className="text-[15px]">"Reporting Latest Events in Your Local Environment""</p>
            <a href="#cardList">
              <button className="mt-10 bg-sky-400 py-3 px-7 rounded-lg text-white hover:bg-sky-500 transition-all duration-300 ease-in-out">check now</button>
            </a>
          </div>
        </div>
      </section>
      <Descriptions />
      <section className="w-full h-fit p-10" id="cardList">
        <div className="search w-full h-16  px-5 mb-5">
          {/* filter */}
          <div className="h-full flex justify-center items-center">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              className="h-10 w-[500px] rounded-s-md shadow-md outline-none px-3"
              placeholder="Search articles.."
            />
            <i className="fa-solid fa-magnifying-glass py-3 px-4 bg-sky-300 shadow-md rounded-e-md h-10 leading-none text-white" />

            {/* sort */}
            <div className="flex w-32 h-10 bg-sky-300 ms-5 items-center justify-evenly text-white rounded-md shadow-md">
              <h1 className="">SORT: </h1>
              <i
                onClick={() => {
                  setDirections("desc");
                }}
                className="fa-solid fa-play rotate-90"
              />
              <i
                onClick={() => {
                  setDirections("asc");
                }}
                className="fa-solid fa-play -rotate-90"
                value="desc"
              />
            </div>
            {/* category */}
            <select onChange={inputCtgy} className="ms-5 w-40 h-10 px-3 shadow-md text-sky-400 outline-none">
              <option value="">Select</option>
              <option value="fashion">fashion</option>
              <option value="education">education</option>
              <option value="entertainment">entertainment</option>
              <option value="sport">sport</option>
              <option value="daily stuff">daily stuff</option>
            </select>
          </div>
        </div>
        {/* card */}
        <section className="flex justify-center gap-5 flex-wrap">
          {articles &&
            articles.map((el) => {
              return <Card key={el.id} data={el} />; // pake key
            })}
        </section>

        {/* next/previous buttom */}
        <div className="flex justify-center items-center mt-7">
          <button
            onClick={() => {
              setPage(page - 1);
              console.log(page);
            }}
            disabled={page === 1 ? true : false}
            className="px-7 py-2 rounded-sm bg-blue-400 hover:bg-sky-300 transition-all ease-in-out duration-300 text-white shadow-lg mr-4"
          >
            prev
          </button>
          <h1 className="ms-3 me-8 text-sky-500">{page}</h1>
          <button
            onClick={() => {
              setPage(page + 1);
              console.log(page);
            }}
            className="px-8 py-2 rounded-sm bg-blue-400 hover:bg-sky-300 transition-all ease-in-out duration-300 text-white shadow-lg"
          >
            next
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
