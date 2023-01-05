import React, { useState, useEffect, useContext } from "react";
import ApiURL from "../../../Config/Config";
import { ToastContainer, toast } from "react-toastify";
import Helmet from "react-helmet";
import { PulseLoader } from "react-spinners";
import { ThemeContext } from "../../../App";
import AdminRefreshToken from "../../../Pages/auth/Admin/AdminRefreshToken";
import Buttons from "../../Buttons/Buttons";

function EditProfileAdmin() {
  const { DarkMode, setAddButton } = useContext(ThemeContext);
  const [TokenRefresh] = useState(true);
  const setTokenRefresh = (refresh) => {
    console.log(refresh);
  };
  const [refresh, setRefresh] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // const [BtnDisabled, setBtnDisabled] = useState(false);

  // const token = localStorage.getItem("AccessTokenUser");

  // GET USER DATA API STARTS
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
        if (result.status == 200) {
          setEmail(result.data["email"]);
          // setFirstName(result.data["firstname"]);
          // setLastName(result.data["lastname"]);
          setUsername(result.data["username"]);
        } else if (result.msg === "Token has expired") {
          AdminRefreshToken(setTokenRefresh, TokenRefresh);
          setRefresh(!refresh);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAdminDetails();
    setAddButton("Save Changes");
  }, []);
  // GET USER DATA API ENDS

  // EDIT USER DATA API STARTS
  const editUserDetails = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const indexSpace = username.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    const nameCharacter = username.search(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    );

    if (email === "") {
      document.getElementById("email").innerHTML = "Email is not Filled!";
    }
    if (firstName === "") {
      document.getElementById("firstname").innerHTML =
        "First Name is not filled!";
    }
    if (lastName === "") {
      document.getElementById("lastname").innerHTML =
        "Last Name is not filled!";
    }

    if (username.length < 3) {
      document.getElementById("username").innerHTML = "User name is too short!";
    } else if (nameCharacter >= 0 || username !== indexSpace) {
      document.getElementById("username").innerHTML = "User name is invalid!";
    } else if (!regex.test(email)) {
      document.getElementById("email").innerHTML = "Email is invalid!";
    } else {
      // setBtnDisabled(true);
      // document.getElementById("username").innerHTML = "";
      document.getElementById("email").innerHTML = "";
      // document.getElementById("firstName").innerHTML = "";
      // document.getElementById("lastName").innerHTML = "";

      // document.getElementById("contact").innerHTML = "";
      var raw = JSON.stringify({
        // username: username,
        email: email,
        // firstname: firstName,
        // lastname: lastName,
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(ApiURL + "/EditDetails", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.msg !== "Token has expired") {
            if (result.status === 200) {
              toast.success(result.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              // localStorage.setItem("AccessTokenAdmin", "");
              // localStorage.setItem("RefreshTokenAdmin", "");
              // localStorage.setItem("AdminIsLogin", "false");

              // setBtnDisabled(false);
            } else if (result.status === 406) {
              toast.error(result.message);
            }
          } else if (result.msg === "Token has expired") {
            AdminRefreshToken(setTokenRefresh, TokenRefresh);
            setRefresh(!refresh);
            // setLoader(false);
          }
        })
        .catch((error) => {
          // setBtnDisabled(false);
          toast.error("Oopss!! Some error occurred!!!");
          console.log("error", error);
        });
    }
  };
  // EDIT USER DATA API ENDS

  return (
    <div className="flex mt-20 flex-col w-[80%]">
      <Helmet>
        <title>Instagram Automation | Admin | Edit Profile</title>
      </Helmet>
      <ToastContainer />
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
              "w-full dashboard_color md:w-1/3 py-7 px-3 md:px-8 inline-block"
            }
          >
            <div className=" w-full rounded-lg relative shadow-inset">
              <h2>Basic Information</h2>
              <h3 className={"text-sm"}>Edit Your Account Info</h3>
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
              className="py-2 pt-4 px-10"
            >
              <label htmlFor="name" className="flex text-sm">
                Username
                <p
                  id="username"
                  className="text-red-500  ml-3 text-xs font-light self-center"
                ></p>
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2 bg-gray-200 px-3 py-2 block w-full rounded text-base"
                }
                type="text"
                placeholder="Enter Your Name"
                disabled
                value={username}
                name={username}
                id={"username"}
                onChange={(e) => setUsername(e.target.value)}
                required
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
                <p
                  id="firstName"
                  className="text-red-500  ml-3 text-xs font-light self-center"
                ></p>
              </label>
              <input
                style={
                  DarkMode === true
                    ? {
                        backgroundColor: "var(--bg-fill3)",
                      }
                    : {
                        backgroundColor: "var(--bg-fill3)",
                      }
                }
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="text"
                id={"firstName"}
                placeholder="Enter Your Name"
                value={firstName}
                name={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                <p
                  id="lastName"
                  className="text-red-500  ml-3 text-xs font-light self-center"
                ></p>
              </label>
              <input
                style={
                  DarkMode === true
                    ? {
                        backgroundColor: "var(--bg-fill3)",
                      }
                    : {
                        backgroundColor: "var(--bg-fill3)",
                      }
                }
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="text"
                placeholder="Enter Your Name"
                value={lastName}
                id={"lastName"}
                name={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
              <label htmlFor="name" className="text-sm flex">
                Email
                <p
                  id="email"
                  className="text-red-500  ml-3 text-xs font-light self-center"
                ></p>
              </label>
              <input
                style={
                  DarkMode === true
                    ? {
                        backgroundColor: "var(--bg-fill3)",
                      }
                    : {
                        backgroundColor: "var(--bg-fill3)",
                      }
                }
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base"
                }
                type="email"
                placeholder="Enter Your  Email"
                value={email}
                name={email}
                id={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full flex justify-end">
        {/* <button
        
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--bg-fill1)",
                  color: "var(--txtColor2)",
                }
              : {
                  backgroundColor: "var(--bg-fill4)",
                  color: "var(--txtColor2)",
                }
          }
          className={
            "btn-hover3 text-sm font-medium px-5 py-3 rounded float-right uppercase cursor-pointer"
          }
        >
          Save Changes
       
        
        </button> */}
        <Buttons
          className={
            "btn-hover3 dashboard_color text-sm font-medium px-5 py-3 rounded float-right uppercase cursor-pointer"
          }
          onClick={() => editUserDetails()}
        />
      </div>
    </div>
  );
}

export default EditProfileAdmin;
