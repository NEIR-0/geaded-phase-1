import { useState } from "react";
import { Link } from "react-router-dom";

function CardList({ data, addClubs }) {
  
  return (
    <>
      <div className="bg-yellow-500 w-[200px]">
        <h1 className="text-yellow-300">{data && data.imageUrl}</h1>
        <h1>{data && data.title}</h1>
        <h1>{data && data.description}</h1>

        <button
          onClick={() => {
            addClubs(data.id);
          }}
        >
          join
        </button>
      </div>
    </>
  );
}

export default CardList;
