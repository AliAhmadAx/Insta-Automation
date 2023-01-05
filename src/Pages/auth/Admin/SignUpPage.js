import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineGoogle,
} from "react-icons/ai";
import { BsEye, BsTwitter } from "react-icons/bs";
import { BiShow, BiHide } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import ApiURL from "../../../Config/Config";
import Helmet from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { ThemeContext } from "../../../App";
import TotalServices from "../../../TotalServices";
import { GoPrimitiveDot } from "react-icons/go";

function Login() {
  var image =
    "https://thumbs.dreamstime.com/b/handsome-man-black-suit-white-shirt-handsome-man-black-suit-white-shirt-posing-studio-attractive-guy-125020542.jpg";

  const [ForgotPass, setForgotPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");

  // VERIFICATION
  //   const [userName, setUserName] = useState("");

  const [fullName, setFullName] = useState("");
  const [checkName, setCheckName] = useState(true);
  const [show, setShow] = useState(false);

  const [Email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(true);
  const [show2, setShow2] = useState(false);

  const [Password, setPassword] = useState("");
  const [show3, setShow3] = useState(true);

  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [BtnDisabled2, setBtnDisabled2] = useState(false);

  const { DarkMode, setRefreshAdminLogin, RefreshAdminLogin } =
    useContext(ThemeContext);

  let navigate = useNavigate();

  // SIGNUP API STARTS
  //  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);

  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passCapital = Password.search(/.*[A-Z].*/);
  const passSpecial = Password.search(
    /.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~].*/
  );

  const handleSignup = async () => {
    if (fullName === "" || Email === "" || Password === "") {
      toast.error("Fields can't be empty");
    } else if (fullName.length <= 3) {
      toast.error("Name length is short");
    } else if (!regex.test(Email)) {
      toast.error("Invalid Email");
    } else if (passCapital < 0 && passSpecial < 0) {
      toast.error("Invalid Password");
    } else {
      setBtnDisabled(true);
      try {
        var res = await TotalServices.register({
          name: fullName,
          //  username: userName,
          email: Email,
          password: Password,
        });

        console.log(res.data, "RAW");

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
    //    }
  };
  // SIGNUP API ENDS

  const handleCheckEmail = () => {
    if (!regex.test(Email) && Email !== "") {
      setShow2(true);
      setCheckEmail(true);
    } else {
      setShow2(true);
      setCheckEmail(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <Helmet>
        <title>Instagram Automation| Admin | Sign Up</title>
      </Helmet>
      <ToastContainer />

      {/* Left hand side  */}
      <div className="w-full md:w-[50%] h-full relative flex ">
        <form
          className="w-10/12 sm:w-2/3 text-start pb-10 ml-16 lg:pb-0"
          onSubmit={(e) => (e.preventDefault(), handleSignup())}
        >
          <div
            style={
              DarkMode === true
                ? { color: "var(--txtColor2)" }
                : { color: "var(--txtColor1)" }
            }
            className="mt-10 w-full flex flex-col ml-16"
          >
            <h2 className="text-2xl  font-semibold text-black-800">
              Sign Up for free and get
            </h2>
            <h2 className="text-2xl  font-semibold text-black-800">
              your first link in minutes
            </h2>
            <p className="text-xs mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              quaerat.
            </p>
          </div>
          <div className="w-full text-start">
            <p
              id="error"
              style={{ display: "none" }}
              className="text-sm text-red-600"
            >
              Username or Password is incorrect
            </p>
          </div>

          <div className="mt-6 w-full flex md:items-center flex-col">
            <div className="my-3 w-[70%]">
              <div className="">
                <div className="flex relative">
                  <label
                    htmlFor="Name"
                    className="w-full flex flex-col items-start mb-2"
                  >
                    <p className="text-sm ml-1"> Full Name</p>
                    <input
                      type="text"
                      name="name"
                      value={fullName}
                      onChange={(e) => {
                        e.preventDefault();
                        setFullName(e.target.value);
                        setShow(true);
                      }}
                      className={
                        DarkMode === true
                          ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                          : "w-full rounded-xl border-2 border-gray-300 px-4 py-2 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                      }
                      placeholder="eg. Mary Jackson "
                      required
                    />
                  </label>
                  {show ? (
                    fullName.length <= 3 ? (
                      <AiOutlineExclamationCircle className="text-red-500 absolute right-3 bottom-6" />
                    ) : (
                      <AiOutlineCheckCircle className="text-green-500 absolute right-3 bottom-6" />
                    )
                  ) : null}
                </div>
              </div>
            </div>

            <div className="my-3 w-[70%]">
              <div className="">
                <div className="flex relative">
                  <label
                    htmlFor="username"
                    className=" w-full flex flex-col items-start mb-2"
                  >
                    <p className="text-sm ml-1"> Email Adress</p>
                    <input
                      type="email"
                      name="email"
                      value={Email}
                      onChange={(e) => {
                        handleCheckEmail();
                        setEmail(e.target.value);
                      }}
                      className={
                        DarkMode === true
                          ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                          : "w-full  rounded-xl border-2 border-gray-300 px-4 py-2 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                      }
                      placeholder="Enter your email"
                      required
                    />
                  </label>
                  {show2 ? (
                    checkEmail ? (
                      <AiOutlineExclamationCircle className="text-red-500 absolute right-3 bottom-6" />
                    ) : (
                      <AiOutlineCheckCircle className="text-green-500 absolute right-3 bottom-6" />
                    )
                  ) : null}
                </div>
              </div>
            </div>

            <div className=" w-[70%]">
              <div className="">
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="w-full flex flex-col items-start mb-2"
                  >
                    <p className="text-sm ml-1"> Password</p>
                  </label>

                  <div className="w-full flex items-center">
                    {showPassword === true ? (
                      <input
                        type="text"
                        name="password"
                        value={Password}
                        onChange={(e) => {
                          setShow3(false);
                          setPassword(e.target.value);
                        }}
                        className={
                          DarkMode === true
                            ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                            : "w-full border-2 border-gray-300 rounded-xl px-4 py-2 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                        }
                        placeholder="Enter your password"
                        required
                      />
                    ) : (
                      <input
                        type="password"
                        name="password"
                        value={Password}
                        onChange={(e) => {
                          setShow3(false);
                          setPassword(e.target.value);
                        }}
                        className={
                          DarkMode === true
                            ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                            : "w-full border-2 border-gray-300 rounded-xl px-4 py-2 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                        }
                        placeholder="Enter your password"
                        required
                      />
                    )}

                    {showPassword === true ? (
                      <BsEye
                        onClick={() => setShowPassword(!showPassword)}
                        size="1.3em"
                        className="self-center -ml-10 cursor-pointer text-gray-400 hover:text-black"
                      />
                    ) : (
                      <BsEye
                        onClick={() => setShowPassword(!showPassword)}
                        size="1.3em"
                        className="self-center -ml-10 cursor-pointer text-gray-400 hover:text-black"
                      />
                    )}
                  </div>
                  <div className="space-y-1 mt-2">
                    {show3 ? (
                      <>
                        <div className="flex flex-row space-x-2">
                          <GoPrimitiveDot className="text-gray-400 text-xs" />
                          <p className="text-gray-400 text-xs">
                            Password must be of 8 characters
                          </p>
                        </div>

                        <div className="flex flex-row space-x-2">
                          <GoPrimitiveDot className="text-gray-400 text-xs" />
                          <p className="text-gray-400 text-xs">
                            One Capital or one special character
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-row space-x-2">
                          <AiOutlineCloseCircle
                            className={`${
                              Password.length < 8
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          />
                          <p
                            className={`${
                              Password.length < 8
                                ? "text-red-400"
                                : "text-green-400"
                            } text-xs`}
                          >
                            Password must be of 8 characters
                          </p>
                        </div>
                        <div className="flex flex-row space-x-2">
                          <AiOutlineCloseCircle
                            className={`${
                              !passCapital || !passSpecial
                                ? "text-green-400"
                                : "text-red-400"
                            } `}
                          />
                          <p
                            className={`${
                              !passCapital || !passSpecial
                                ? "text-green-400"
                                : "text-red-400"
                            } text-xs`}
                          >
                            One Capital or one special character
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex my-3 mt-5 flex-wrap  items-center justify-center">
              <button className="md:w-[70%] flex  items-center justify-center py-2 border-black border-2 rounded-lg bg-white text-black">
                <p className="font-bold text-2xl mr-1">
                  <AiOutlineGoogle />
                </p>
                Sign up with Google
              </button>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-[30%] border-t border-gray-400 mt-2"></div>
              <div className="px-5">
                <h2 className="text-sm text-gray-500">Or</h2>
              </div>
              <div className="w-[30%] border-t border-gray-400 mt-2"></div>
            </div>
            <div className="my-3 w-[70%]">
              <button
                disabled={BtnDisabled}
                style={
                  DarkMode === true
                    ? {
                        backgroundColor: "var(--bg-fill1)",
                        color: "var(--txtColor2)",
                      }
                    : {
                        background: "#FD584A",
                        color: "var(--txtColor2)",
                      }
                }
                className="inline-block rounded-xl font-medium cursor-pointer text-center text-base py-2 px-6  w-full"
                type="submit"
              >
                {BtnDisabled === false ? (
                  "Sign up for free"
                ) : (
                  <PulseLoader
                    color={"white"}
                    size={10}
                    style={{ zIndex: "-10" }}
                  />
                )}
              </button>
            </div>

            <div className="w-full flex items-center justify-center">
              <div className="flex flex-row">
                <p className="text-xs">Already have an account?</p>
                <a
                  className="text-xs text-red-500 ml-1 cursor-pointer underline"
                  onClick={() => navigate("/Login-Page")}
                >
                  Log in now
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Right hand side  */}
      <div className="w-full md:w-[50%] md:h-full bg-[#FC594A] flex flex-col md:justify-center rounded-l-3xl text-white">
        <div className="w-full p-5 flex flex-col justify-center px-8 sm:px-20 md:px-10 lg:px-20">
          <img
            className="w-[25%] h-[80%] ml-5 rounded-full"
            src={image}
            alt="Image"
          />
        </div>
        <p className="text-2xl ml-20 font-bold text-white tracking tracking-widest ">
          Brilliant tool - Undorned,
        </p>
        <p className="text-2xl ml-20 font-bold text-white tracking tracking-widest ">
          Simple and clearly arranged.
        </p>
        <p className="text-sm mt-10 ml-20 text-white tracking tracking-widest ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
          dolorem tempora repudiandae! Ab, nulla nam.
        </p>
        <p className="text-xs mt-3 ml-20 text-white tracking tracking-widest ">
          J. K. Rawling - Lorem ipsum dolor sit.
        </p>
      </div>
    </div>
  );
}

export default Login;
