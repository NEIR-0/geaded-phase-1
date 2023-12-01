function BtnSubmit({ name }) {
  console.log(name);
  return (
    <>
      <button type="submit" className="bg-sky-400 hover:bg-sky-300 transition-all ease-in-out duration-300 text-white px-10 py-2 rounded-md">
        {name}
      </button>
    </>
  );
}

export default BtnSubmit;
