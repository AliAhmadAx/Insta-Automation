import React from "react";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../App";
import { AiFillFire, AiFillGift, AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import dataext from "../../Assets/Images/Data-ext.png";
import { BiSearch } from "react-icons/bi";

function HeroSection() {
  let navigate = useNavigate();
  const { DarkMode, setHeaderShow } = useContext(ThemeContext);
  const [searchUsers, setSearchUser] = useState("");
  return (
    <section>
      <div className="w-full flex flex-col lg:flex-col dashboard_color md:justify-center text-center h-[85vh] pb-20 lg:pb-0">
        {/* <div className='flex flex-row'> */}

        <form
          className="w-full flex items-center h-[10vh]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-full justify-center flex flex-row">
            <input
              type="search"
              value={searchUsers}
              onChange={(e) => {
                  setSearchUser(e.target.value);
                //   if (e.target.value === "") {
                //     setTableData(tempData2);
                //     setTotalPages(tempData.pages);
                //     setTotalRecords(tempData.total_records);
                //   }
              }}
              className="w-[30%] rounded-l-full text-black px-5 h-[6vh]"
              required="required"
              placeholder="Search Here"
            />

            <button className="flex flex-row items-center border-2 px-2 hover:bg-black hover:text-white border-white cursor-pointer rounded-r-full">
              Search
            </button>
          </div>
        </form>
        <div className="text-center justify-center flex flex-col w-full">
            
        <h1 className="text-5xl mt-5">Data to enrich your online business</h1>
        <p className="px-72 mt-5">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
        </div>
        <div className="w-full flex flex-col items-center lg:flex-row lg:justify-center lg:space-x-5">
        <button
                style={
                  DarkMode === true
                    ? {
                      color: "var(--bg-fill4)",
                      backgroundColor: "var(--bg-fill2)",
                    }
                    : {
                      color: "var(--txtColor2)",
                      backgroundColor: "var(--btn-bgColor1)",
                    }
                }
                className={
                  DarkMode === true
                    ? "px-10 py-4 lg:px-6 lg:py-3 mt-8 w-fit flex items-center btn-hoverDark rounded-md"
                    : "px-10 py-4 lg:px-6 lg:py-3 mt-8 w-fit flex items-center btn-hover4 rounded-md"
                }
                onClick={() => navigate("/pricing")}
              >
                <AiFillFire
                  size="1.3em"
                  color={DarkMode === true ? "var(--bg-fill4)" : "orange"}
                  className="mr-2 self-center"
                />
                Get Started
              </button>

              <button
                style={
                  DarkMode === true
                    ? {
                      color: "var(--bg-fill4)",
                      backgroundColor: "var(--btn-bgColor1)",
                    }
                    : {
                      color: "var(--btn-bgColor1)",
                      backgroundColor: "var(--txtColor2)",
                    }
                }
                className={
                  DarkMode === true
                    ? "px-10 py-4 lg:px-6 lg:py-3 mt-8 flex items-center btn-hover2 rounded-md"
                    : "px-10 py-4 lg:px-6 lg:py-3 mt-8 flex items-center btn-hover3 hover:border-2 hover:border-white rounded-md"
                }
                onClick={() => navigate("/pricing")}
              >
                <AiFillFire
                  size="1.3em"
                  color={DarkMode === true ? "var(--bg-fill4)" : "orange"}
                  className="mr-2 self-center "
                />
                View Plans
              </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
