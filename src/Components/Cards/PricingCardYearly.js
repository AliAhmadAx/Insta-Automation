import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../App";
import { AiFillFire } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import ApiURL from "../Config/Config";
import ApiURL from "../../Config/Config";
import { PulseLoader } from "react-spinners";
import PlanDesc from "../PlanDesc/PlanDesc";

function PricingCardYearly() {
  let navigate = useNavigate();

  const { DarkMode } = useContext(ThemeContext);

  const [time, setTime] = useState("Month");
  const [duration, setDuration] = useState(1);
  const [planid, setPlanId] = useState("");

  const [Loading, setLoading] = useState(false);

  const [Plans, setPlans] = useState([]);

  // pricing card api starts
  const getPricingYearly = () => {
    setLoading(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(ApiURL + "/UserListYearlyPlans", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setLoading(false);
          setPlans(result.plans);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  // pricing card api ends

  useEffect(() => {
    getPricingYearly();
  }, []);

  return (
    <>
      {/* {tableData && tableData.map((item) => ( */}

      {Loading === true ? (
        <div className="w-full flex justify-center items-center absolute right-0">
          <PulseLoader
            color={"var(--bg-fill5)"}
            size={30}
            style={{ zIndex: "10" }}
          />
        </div>
      ) : (
        <>
          {Plans.slice(-4)?.map((item, index) => (
            <div
              key={item.id}
              style={
                DarkMode === true
                  ? {
                      backgroundColor: "var(--bg-fill8)",
                      color: "var(--bg-fill4)",
                    }
                  : { backgroundColor: "var(--bg-fill3)" }
              }
              className={
                DarkMode === true
                  ? "w-11/12 lg:w-[370px] py-10  rounded-lg hover:-translate-y-2 hover:duration-500 hover:shadow-lg hover:shadow-gray-700"
                  : "w-11/12 lg:w-[370px] py-10  rounded-lg hover:-translate-y-2 hover:duration-500 hover:shadow-lg hover:shadow-orange-200"
              }
            >
              <div className="w-[5%] float-right pl-10 lg:pl-16 text-sm bg-green-500">
                <>
                {item.discount > '0' ? <p className="float-right mr-3">{item.discount}%off</p> : <p></p>}
                
                </>
              </div>
              <div className="w-full pl-10 lg:pl-16 text-2xl">
                <p>{item.plan_name}</p>
              </div>
              <div className="w-full flex pl-10 lg:pl-16 py-5 text-2xl">
                <p className="text-sm mr-1">$</p>
                <p className="text-4xl self-end mr-1">{item.price}</p>
                <p className=" text-sm mb-1 self-end">/ yearly</p>
              </div>

              <div className="w-full space-y-2 pt-5 pl-14 lg:pl-20">
                <div className="flex items-center">
                  <p className=" ">
                    {/* {item.description} */}
                    <PlanDesc data={item.description.split(",")} />
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <Link
                  to= { "/signup/" + time + "/" + duration + "/" + item.id + "/" + item["price"]  }
                  // to={
                  //   "/signup/" +
                  //   time +
                  //   "/" +
                  //   duration +
                  //   "/" +
                  //   item["plan_id"] +
                  //   "/" +
                  //   item["price"]
                  // }
                >
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
                        ? "px-6 py-3 mt-10 flex items-center btn-hoverDark2 rounded-md"
                        : "px-6 py-3 mt-10 flex items-center btn-hover4 rounded-md"
                    }
                    // onClick={() => navigate("/pricing")}
                  >
                    <AiFillFire
                      size="1.3em"
                      color={DarkMode === true ? "" : "orange"}
                      className="mr-2 self-center"
                    />
                    Try it Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
      {/* ))} */}
    </>
  );
}

export default PricingCardYearly;
