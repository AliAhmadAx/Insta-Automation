import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../App";
import { AiFillFire } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ApiURL from "../../Config/Config";
import { PulseLoader } from "react-spinners";
import PlanDesc from "../PlanDesc/PlanDesc";
import { GiAbstract087 } from "react-icons/gi";

function PricingCard() {
  let navigate = useNavigate();

  const { DarkMode } = useContext(ThemeContext);

  const [time, setTime] = useState("Month");
  const [duration, setDuration] = useState(1);
  const [planid, setPlanId] = useState("");

  const [Loading, setLoading] = useState(false);

  const [Plans, setPlans] = useState([]);

  // pricing card api starts
  const getPricingMonthly = () => {
    setLoading(true);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(ApiURL + "/UserListMonthlyPlans", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setPlans(result.plans);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  // pricing card api ends

  useEffect(() => {
    getPricingMonthly();
  }, []);

  return (
    <>
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
          {/* {Plans.slice(-4)?.map((item, index) => ( */}
          <div
            // key={item.id}
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
                {/* {item.discount > '0' ? <p className="float-right mr-3"> */}
                {/* {item.discount} */}
                {/* 7%off</p> : <p></p>} */}
              </>
            </div>
            <div className="divide-y divide-blue-200 px-5">
              <div className="w-full flex flex-row pb-2">
                <div className="w-[40%] dashboard_color mr-5 flex text-7xl rounded-md items-center justify-center">
                      <GiAbstract087 />
                </div>
                <div className="w-[60%] flex flex-col py-5 items-center justify-center">
                  <div className="w-full text-2xl ">
                    <p>
                      {/* {item.plan_name} */}
                      Montly
                    </p>
                  </div>
                  <div className="w-full flex text-2xl">
                    <p className="text-lg mr-1">$</p>
                    <p className="text-4xl self-end mr-1">
                      {/* {item.price} */}
                      12
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full space-y-2 pt-5 flex text-center justify-center px-5">
                <div className="flex items-center">
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Deserunt, dignissimos.
                    {/* <PlanDesc data={item.description.split(",")} /> */}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <Link
                to={
                  "/signup/" +
                  time +
                  "/" +
                  duration +
                  "/" +
                  // item.id
                  1 +
                  "/" +
                  // item["price"]
                  70
                }
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
          {/* ))} */}

          {/* ))} */}
        </>
      )}
    </>
  );
}

export default PricingCard;
