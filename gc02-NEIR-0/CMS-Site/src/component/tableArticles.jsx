import { Link } from "react-router-dom";

function TablesArticles({ data, deleteId }) {
  return (
    <>
      <tr className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {data && data.id}
        </th>
        <td className="px-6 py-4">{data && data.title}</td>
        <td className="px-6 py-4">{data && data.content}</td>
        <td className="px-6 py-4">
          <img className="w-[200px]" src={data.imgUrl} alt={data.imgUrl} />
        </td>
        <td className="flex w-[150px] h-[200px] justify-evenly flex-col items-center">
          <Link to={`edit/${data.id}`} className="font-medium text-white bg-blue-500 rounded-[5px] px-11 py-2 transition-all duration-300 ease-in-out hover:bg-blue-600">
            edit
          </Link>
          <button onClick={() => deleteId(data.id)} className="font-medium text-white bg-red-500 rounded-[5px] px-9 py-2 transition-all duration-300 ease-in-out hover:bg-red-600">
            delete
          </button>
          <Link to={`update/${data.id}`} className="font-medium text-white bg-yellow-400 rounded-[5px] px-3 py-2 transition-all duration-300 ease-in-out hover:bg-yellow-300">
            upload imgurl
          </Link>
        </td>
      </tr>
    </>
  );
}

export default TablesArticles;
