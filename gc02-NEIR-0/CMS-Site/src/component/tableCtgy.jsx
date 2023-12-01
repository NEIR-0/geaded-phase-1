function TablesCategories({ data }) {
  return (
    <>
      <tr className="bg-white border-b ">
        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{data && data.id}</th>
        <td className="px-6 py-4 ont-medium text-gray-900 whitespace-nowrap text-center">{data && data.name}</td>
      </tr>
    </>
  );
}

export default TablesCategories;
