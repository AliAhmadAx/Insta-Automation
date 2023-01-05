import React, { useState, useEffect } from "react";
import { useContext } from "react";
import Helmet from "react-helmet";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext } from "../../../App";
import ApiURL from "../../../Config/Config";
import Buttons from "../../Buttons/Buttons";

function ChangePasswordAdmin(props) {
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAddButton } = useContext(ThemeContext);

  useEffect(() => {
    setAddButton("Update");
  }, []);

  const handleChangeAdminPass = () => {
    console.log("Saad");
    console.log(oldpassword, "oldpassword");
    console.log(newpassword, "newpassword");
    console.log(confirmPassword, "confirmPassword");

    if (oldpassword == "" || newpassword == "" || confirmPassword == "") {
      console.log("error");
      toast.error("Fields must be filled");
    } else if (newpassword != confirmPassword) {
      console.log("Pass not equals");
      toast.error("New Password and Confirm Password are not Equal");
    } else {
      var myHeaders = new Headers();
      const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

      var raw = JSON.stringify({
        oldpassword: oldpassword,
        newpassword: newpassword,
        confirmPassword: confirmPassword,
      });
      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(ApiURL + "/ChangePassword", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status == 200) {
            toast.success(result.message);
          }
          if (result.status == 406) toast.error(result.message);
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <>
      <Helmet>
        <title>Instagram Automation| Admin | Change Password</title>
      </Helmet>
      <ToastContainer />
      <div className="w-3/4 mt-20">
        <div
          className={
            "bg-white w-full rounded-lg mx-auto mt-8 flex flex-col md:flex-row overflow-hidden shadow-lg"
          }
        >
          <div
            className={
              " w-full dashboard_color text-white md:w-1/3  py-8 px-3 md:px-8 inline-block"
            }
          >
            <div className="w-full">
              <h2
                className={
                  "font-medium text-base text-center mb-4 tracking-wide"
                }
              >
                Change Password
              </h2>
            </div>

            <p className={"text-xs text-center"}>
              To Change the password enter your old password, new password and
              confirm it!
            </p>
          </div>
          <div className="md:w-full w-full">
            <div className="py-2 pt-12 px-10">
              <label for="name" className="text-sm flex text-gray-600">
                Old Password<span className="text-red-800">*</span>
                <p
                  id="oldpassword"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  (Old Password is not filled!)
                </p>
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base text-gray-900 focus:outline-none focus:border-gray-900"
                }
                type="password"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter Old Password"
              />
            </div>
            <div className="py-2 px-10">
              <label for="name" className="text-sm flex text-gray-600">
                New Password<span className="text-red-800">*</span>
                <p
                  id="newpassword"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  (New password is not filled!)
                </p>
                <p
                  id="newpassword2"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  (Password must have 8 characters!)
                </p>
                <p
                  id="newpassword3"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  {/* ({passErr}) */}
                </p>
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base text-gray-900 focus:outline-none focus:border-gray-900"
                }
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
              />
            </div>
            <div className="py-2 mb-6 px-10">
              <label for="name" className="text-sm flex text-gray-600">
                Confirm Password<span className="text-red-800">*</span>
                <p
                  id="confirmpassword"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  (Confirm password is not filled!)
                </p>
                <p
                  id="confirmpassword2"
                  className="text-red-500 hidden ml-3 text-xs font-light self-center"
                >
                  (Passwords do not match!)
                </p>
              </label>
              <input
                className={
                  "border-gray-200 mt-2 border-2  px-3 py-2 block w-full rounded text-base text-gray-900 focus:outline-none focus:border-gray-900"
                }
                type="password"
                id="conf_pass_input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter Confirm Password"
              />
            </div>
          </div>
        </div>
        <div
          className={
            " pt-6 md:pt-7 flex justify-between md:justify-end clearfix rounded-b-lg border-t"
          }
        >
          {/* <button
            style={{ background: "var(--bg-fill4)" }}
            className={
              "btn-hover text-white text-sm font-medium px-5 py-3 rounded float-right uppercase cursor-pointer"
            }
            onClick={() => handleChangeAdminPass()}
          >
            Update
          </button> */}
          <Buttons onClick={() => handleChangeAdminPass()} />
        </div>
      </div>
    </>
  );
}

export default ChangePasswordAdmin;
