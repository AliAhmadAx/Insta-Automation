import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../App";

function Buttons({ onClick }) {
  const { AddButton } = useContext(ThemeContext);

  return (
    <button
      className="py-2 btn-hover3 dashboard_color px-10 mt-5 md:mt-0 w-full md:w-fit rounded-md text-white"
      onClick={onClick}
    >
      {AddButton}
    </button>
  );
}

export default Buttons;
