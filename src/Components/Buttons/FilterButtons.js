import React from "react";
import { useContext } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import { ThemeContext } from "../../App";

function FilterButtons({ onClick }) {
  const { FilterButton } = useContext(ThemeContext);

  return (
    <button
      className="py-3 btn-hover3 px-4 dashboard_color text-lg md:mt-0 w-fit md:w-fit text-white"
      onClick={onClick}
    >
      {FilterButton}
      <AiOutlineFilter />
    </button>
  );
}

export default FilterButtons;
