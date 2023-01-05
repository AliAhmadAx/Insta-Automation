import React, { useState, useContext, useEffect } from "react";
import Helmet from "react-helmet";
import { ThemeContext } from "../../../App";
import ApiURL from "../../../Config/Config";
import AdminRefreshToken from "../../../Pages/auth/Admin/AdminRefreshToken";

function ViewProfileAdmin() {
  const { DarkMode } = useContext(ThemeContext);
  const [TokenRefresh] = useState(true);
  const setTokenRefresh = (refresh) => {
    console.log(refresh);
  };
  const [refresh, setRefresh] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [Email, setEmail] = useState("");

  // const token = localStorage.getItem("AccessTokenAdmin");

  const getAdminDetails = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/Details", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.msg !== "Token has expired") {
          setEmail(result.data["email"]);
          // setFirstName(result.data["firstname"]);
          // setLastName(result.data["lastname"]);
          setUsername(result.data["username"]);
          // setContact(result.details["phone_no"]);
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          getAdminDetails();
          setRefresh(!refresh);
          // setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAdminDetails();
  }, []);

  return (
    <div className="flex mt-20 flex-col w-11/12 justify-start ">
      <Helmet>
        <title>Instagram Automation| Admin | View Profile</title>
      </Helmet>
      {/* MAIN BODY  */}
      <div className="w-full">
        {/* BASIC INFO  */}

        <div
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--bg-fill5)",
                }
              : { backgroundColor: "var(--bg-fill3)" }
          }
          className={
            "w-full shadow-lg rounded-lg mx-auto mt-4 flex flex-col md:flex-row overflow-hidden"
          }
        >
          <div
            className={
              " w-full dashboard_color md:w-1/3 py-7 px-3 md:px-8 inline-block"
            }
          >
            <div className=" w-full rounded-lg relative shadow-inset">
              <h2>Basic Information</h2>
              <h3 className={"text-sm"}>View Your Account Info</h3>
            </div>
          </div>

          {/* RIGHT HAND SIDE  */}
          <div className="md:w-2/3 pt-4 pb-6 w-full">
            <div
              style={
                DarkMode === true
                  ? {
                      color: "var(--txtColor2)",
                    }
                  : { color: "" }
              }
              className="py-2 px-10"
            >
              <label htmlFor="phone" className="text-sm flex ">
                Username
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2 bg-gray-200 px-3 py-2 block w-full rounded text-base"
                }
                type="text"
                name="username"
                placeholder="Your Username"
                disabled
                value={username}
              />
            </div>
            {/* <div
              style={
                DarkMode === true
                  ? {
                      color: "var(--txtColor2)",
                    }
                  : { color: "" }
              }
              className="py-2 pt-4 px-10"
            >
              <label htmlFor="name" className="flex text-sm">
                First Name
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="text"
                placeholder="Your First Name"
                value={firstName}
                disabled
                required
              />
            </div>
            <div
              style={
                DarkMode === true
                  ? {
                      color: "var(--txtColor2)",
                    }
                  : { color: "" }
              }
              className="py-2 pt-4 px-10"
            >
              <label htmlFor="name" className="flex text-sm">
                Last Name
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="text"
                placeholder="Your Last Name"
                value={lastName}
                disabled
                required
              />
            </div> */}
            <div
              style={
                DarkMode === true
                  ? {
                      color: "var(--txtColor2)",
                    }
                  : { color: "" }
              }
              className="py-2 px-10"
            >
              <label htmlFor="email" className="text-sm flex ">
                Email
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2 bg-gray-200  px-3 py-2 block w-full rounded text-base"
                }
                type="email"
                placeholder="Your  Email"
                value={Email}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfileAdmin;
