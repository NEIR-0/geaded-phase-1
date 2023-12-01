import { useState } from "react";
import { Link } from "react-router-dom";

function CardClubs({ data, deletedId }) {
  return (
    <>
      <div className="">
        <h1 className="">{data && data.Club.imageUrl}</h1>
        <h1>{data && data.Club.title}</h1>
        <h1>{data && data.Club.description}</h1>

        <button
          onClick={() => {
            deletedId(data.id);
          }}
        >
          leave
        </button>
        <Link to={`/update-club/${data.id}`}>update</Link>
      </div>
    </>
  );
}

export default CardClubs;
