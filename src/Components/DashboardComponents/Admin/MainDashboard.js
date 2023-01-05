import { useState, useEffect } from "react";
import { BsBarChart, BsPersonCheck, BsPersonPlus } from "react-icons/bs";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import ApiURL from "../../../Config/Config";
import { MdPayments, MdOutlinePayment } from "react-icons/md";
import AdminRefreshToken from "../../../Pages/auth/Admin/AdminRefreshToken";

function MainDashboard(props) {
  var [countusers, setCountUsers] = useState();
  var [activeusers, setActiveusers] = useState();
  var [MonthlyPayments, setMonthlyPayments] = useState();
  var [totalPayments, setTotalPayments] = useState();
  const [nameOfUser, setNameOfUser] = useState("");

  const token = localStorage.getItem("AccessToken");
  const [TokenRefresh, setTokenRefresh] = useState(false);

  const getUsers = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/AdminListAllUsers", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 403) {
          AdminRefreshToken({ TokenRefresh, setTokenRefresh });
        } else {
          // console.log(result.users.COUNT)
          setCountUsers(result.data.ActiveUsers);
          setActiveusers(result.data.TotalUsers);
          setTotalPayments(result.data.TotalPayments);
          setMonthlyPayments(result.data.MonthPayments);
          setNameOfUser(result.data.username);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getUsers();
  });

  // var axios = require("axios");
  // let navigate = useNavigate();

  // var config = {
  //   method: "get",
  //   url: ApiURL+ "/AdminListAllUsers",

  //   headers: {
  //     Authorization: "Bearer " + token,
  //   },
  // };

  // axios(config)
  //   .then(function (response) {
  //     countusers = response.data.users;
  //     setCountUsers(countusers.length);
  //     console.log(countusers);
  //     activeusers = countusers.filter((element) => element.isActive == "1");
  //     activeusers = activeusers.length;
  //     setActiveusers(activeusers);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  //   // checkToken(token);

  return (
    <div className="flex flex-col py-3 min-w-[92%]">
      <Helmet>
        <title>Instagram Automation | Admin | Dashboard</title>
      </Helmet>
      <div className="flex flex-col mb-5">
        <h1 className="text-[#03284b] font-extrabold text-3xl flex flex-row">
          Hi Welcome,&nbsp; <p className="text-[#eab308]">{nameOfUser}</p>
        </h1>
      </div>
      <div className=" min-w-[90%] h-full flex flex-col md:flex-row items-center md:justify-between md:items-start">
        <div
          className={
            "w-full h-36 md:h-44 lg:h-36 my-5 md:w-[48%] flex flex-col justify-center bg-white shadow-lg text-3xl rounded"
          }
        >
          <div className="w-full px-5 py-5 flex justify-between items-center md:flex-col md:justify-start md:items-start">
            <div className="flex flex-col mt-1">
              <h2 className={"text-gray-900 tracking-wider text-lg font-bold"}>
                Number Of Queries
              </h2>
              <h3 className="text-gray-400  tracking-wider text-xs font-light">
                Total Number Of Queries
              </h3>
            </div>
            <div className="flex w-full justify-between px-0 mt-4">
              <h2 className="text-blue-400 tracking-wider text-lg font-bold">
                {countusers}
              </h2>
              <BsPersonCheck
                className="bg-blue-800 w-10 h-10 p-2 rounded"
                color="white"
                size="0.6em"
              />
            </div>
          </div>
        </div>
        <div
          className={
            "w-full h-36 md:h-44 lg:h-36 my-5 md:w-[48%] flex flex-col justify-center bg-white shadow-lg text-3xl rounded"
          }
        >
          <div className="w-full px-5 py-5 flex justify-between items-center md:flex-col md:justify-start md:items-start">
            <div className="flex flex-col mt-1">
              <h2 className={"text-gray-900 tracking-wider text-lg font-bold"}>
                Number Of Records
              </h2>
              <h3 className="text-gray-400  tracking-wider text-xs font-light">
                Total Number Of Records
              </h3>
            </div>
            <div className="flex w-full justify-between px-0 mt-4">
              <h2 className="text-blue-400 tracking-wider text-lg font-bold">
                {activeusers}
              </h2>
              <BsBarChart
                className="bg-[#115e59] w-10 h-10 p-2 rounded"
                color="white"
                size="0.6em"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" min-w-[90%] h-full flex flex-col md:flex-row items-center md:justify-between md:items-start">
        <div
          className={
            "w-full h-36 md:h-44 lg:h-36 my-5 md:w-[48%] flex flex-col justify-center bg-white shadow-lg text-3xl rounded"
          }
        >
          <div className="w-full px-5 py-5 flex justify-between items-center md:flex-col md:justify-start md:items-start">
            <div className="flex flex-col mt-1">
              <h2 className={"text-gray-900 tracking-wider text-lg font-bold"}>
                Number Of Unique Cities
              </h2>
              <h3 className="text-gray-400  tracking-wider text-xs font-light">
                Total Number Of Unique Cities
              </h3>
            </div>
            <div className="flex w-full justify-between px-0 mt-4">
              <h2 className="text-blue-400 tracking-wider text-lg font-bold">
                {MonthlyPayments}
              </h2>
              <MdOutlinePayment
                className="bg-[#16a34a] w-10 h-10 p-2 rounded"
                color="white"
                size="0.6em"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
