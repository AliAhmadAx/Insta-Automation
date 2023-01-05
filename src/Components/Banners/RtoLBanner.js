import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../App";
import { AiFillFire, AiFillGift, AiOutlineCheckCircle } from "react-icons/ai";
import feature2 from "../../Assets/Images/feature2.png";
import { useNavigate } from "react-router-dom";

function RtoLBanner({image, number, heading1}) {
  let navigate = useNavigate();
  const { DarkMode } = useContext(ThemeContext);

  return (
    <div>
      {/* More to discover 1 */}
      <section
        style={
          DarkMode === true
            ? {
                color: "var(--txtColor3)",
                backgroundColor: "var(--bg-fill1)",
              }
            : {
                backgroundColor: "var(--bg-fill3)",
              }
        }
        className="lg:pt-10"
      >
        <div className="w-full md:px-20 flex flex-col-reverse lg:flex-row ">
          {/* Left HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex flex-col px-5 lg:px-10">
            {/* SERVICE 1  */}
            <div className="w-full pt-10 lg:pt-0 flex flex-col items-center lg:items-start pb-2">
              {/* icon bg  */}
              <div className="mr-7 dashboard_color py-1 px-1 rounded-full w-fit">
                <p className="px-2 py-1">{number}</p>
              </div>
            </div>

            {/* left or heading side  */}
            <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-start">
              {" "}
              <h2 className="text-xl font-bold py-2">
                {heading1}
              </h2>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aspernatur ea voluptate harum unde alias? Assumenda atque hic
                mollitia? Pariatur, mollitia.
              </p>
              {/* points  */}
              <div className="w-full space-y-2 pt-5">
                {/* point 1  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Unique Design</p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Unlimited Video Call</p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className="px-5 text-gray-500">Add Favorite Contact </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Camera Filter </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Unique Design</p>
                </div>
              </div>
              <button
                style={
                  DarkMode === true
                    ? {
                        color: "var(--bg-fill4)",
                        backgroundColor: "var(--btn-bgColor1)",
                      }
                    : {
                        color: "var(--txtColor2)",
                        backgroundColor: "var(--btn-bgColor1)",
                      }
                }
                className={
                  DarkMode === true
                    ? "px-6 py-3 mt-10 flex items-center btn-hover2 rounded-md"
                    : "px-6 py-3 mt-10 flex items-center btn-hover4 rounded-md"
                }
                onClick={() => navigate("/pricing")}
              >
                <AiFillFire
                  size="1.3em"
                  color={DarkMode === true ? "var(--bg-fill4)" : "orange"}
                  className="mr-2 self-center"
                />
                View Plans
              </button>
            </div>
          </div>

          {/* Right HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <img className="w-11/12 lg:w-5/6" src={image} alt="" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default RtoLBanner
