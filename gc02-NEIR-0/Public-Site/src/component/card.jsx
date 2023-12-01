import { Link } from "react-router-dom";
function Card({ data }) {
  return (
    <>
      {/* card */}
      <div className="flex flex-col justify-center items-center">
        <div className="w-[300px] h-full bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-between">
          <img className="p-2 w-full rounded-xl h-[200px]" src={data.imgUrl} />
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{data.title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700">{data.content}</p>
            <Link
              to={`/detail/${data.id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-300 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-300 ease-in-out cursor-pointer"
            >
              Read more
              <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
