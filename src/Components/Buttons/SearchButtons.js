import React from "react";
import { useContext } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { ThemeContext } from "../../App";

function SearchButtons({ onClick, type }) {
  const { SearchButton } = useContext(ThemeContext);

  return (
    <button
      style={{
        background: "var(--bg-fill4)",
      }}
      className="text-white btn-hover3 px-4 rounded-r border-gray-400"
      onClick={onClick}
      type={type}
    >
      {SearchButton}
      <GoSearch />
    </button>
  );
}

export default SearchButtons;
