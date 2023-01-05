import React, { useContext } from "react";
import Helmet from "react-helmet";
import { ThemeContext } from "../../App";
import { useEffect } from "react";
import { useState } from "react";
import ApiURL from "../../Config/Config";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../Components/HeaderFooter/Header";
import Footer from "../../Components/HeaderFooter/Footer";
import { useNavigate } from "react-router-dom";

function Contact() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    // window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const { DarkMode, setHeaderShow } = useContext(ThemeContext);

  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [message, SetMessage] = useState("");

  let navigate = useNavigate();

  const SendEmail = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (name === "" || email === "" || message === "") {
      document.getElementById("error").innerHTML =
        "Please fill the empty field(s)!";
    } else if (!regex.test(email)) {
      document.getElementById("error").innerHTML = "Email is Invalid";
    } else {
      var raw = JSON.stringify({
        user_name: name,
        email: email,
        phone: phone,
        message: message,
      });

      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: raw,
        redirect: "follow",
      };

      fetch(ApiURL + "/contact", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            document.getElementById("error").innerHTML = "";

            toast.success(result.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            navigate("/");
          } else toast.error("Oops! an Error Occurred!");
        })
        .catch((error) => console.log("error", error));
    }
  };

  useEffect(() => {
    setHeaderShow(true);
  }, []);

  return (
    <div
      style={
        DarkMode === true
          ? { backgroundColor: "var(--bg-fill4)" }
          : { backgroundColor: "var(--bg-fill3)" }
      }
    >
      <Helmet>
        <title>Instagram Automation | Contact Us</title>
      </Helmet>

      <ToastContainer />

      {/* hero section  */}
      <section>
        <div
          // style={
          //   DarkMode === true
          //     ? {
          //         color: "var(--txtColor2)",
          //         backgroundColor: "var(--bg-fill8)",
          //       }
          //     : {
          //         color: "var(--txtColor1)",
          //         backgroundColor: "var(--bg-fill12)",
          //       }
          // }
          className="w-full flex dashboard_color flex-col text-center justify-center items-center h-96 text-5xl"
        >
          <h2>Contact Us</h2>
          <p className="text-2xl pt-3">Drop us an Email for any Query</p>
        </div>
      </section>

      <div
        // style={
        //   DarkMode === true
        //     ? { backgroundColor: "var(--bg-fill7)" }
        //     : { backgroundColor: "var(--bg-fill5)" }
        // }
        className="max-w-screen-xl mt-24 px-8 mb-20 bg-gray-900 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto text-gray-900 rounded-lg shadow-lg"
      >
        <div
          style={
            DarkMode === true
              ? { color: "var(--bg-fill4)" }
              : { color: "var(--txtColor2)" }
          }
          className="flex flex-col justify-between"
        >
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Lets talk about everything!
            </h2>
            <p id="error" className="py-5 text-red-500"></p>
          </div>
        </div>
        <div
          style={
            DarkMode === true
              ? { color: "var(--bg-fill4)" }
              : { color: "var(--txtColor2)" }
          }
          className=""
        >
          <div>
            <span className="uppercase text-sm  font-bold flex">
              Full Name<p className="text-red-500 text-sm">*</p>
            </span>
            <input
              style={
                DarkMode === true
                  ? { color: "var(--txtColor1)" }
                  : { color: "var(--txtColor1)" }
              }
              className="w-full bg-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=""
              value={name}
              required
              onChange={(e) => SetName(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <span className="uppercase text-sm font-bold flex">
              Email<p className="text-red-500 text-sm">*</p>
            </span>
            <input
              style={
                DarkMode === true
                  ? { color: "var(--txtColor1)" }
                  : { color: "var(--txtColor1)" }
              }
              className="w-full bg-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              required
              onChange={(e) => SetEmail(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <span className="uppercase text-sm font-bold">Phone </span>
            <input
              style={
                DarkMode === true
                  ? { color: "var(--txtColor1)" }
                  : { color: "var(--txtColor1)" }
              }
              className="w-full bg-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="number"
              value={phone}
              required
              onChange={(e) => SetPhone(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <span className="uppercase text-sm font-bold flex">
              Message <p className="text-red-500 text-sm">*</p>
            </span>
            <textarea
              style={
                DarkMode === true
                  ? { color: "var(--txtColor1)" }
                  : { color: "var(--txtColor1)" }
              }
              className="w-full h-32 bg-white mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              value={message}
              required
              onChange={(e) => SetMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-8">
            <button
              // style={
              //   DarkMode === true
              //     ? { backgroundColor: "var(--bg-fill6)" }
              //     : { backgroundColor: "var(--bg-fill2)" }
              // }
              className="uppercase text-sm bg-white text-black hover:bg-black hover:text-white tracking-wide p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
              onClick={() => SendEmail()}
            >
              Send Email
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
