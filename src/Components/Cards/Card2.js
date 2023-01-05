import React from "react";

function Card2({ type, count }) {
  return (
    <div className="w-full bg-gray-100 space-y-1 shadow-lg flex flex-col justify-center px-5 py-3 text-sm rounded-md">
      <h5 className="font-bold">
        TYPE:{" "}
        <span className="ml-1 text-red-500 text-xs font-bold">{type}</span>
      </h5>

      <h3>
        Count: <span className="ml-1 text-red-500 font-bold">{count}</span>
      </h3>
    </div>
  );
}

export default Card2;
