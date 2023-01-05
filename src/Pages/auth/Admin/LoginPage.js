import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineGoogle } from "react-icons/ai";
import { BsEye, BsTwitter } from "react-icons/bs";
import { BiShow, BiHide } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import ApiURL from "../../../Config/Config";
import Helmet from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { ThemeContext } from "../../../App";
import TotalServices from "../../../TotalServices";

function LoginPage() {
  const [ForgotPass, setForgotPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");

  // VERIFICATION
  const [userName, setUserName] = useState("");
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("");
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [BtnDisabled2, setBtnDisabled2] = useState(false);

  const {
    DarkMode,
    setRefreshAdminLogin,
    RefreshAdminLogin,
    setShowModal,
    setHeaderShow,
  } = useContext(ThemeContext);

  let navigate = useNavigate();

  // LOGIN API STARTS
  const handleLogin = async () => {
    setBtnDisabled(true);

    try {
      var res = await TotalServices.login({
        email: Email,
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

  return (
    <div className="w-full h-screen flex flex-col md:items-center md:justify-center md:flex-row">
      <Helmet>
        <title>Instagram Automation| Admin | Login</title>
      </Helmet>
      <ToastContainer />
      {/* right hand side  */}
      <div className="w-full md:w-[60%] h-full relative flex items-center justify-center">
        <form
          className="w-10/12 sm:w-2/3 text-center pb-10 lg:pb-0"
          onSubmit={(e) => (e.preventDefault(), handleLogin())}
        >
          <div
            style={
              DarkMode === true
                ? { color: "var(--txtColor2)" }
                : { color: "var(--txtColor1)" }
            }
            className="mt-10 w-full flex flex-col items-center"
          >
            <h2 className="text-2xl  font-semibold text-black-800">
              Login in to merged
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

          <div className="mt-3 w-full flex md:items-center flex-col">
            <div className="my-6 w-[70%]">
              <div className="">
                <div className="">
                  <label
                    htmlFor="username"
                    className=" flex flex-col items-start space-y-2"
                  >
                    <p className="text-sm ml-1"> Email Adress</p>
                    <input
                      type="text"
                      name="username"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={
                        DarkMode === true
                          ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                          : "w-full  rounded-lg border-2 border-gray-300 px-4 py-2 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                      }
                      placeholder="Enter your email"
                      required
                    />
                  </label>
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
                        onChange={(e) => setPassword(e.target.value)}
                        className={
                          DarkMode === true
                            ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                            : "w-full border-2 border-gray-300 rounded-lg px-4 py-2 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                        }
                        placeholder="Enter your password"
                        required
                      />
                    ) : (
                      <input
                        type="password"
                        name="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={
                          DarkMode === true
                            ? "w-full border border-black-300 bg-gray-300 text-gray-600 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                            : "w-full border-2 border-gray-300 rounded-lg px-4 py-2 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
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
                </div>
              </div>
            </div>
            <div className="my-6 w-[70%]">
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
                className="inline-block rounded-lg font-medium cursor-pointer text-center text-base py-2 px-6  w-full"
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
            <div className="text-center">
              <a
                onClick={() => setForgotPass(!ForgotPass)}
                className="text-red-500 cursor-pointer"
              >
                Forgot password?
              </a>
            </div>
            <div className="w-full flex justify-center py-5">
              <div className="w-[30%] border-t border-gray-400 mt-2"></div>
              <div className="px-5">
                <h2 className="text-sm text-gray-500">Or</h2>
              </div>
              <div className="w-[30%] border-t border-gray-400 mt-2"></div>
            </div>
            <div className="w-full flex my-2 flex-wrap  items-center justify-center">
              <button className="md:w-[70%] flex  items-center py-1  border-black border-2  rounded-xl bg-white text-black">
                <p className="font-bold text-3xl ml-5 mr-24">
                  <AiOutlineGoogle />
                </p>
                Log in with Google
              </button>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-row">
                <p className="text-xs">Don't have an account?</p>
                <a
                  className="text-xs text-red-500 ml-1 cursor-pointer underline"
                  onClick={() => navigate("/signupPage")}
                >
                  Sign up now
                </a>
              </div>
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
            <h2 className="text-lg py-3 cursor-pointer">Forgot Password ?</h2>
            <p className="text-sm text-red-600 pb-2" id="email"></p>
            <p className="text-sm text-red-600 pb-2" id="email2"></p>

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
                        background: "var(--bg-fill4)",
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
  );
}

export default LoginPage;
