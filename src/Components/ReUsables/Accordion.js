import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../App";
import { BsChevronDown, BsChevronUp, BsCircle } from "react-icons/bs";
import ApiURL from "../../Config/Config";
import { FaCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

function EditCourseAccordion() {
  const [Accord, setAccord] = useState(0);

  const { DarkMode } = useContext(ThemeContext);

  const toggle = () => {
    if (Accord === 1) {
      return setAccord(null);
    }
    setAccord(1);
  };

  const toggle2 = () => {
    if (Accord === 2) {
      return setAccord(null);
    }
    setAccord(2);
  };

  const toggle3 = () => {
    if (Accord === 3) {
      return setAccord(null);
    }
    setAccord(3);
  };

  const toggle4 = () => {
    if (Accord === 4) {
      return setAccord(null);
    }
    setAccord(4);
  };

  return (
    <div className="wrapper flex flex-col space-y-5 w-full items-center">
      {/* Accordion 1  */}
      <div
        onClick={() => toggle()}
        style={
          DarkMode === true && Accord === 1
            ? {
                backgroundColor: "var(--bg-fill5)",
                color: "var(--txtColor2)",
              }
            : {
                border: "1px solid gray",
                color: "var(--txtColor2)",
              }
        }
        className="w-11/12 border-2 cursor-pointer bg-gray-900 rounded-md py-3 px-5 flex flex-col justify-center"
      >
        <div className="w-full flex space-x-5 items-center justify-between">
          <div className="flex flex-row items-center">
            <span >{Accord === 1 ? <AiFillCloseCircle /> : <FaCircle />}</span>
            <h2 className="ml-5">What is Instagram Automation?</h2>
          </div>
          <span>{Accord === 1 ? <BsChevronUp /> : <BsChevronDown />}</span>
        </div>

        <div
          className={Accord === 1 ? "pt-5 pb-2" : "max-h-0 overflow-hidden "}
        >
          <h3 className="text-xs text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            quibusdam nemo eligendi? Dolorum atque, doloremque officiis amet
            necessitatibus ut expedita aperiam ipsa, a inventore impedit cumque
            consequuntur deleniti qui quae.
          </h3>
        </div>
      </div>

      {/* Accordion 2  */}
      <div
        onClick={() => toggle2()}
        style={
          DarkMode === true && Accord === 2
            ? {
                backgroundColor: "var(--bg-fill5)",
                color: "var(--txtColor2)",
              }
            : {
                border: "1px solid gray",
                color: "var(--txtColor2)",
              }
        }
        className="w-11/12 border-2 cursor-pointer bg-gray-900 rounded-md py-3 px-5 flex flex-col justify-center"
      >
        <div className="w-full flex space-x-5 items-center justify-between">
          <div className="flex flex-row items-center">
            <span>{Accord === 2 ? <AiFillCloseCircle /> : <FaCircle />}</span>
            <h2 className="ml-5">Purpose of Instagram Automation?</h2>
          </div>
          <span>{Accord === 2 ? <BsChevronUp /> : <BsChevronDown />}</span>
        </div>

        <div
          className={Accord === 2 ? "pt-5 pb-2" : "max-h-0 overflow-hidden "}
        >
          <h3 className="text-xs text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            quibusdam nemo eligendi? Dolorum atque, doloremque officiis amet
            necessitatibus ut expedita aperiam ipsa, a inventore impedit cumque
            consequuntur deleniti qui quae.
          </h3>
        </div>
      </div>

      {/* Accordion 3  */}
      <div
        onClick={() => toggle3()}
        style={
          DarkMode === true && Accord === 3
            ? {
                backgroundColor: "var(--bg-fill5)",
                color: "var(--txtColor2)",
              }
            : {
                border: "1px solid gray",
                color: "var(--txtColor2)",
              }
        }
        className="w-11/12 border-2 cursor-pointer bg-gray-900 rounded-md py-3 px-5 flex flex-col justify-center"
      >
        <div className="w-full flex space-x-5 items-center justify-between">
          <div className="flex flex-row items-center">
            <span>{Accord === 3 ? <AiFillCloseCircle /> : <FaCircle />}</span>
            <h2 className="ml-5">Bennefits of Instagram Automation?</h2>
          </div>
          <span>{Accord === 3 ? <BsChevronUp /> : <BsChevronDown />}</span>
        </div>

        <div
          className={Accord === 3 ? "pt-5 pb-2 " : "max-h-0 overflow-hidden "}
        >
          <h3 className="text-xs text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            quibusdam nemo eligendi? Dolorum atque, doloremque officiis amet
            necessitatibus ut expedita aperiam ipsa, a inventore impedit cumque
            consequuntur deleniti qui quae.
          </h3>
        </div>
      </div>

      {/* Accordion 4  */}
      <div
        onClick={() => toggle4()}
        style={
          DarkMode === true && Accord === 4
            ? {
                backgroundColor: "var(--bg-fill5)",
                color: "var(--txtColor2)",
              }
            : {
                border: "1px solid gray",
                color: "var(--txtColor2)",
              }
        }
        className="w-11/12 border-2 cursor-pointer bg-gray-900 rounded-md py-3 px-5 flex flex-col justify-center"
      >
        <div className="w-full flex space-x-5 items-cente justify-between">
        <div className="flex flex-row items-center">
            <span>{Accord === 4 ? <AiFillCloseCircle /> : <FaCircle />}</span>
            <h2 className="ml-5">Why Instagram Automation?</h2>
          </div>
          <span>{Accord === 4 ? <BsChevronUp /> : <BsChevronDown />}</span>
        </div>

        <div
          className={Accord === 4 ? "pt-5 pb-2 " : "max-h-0 overflow-hidden "}
        >
          <h3 className="text-xs text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            quibusdam nemo eligendi? Dolorum atque, doloremque officiis amet
            necessitatibus ut expedita aperiam ipsa, a inventore impedit cumque
            consequuntur deleniti qui quae.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default EditCourseAccordion;
