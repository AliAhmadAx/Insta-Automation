import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AiFillFire } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ApiURL from "../../../Config/Config";
import { ThemeContext } from "../../../App";

import { AiOutlineCloseCircle, AiOutlineGoogle } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { BiShow, BiHide } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Helmet from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import TotalServices from "../../../TotalServices";

// images
// import dataext from "../../Assets/Images/Data-ext.png";

function LoginRegister() {
  const [Screen, setScreen] = useState(2);
  const [active, setActive] = useState(2);

  let navigate = useNavigate();

  const [ForgotPass, setForgotPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");

  // VERIFICATION
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [BtnDisabled2, setBtnDisabled2] = useState(false);

  const {
    DarkMode,
    setRefreshAdminLogin,
    RefreshAdminLogin,
    setShowModal,
    setHeaderShow,
  } = useContext(ThemeContext);

  // LOGIN API STARTS
  const handleLogin = async () => {
    setBtnDisabled(true);

    try {
      var res = await TotalServices.login({
        username: userName,
        password: Password,
      });

      if (res.data.status === 200) {
        // console.log(res.data.access_token);
        let items = {
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
        };
        localStorage.setItem("AdminAuth", JSON.stringify(items));
        localStorage.setItem("AdminIsLogin", "true");
        setRefreshAdminLogin(RefreshAdminLogin === true ? false : true);
        setBtnDisabled(false);
        navigate("/admin-dashboard");
        setShowModal(false);
        setHeaderShow(false);
      } else if (res.data.status !== 200) {
        document.getElementById("error").style.display = "block";
        setBtnDisabled(false);
      }
    } catch (error) {
      console.log("error ", error);
      toast.error(error.message);
      setBtnDisabled(false);
    }
  };
  // LOGIN API ENDS

  // FORGOT PASSWORD API STARTS
  const ForgotPassApi = async () => {
    setBtnDisabled2(true);

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (forgetEmail === "") {
      document.getElementById("email").innerHTML = "(Enter Email Address!)";
      setBtnDisabled2(false);
    } else if (regex.test(forgetEmail)) {
      document.getElementById("email").innerHTML = "";

      try {
        var res = await TotalServices.ForgotPassword({
          email: forgetEmail,
        });

        if (res.data.status === 200) {
          toast.success(res.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setBtnDisabled2(false);
          setForgetEmail("");
        } else if (res.data.status === 406) {
          toast.error(res.message);
        } else if (res.data.status === 404) {
          document.getElementById("email").innerHTML = "(Email not found!)";
          toast.error("Email not found!!");
        }
        setBtnDisabled2(false);
      } catch (error) {
        console.log("error ", error);
        toast.error(error.message);
        setBtnDisabled(false);
      }
    } else {
      document.getElementById("email").innerHTML =
        "(Email Address is not valid)";
      toast.error("Email Address is not valid");
      document.getElementById("email2").innerHTML = "";
      setBtnDisabled2(false);
    }
  };
  // FORGOT PASSWORD API ENDS

  // SIGNUP API STARTS
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSignup = async () => {
    // username checks
    const indexNumber = userName.search(/[0-9]/);
    const indexCharacter = userName.search(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    );
    const indexSpace = userName.search(" ");

    // password checks
    const passNumber = Password.search(/[0-9]/);
    const passSmall = Password.search(/[a-z]/);
    const passCapital = Password.search(/[A-Z]/);
    const passSpecial = Password.search(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    );
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      name === "" ||
      userName === "" ||
      Email === "" ||
      Password === "" ||
      ConfirmPassword === ""
    ) {
      document.getElementById("error").innerHTML =
        "Please fill the empty field(s)!";
    } else if (userName.length < 3) {
      document.getElementById("error").innerHTML =
        "User name must have at least 3 characters!";
    } else if (indexNumber === 0 || indexCharacter === 0 || indexSpace >= 0) {
      document.getElementById("error").innerHTML =
        "User name must start with an alphabet and with no extra spaces!";
    } else if (indexSpace >= 0) {
      document.getElementById("error").innerHTML =
        "User name must not contain Spaces!";
    } else if (!regex.test(Email)) {
      document.getElementById("error").innerHTML = "Email is Invalid";
    } else if (Password !== ConfirmPassword) {
      document.getElementById("error").innerHTML = "Passwords did not Match!";
    } else if (Password < 8 || ConfirmPassword < 8) {
      document.getElementById("error").innerHTML =
        "Password must have at least 8 Characters";
    } else if (
      passNumber < 0 ||
      passSmall < 0 ||
      passCapital < 0 ||
      passSpecial < 0
    ) {
      if (
        passNumber < 0 ||
        passSmall < 0 ||
        passCapital < 0 ||
        passSpecial < 0
      ) {
        document.getElementById("error").innerHTML =
          "Password must contain at least one capital letter, number and special Character";
      }
    } else {
      setBtnDisabled(true);
      document.getElementById("error").innerHTML = "";

      try {
        var res = await TotalServices.register({
          name: name,
          username: userName,
          email: Email,
          password: Password,
        });

        if (res.data.status === 200) {
          toast.success("Account created successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setBtnDisabled(false);
          document.getElementById("error").innerHTML = "";
          // navigate("/user-login");
        } else if (res.data.status === 406) {
          toast.error("An account with this email already exists!");
        }
      } catch (error) {
        console.log("error ", error);
        toast.error(error.message);
        setBtnDisabled(false);
      }
    }
  };
  // SIGNUP API ENDS

  return (
    <div className="w-full flex">
      {/* left div  */}
      <div className="w-full md:w-[60%] flex flex-col items-center">
        <div className="w-full flex mt-5 space-y-3  md:space-y-0 flex-col sm:flex-row text-xl sm:justify-around sm:items-center md:px-5">
          <button
            onClick={() => {
              setScreen(2);
              setActive(2);
            }}
            className={
              active === 2
                ? "py-2 px-3 border-b-2 border-gray-900"
                : "py-2 px-3 hover:border-b-2 border-gray-900"
            }
          >
            Login
          </button>
          <button
            onClick={() => {
              setScreen(3);
              setActive(3);
            }}
            className={
              active === 3
                ? "py-2 px-3 border-b-2 border-gray-900"
                : "py-2 px-3 hover:border-b-2 border-gray-900"
            }
          >
            <div className="w-full flex justify-center"></div>
            Register
          </button>
        </div>

        {/* TAB DISPLAY  */}
        {/* TAB 1  */}
        {Screen === 2 ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="container flex flex-col items-center"
          >
            <div className="w-full px-5 sm:px-10 lg:w-full h-[60vh] flex flex-col lg:flex-row">
              <div
                style={
                  DarkMode === true
                    ? { backgroundColor: "var(--bg-fill8)" }
                    : { backgroundColor: "var(--bg-fill12)" }
                }
                className="w-full rounded-xl flex"
              >
                <div className="w-full h-full flex flex-col md:flex-row">
                  <ToastContainer />

                  <div className="w-full md:w-[100%] h-full relative px-10 flex items-center justify-center">
                    <form
                      className="w-full text-center pb-10 lg:pb-0"
                      onSubmit={(e) => (e.preventDefault(), handleLogin())}
                    >
                      <div
                        style={
                          DarkMode === true
                            ? { color: "var(--txtColor2)" }
                            : { color: "var(--txtColor1)" }
                        }
                        className=" w-full flex flex-col items-center"
                      >
                        <h2 className="text-2xl  font-semibold text-black-800">
                          Sign in
                        </h2>
                      </div>

                      <div className="w-full text-center">
                        <p
                          id="error"
                          style={{ display: "none" }}
                          className="text-sm text-red-600"
                        >
                          Username or Password is incorrect
                        </p>
                      </div>

                      <div className="mt-8">
                        <div className="my-6">
                          <div className="">
                            <div className="">
                              <label
                                htmlFor="username"
                                className="w-full flex flex-col items-start space-y-2"
                              >
                                <p className="text-sm"> Username</p>
                                <input
                                  type="text"
                                  name="username"
                                  value={userName}
                                  onChange={(e) => setUserName(e.target.value)}
                                  className={
                                    DarkMode === true
                                      ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                      : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                  }
                                  placeholder="Your username"
                                  required
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="my-6">
                          <div className="">
                            <div className="flex flex-col">
                              <label
                                htmlFor="password"
                                className="w-full flex flex-col items-start mb-2"
                              >
                                <p className="text-sm"> Password</p>
                              </label>

                              <div className="w-full flex items-center">
                                {showPassword === true ? (
                                  <input
                                    type="text"
                                    name="password"
                                    value={Password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    className={
                                      DarkMode === true
                                        ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                        : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                    }
                                    placeholder="Your password"
                                    required
                                  />
                                ) : (
                                  <input
                                    type="password"
                                    name="password"
                                    value={Password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    className={
                                      DarkMode === true
                                        ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                        : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                    }
                                    placeholder="Your password"
                                    required
                                  />
                                )}
                                {showPassword === true ? (
                                  <BiHide
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="self-center -ml-8 cursor-pointer hover:text-gray-500"
                                  />
                                ) : (
                                  <BiShow
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="self-center -ml-8 cursor-pointer hover:text-gray-500"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="my-6">
                          <button
                            disabled={BtnDisabled}
                            style={
                              DarkMode === true
                                ? {
                                    backgroundColor: "var(--bg-fill1)",
                                    color: "var(--txtColor2)",
                                  }
                                : {
                                    background: "#111827",
                                    color: "var(--txtColor2)",
                                  }
                            }
                            className="inline-block btn-hover4 border-2 border-black rounded-md font-medium cursor-pointer text-center text-base py-3 px-6  w-full"
                            type="submit"
                          >
                            {BtnDisabled === false ? (
                              "Login"
                            ) : (
                              <PulseLoader
                                color={"white"}
                                size={10}
                                style={{ zIndex: "-10" }}
                              />
                            )}
                          </button>
                        </div>
                        <div className="text-right">
                          <a
                            onClick={() => setForgotPass(!ForgotPass)}
                            className="text-red-500 cursor-pointer"
                          >
                            Forgot your password?
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* FORGOT PASSWORD MODAL  */}
                  {ForgotPass === true ? (
                    <div className="z-40 w-full h-full absolute top-0 left-0 bg-black/40 flex justify-center items-center">
                      <div
                        style={
                          DarkMode === true
                            ? {
                                backgroundColor: "var(--bg-fill1)",
                                color: "var(--txtColor2)",
                              }
                            : {
                                backgroundColor: "var(--bg-fill3)",
                                color: "var(--txtColor1)",
                              }
                        }
                        className="w-4/6 md:w-2/6 flex flex-col relative border rounded-lg p-5 text-xs"
                      >
                        <AiOutlineCloseCircle
                          onClick={() => setForgotPass(!ForgotPass)}
                          size="1.6em"
                          className="absolute top-2 right-3 cursor-pointer hover:text-gray-400"
                        />
                        <h2 className="text-lg py-3 cursor-pointer">
                          Forgot Password ?
                        </h2>
                        <p className="text-sm text-red-600 pb-2" id="email"></p>
                        <p
                          className="text-sm text-red-600 pb-2"
                          id="email2"
                        ></p>

                        <input
                          type="email"
                          name="email"
                          value={forgetEmail}
                          onChange={(e) => setForgetEmail(e.target.value)}
                          className="rounded-md border py-2 px-2 w-full text-base"
                          placeholder="Email Address"
                        />
                        <div className="w-full flex justify-end mt-5">
                          <button
                            disabled={BtnDisabled2}
                            style={
                              DarkMode === true
                                ? { backgroundColor: "var(--btn-bgColor1)" }
                                : {
                                    background: "#111827",
                                    color: "var(--txtColor2)",
                                  }
                            }
                            className="px-5 py-3 rounded-md btn-hover3 "
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              ForgotPassApi();
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* TAB 2  */}
        {Screen === 3 ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="container flex flex-col items-center"
          >
            <div className="w-full px-5 sm:px-10 lg:w-full h-[60vh] flex flex-col lg:flex-row">
              <div
                style={
                  DarkMode === true
                    ? { backgroundColor: "var(--bg-fill8)" }
                    : { backgroundColor: "var(--bg-fill12)" }
                }
                className="w-full rounded-xl flex"
              >
                <div className="w-full h-full flex flex-col md:flex-row overflow-y-scroll">
                  <ToastContainer />

                  <div className="w-full md:w-[100%] mt-52 h-full relative px-10 flex items-center justify-center">
                    <form
                      className="w-full text-center lg:pb-0"
                      onSubmit={(e) => (
                        e.preventDefault(),
                        // handleSignup()
                        navigate(
                          "/proceed-payment/:time/:duration/:planID/:price"
                        )
                      )}
                    >
                      <div
                        style={
                          DarkMode === true
                            ? { color: "var(--txtColor2)" }
                            : { color: "var(--txtColor1)" }
                        }
                        className=" w-full flex flex-col items-center"
                      >
                        <h2 className="text-2xl font-semibold text-black-800">
                          Register
                        </h2>
                      </div>

                      <div className="w-full text-center">
                        <p
                          id="error"
                          style={{ display: "none" }}
                          className="text-sm text-red-600"
                        >
                          Username or Password is incorrect
                        </p>
                      </div>

                      <div className="mt-8">
                        <div className="my-6">
                          <div className="">
                            <div className="">
                              <label
                                htmlFor="name"
                                className="w-full flex flex-col items-start space-y-2"
                              >
                                <p className="text-sm"> Name</p>
                                <input
                                  type="text"
                                  name="name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className={
                                    DarkMode === true
                                      ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                      : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                  }
                                  placeholder="Your Name"
                                  required
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="my-6">
                          <div className="">
                            <div className="">
                              <label
                                htmlFor="username"
                                className="w-full flex flex-col items-start space-y-2"
                              >
                                <p className="text-sm"> Username</p>
                                <input
                                  type="text"
                                  name="username"
                                  value={userName}
                                  onChange={(e) => setUserName(e.target.value)}
                                  className={
                                    DarkMode === true
                                      ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                      : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                  }
                                  placeholder="Your username"
                                  required
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="my-6">
                          <div className="">
                            <div className="">
                              <label
                                htmlFor="email"
                                className="w-full flex flex-col items-start space-y-2"
                              >
                                <p className="text-sm">Email Address</p>
                                <input
                                  type="email"
                                  name="email"
                                  value={Email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className={
                                    DarkMode === true
                                      ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                      : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                  }
                                  placeholder="Your Email Address"
                                  required
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="my-6">
                          <div className="">
                            <div className="flex flex-col">
                              <label
                                htmlFor="password"
                                className="w-full flex flex-col items-start mb-2"
                              >
                                <p className="text-sm"> Password</p>
                              </label>

                              <div className="w-full flex items-center">
                                {showPassword === true ? (
                                  <input
                                    type="text"
                                    name="password"
                                    value={Password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    className={
                                      DarkMode === true
                                        ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                        : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                    }
                                    placeholder="Your password"
                                    required
                                  />
                                ) : (
                                  <input
                                    type="password"
                                    name="password"
                                    value={Password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    className={
                                      DarkMode === true
                                        ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                        : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                    }
                                    placeholder="Your password"
                                    required
                                  />
                                )}
                                {showPassword === true ? (
                                  <BiHide
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="self-center -ml-8 cursor-pointer hover:text-gray-500"
                                  />
                                ) : (
                                  <BiShow
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="self-center -ml-8 cursor-pointer hover:text-gray-500"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-6">
                          <div className="">
                            <div className="flex flex-col">
                              <label
                                htmlFor="confirm_password"
                                className="w-full flex flex-col items-start mb-2"
                              >
                                <p className="text-sm">Confirm Password</p>
                              </label>

                              <div className="w-full flex items-center">
                                {showPassword2 === true ? (
                                  <input
                                    type="text"
                                    name="confirm_password"
                                    value={ConfirmPassword}
                                    onChange={(e) =>
                                      setConfirmPassword(e.target.value)
                                    }
                                    className={
                                      DarkMode === true
                                        ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                        : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                    }
                                    placeholder="Confirm password"
                                    required
                                  />
                                ) : (
                                  <input
                                    type="password"
                                    name="password"
                                    value={ConfirmPassword}
                                    onChange={(e) =>
                                      setConfirmPassword(e.target.value)
                                    }
                                    className={
                                      DarkMode === true
                                        ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                        : "w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                    }
                                    placeholder="Confirm password"
                                    required
                                  />
                                )}
                                {showPassword2 === true ? (
                                  <BiHide
                                    onClick={() =>
                                      setShowPassword2(!showPassword2)
                                    }
                                    className="self-center -ml-8 cursor-pointer hover:text-gray-500"
                                  />
                                ) : (
                                  <BiShow
                                    onClick={() =>
                                      setShowPassword2(!showPassword2)
                                    }
                                    className="self-center -ml-8 cursor-pointer hover:text-gray-500"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between ">
                          <div className="w-[30%] dashboard_color p-5 rounded-md cursor-pointer">
                            <h2>Monthly</h2>
                            <h3>$10</h3>
                          </div>
                          <div className="w-[30%] dashboard_color p-5 rounded-md cursor-pointer">
                            <h2>Quarterly</h2>
                            <h3>$40</h3>
                          </div>
                          <div className="w-[30%] dashboard_color p-5 rounded-md cursor-pointer">
                            <h2>Annually</h2>
                            <h3>$100</h3>
                          </div>
                        </div>

                        <div className="my-6">
                          <button
                            disabled={BtnDisabled}
                            style={
                              DarkMode === true
                                ? {
                                    backgroundColor: "var(--bg-fill1)",
                                    color: "var(--txtColor2)",
                                  }
                                : {
                                    background: "#111827",
                                    color: "var(--txtColor2)",
                                  }
                            }
                            className="inline-block btn-hover4 border-2 border-black rounded-md font-medium cursor-pointer text-center text-base py-3 px-6  w-full"
                            type="submit"
                          >
                            {BtnDisabled === false ? (
                              "Continue With Payment"
                            ) : (
                              <PulseLoader
                                color={"white"}
                                size={10}
                                style={{ zIndex: "-10" }}
                              />
                            )}
                          </button>
                        </div>
                        <div className="text-right">
                          <a className="cursor-pointer flex items-center">
                            ALready Have An Account ?{" "}
                            <p
                              onClick={() => {
                                setScreen(2);
                                handleSignup();
                              }}
                              className="ml-1 text-green-500"
                            >
                              Login
                            </p>
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>

      {/* RIGHT HAND div  */}
      <div className="w-full md:w-[40%] md:h-[75vh] dashboard_color flex items-center justify-center text-center">
        <div className="px-8 sm:px-20 md:px-10 text-white lg:px-20 py-16 text-4xl font-serif font-extrabold">
          Instagram Automation
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
