import React from "react";

function Card({ PopularViolationsType }) {
  return (
    <div className="w-full bg-gray-100 space-y-3 shadow-lg flex flex-col justify-center px-5 h-52 py-5 text-sm rounded-md">
      <h1 className="font-bold text-lg">POPULAR VIOLATIONS TYPE</h1>
      <h3 className="">
        Violation Type:{" "}
        <span className="ml-1 text-red-500 font-bold">
          {PopularViolationsType.violation_type}
        </span>
      </h3>
      <h3>
        Count:{" "}
        <span className="ml-1 text-red-500 font-bold">
          {PopularViolationsType.count}
        </span>
      </h3>
    </div>
  );
}

export default Card;
