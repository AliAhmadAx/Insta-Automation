import React, { useState, useContext, useEffect } from "react";
import "../../App.css";
import { ThemeContext } from "../../App";
import { AiFillFire, AiFillGift, AiOutlineCheckCircle } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { BsCodeSlash, BsWindowSidebar } from "react-icons/bs";
import feature1 from "../../Assets/Images/feature1.png";
import ServicesCard from "../../Components/Cards/ServicesCard";
import feature2 from "../../Assets/Images/feature2.png";
import feature3 from "../../Assets/Images/feature3.png";
import feature4 from "../../Assets/Images/feature4.png";
import GetToKnowUs from "../../Components/ReUsables/GetToKnowUs";
import Achievements from "../../Components/ReUsables/Achievements";
import Helmet from "react-helmet";
import Header from "../../Components/HeaderFooter/Header";
import Footer from "../../Components/HeaderFooter/Footer";
import { useNavigate } from "react-router-dom";
import ServicesTab from "../../Components/Tabs/ServicesTab";

function Services() {
  const { DarkMode, setHeaderShow } = useContext(ThemeContext);
  let navigate = useNavigate();

  useEffect(() => {
    setHeaderShow(true);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Instagram Automation | Services</title>
      </Helmet>

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
          className="w-full flex flex-col justify-center dashboard_color items-center h-96 text-5xl"
        >
          <h2>Services</h2>
          <p className="text-2xl pt-3">To the best of our Capabilities</p>
        </div>
      </section>

      {/* ACHIEVEMENTS 2 */}
      <section
        style={
          DarkMode === true
            ? {
                backgroundColor: "var(--txtColor3)",
              }
            : {
                backgroundColor: "var(--bg-fill3)",
              }
        }
        className="pt-10 pb-20 lg:py-20 "
      >
        <div className="w-full md:px-20 flex flex-col lg:flex-row ">
          {/* Left HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex flex-col px-5 lg:px-10">
            {/* SERVICE 1  */}
            {/* left or heading side  */}
            <div className="w-full h-full flex flex-col items-center lg:justify-center lg:items-start text-center lg:text-start">
              <h2 className="text-xl font-bold py-2">Why Choose Us ?</h2>
              <p
                style={
                  DarkMode === true
                    ? { color: "var(--txtColor1)" }
                    : { color: "var(--txtColor3)" }
                }
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aspernatur ea voluptate harum unde alias? Assumenda atque hic
                mollitia? Pariatur, mollitia.
              </p>
              {/* points  */}
              <div className="w-full space-y-2 pt-5">
                {/* point 1  */}
                <div className="flex items-center">
                  <div
                    style={
                      DarkMode === true
                        ? { color: "var(--bg-fill5)" }
                        : { color: "var(--btn-bgColor2)" }
                    }
                  >
                    <AiOutlineCheckCircle />
                  </div>
                  <p
                    style={
                      DarkMode === true
                        ? { color: "var(--txtColor1)" }
                        : { color: "var(--txtColor3)" }
                    }
                    className="px-5"
                  >
                    Unique Design
                  </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div
                    style={
                      DarkMode === true
                        ? { color: "var(--bg-fill5)" }
                        : { color: "var(--btn-bgColor2)" }
                    }
                  >
                    <AiOutlineCheckCircle />
                  </div>
                  <p
                    style={
                      DarkMode === true
                        ? { color: "var(--txtColor1)" }
                        : { color: "var(--txtColor3)" }
                    }
                    className="px-5"
                  >
                    Unlimited Video Call
                  </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div
                    style={
                      DarkMode === true
                        ? { color: "var(--bg-fill5)" }
                        : { color: "var(--btn-bgColor2)" }
                    }
                  >
                    <AiOutlineCheckCircle />
                  </div>
                  <p
                    style={
                      DarkMode === true
                        ? { color: "var(--txtColor1)" }
                        : { color: "var(--txtColor3)" }
                    }
                    className="px-5"
                  >
                    Add Favorite Contact
                  </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div
                    style={
                      DarkMode === true
                        ? { color: "var(--bg-fill5)" }
                        : { color: "var(--btn-bgColor2)" }
                    }
                  >
                    <AiOutlineCheckCircle />
                  </div>
                  <p
                    style={
                      DarkMode === true
                        ? { color: "var(--txtColor1)" }
                        : { color: "var(--txtColor3)" }
                    }
                    className="px-5"
                  >
                    Camera Filter{" "}
                  </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div
                    style={
                      DarkMode === true
                        ? { color: "var(--bg-fill5)" }
                        : { color: "var(--btn-bgColor2)" }
                    }
                  >
                    <AiOutlineCheckCircle />
                  </div>
                  <p
                    style={
                      DarkMode === true
                        ? { color: "var(--txtColor1)" }
                        : { color: "var(--txtColor3)" }
                    }
                    className="px-5"
                  >
                    Unique Design
                  </p>
                </div>
              </div>
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
                onClick={() => navigate("/pricing")}
              >
                <AiFillFire
                  size="1.3em"
                  color={DarkMode === true ? "" : "orange"}
                  className="mr-2 self-center"
                />
                Get Started
              </button>
            </div>
          </div>

          {/* Right HAND SIDE  */}
          <div className="w-full lg:w-1/2 pt-20 lg:pt-0 lg:space-x-5 flex flex-col lg:flex-row px-10 justify-center items-center">
            <div className="pb-5 lg:pb-0">
              <ServicesCard />
            </div>

            <div className="space-y-5">
              <ServicesCard />
              <ServicesCard />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES TAB  */}
      <section
        style={
          DarkMode === true
            ? {
                backgroundColor: "var(--txtColor3)",
              }
            : {
                backgroundColor: "var(--bg-fill3)",
              }
        }
        className="pb-10 lg:py-20 "
      >
        <ServicesTab />
      </section>

      {/* Services offered  */}
      <section>
        <div
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--txtColor3)",
                }
              : {
                  backgroundColor: "var(--bg-fill3)",
                }
          }
          className="w-full flex flex-col lg:flex-row lg:py-20"
        >
          {/* LEFT HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex justify-center items-center pb-10 lg:pb-0 lg:pt-10">
            <img className="w-10/12 lg:w-5/6" src={feature1} alt="" />
          </div>

          {/* RIGHT HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center lg:text-left px-5 lg:px-0 lg:pr-10 space-y-10">
            {/* SERVICE 1  */}
            <div className="w-full flex flex-col items-center md:flex-row px-5 lg:px-10">
              {/* left side or icon side  */}
              <div className="h-full  ">
                {/* icon bg  */}
                <div
                  className={
                    DarkMode === true
                      ? "md:mr-7 py-1 px-1 bg-gray-500 rounded-tl-none hover:rounded-tl-full transition-all ease-in-out duration-500 rounded-r-full text-gray-300 rounded-b-full rounded-l-full w-fit"
                      : "md:mr-7 py-1 px-1 bg-emerald-500 rounded-tl-none hover:rounded-tl-full transition-all ease-in-out duration-500 rounded-r-full text-white rounded-b-full rounded-l-full w-fit"
                  }
                >
                  <BiPhoneCall size="2em" className="m-4" />
                </div>
              </div>

              {/* right or heading side  */}
              <div className="w-full">
                <h2
                  style={{ color: "var(--txtColor1)" }}
                  className="text-xl font-bold py-2"
                >
                  Free Calling Service
                </h2>
                <p
                  style={
                    DarkMode === true
                      ? { color: "var(--txtColor4)" }
                      : { color: "var(--txtColor3)" }
                  }
                >
                  Plan ahead by day, week, or month, and see project status at a
                  glance. Search and filter to focus in on anything form a
                  single project to an individual person's workload.
                </p>
              </div>
            </div>

            {/* SERVICE 2  */}
            <div className="w-full flex flex-col items-center md:flex-row px-5 lg:px-10">
              {/* left side or icon side  */}
              <div className="h-full  ">
                {/* icon bg  */}
                <div
                  className={
                    DarkMode === true
                      ? "md:mr-7 py-1 px-1 bg-gray-500 rounded-tl-none hover:rounded-tl-full transition-all ease-in-out duration-500 rounded-r-full text-gray-300 rounded-b-full rounded-l-full w-fit"
                      : "md:mr-7 py-1 px-1 bg-blue-500 rounded-tl-none hover:rounded-tl-full transition-all ease-in-out duration-500 rounded-r-full text-white rounded-b-full rounded-l-full w-fit"
                  }
                >
                  <AiFillGift size="2em" className="m-4" />
                </div>
              </div>

              {/* right or heading side  */}
              <div className="w-full">
                <h2
                  style={{ color: "var(--txtColor1)" }}
                  className="text-xl font-bold py-2"
                >
                  Daily Free Gift
                </h2>
                <p
                  style={
                    DarkMode === true
                      ? { color: "var(--txtColor4)" }
                      : { color: "var(--txtColor3)" }
                  }
                >
                  Plan ahead by day, week, or month, and see project status at a
                  glance. Search and filter to focus in on anything form a
                  single project to an individual person's workload.
                </p>
              </div>
            </div>

            {/* SERVICE 3  */}
            <div className="w-full flex-col items-center md:flex-row flex px-5 lg:px-10">
              {/* left side or icon side  */}
              <div className="h-full  ">
                {/* icon bg  */}
                <div
                  className={
                    DarkMode === true
                      ? "md:mr-7 py-1 px-1 bg-gray-500 rounded-tl-none hover:rounded-tl-full transition-all ease-in-out duration-500 rounded-r-full text-gray-300 rounded-b-full rounded-l-full w-fit"
                      : "md:mr-7 py-1 px-1 bg-orange-500 rounded-tl-none hover:rounded-tl-full transition-all ease-in-out duration-500 rounded-r-full text-white rounded-b-full rounded-l-full w-fit"
                  }
                >
                  <BsCodeSlash size="2em" className="m-4" />
                </div>
              </div>

              {/* right or heading side  */}
              <div className="w-full">
                {" "}
                <h2
                  style={{ color: "var(--txtColor1)" }}
                  className="text-xl font-bold py-2"
                >
                  QR Code Scanner
                </h2>
                <p
                  style={
                    DarkMode === true
                      ? { color: "var(--txtColor4)" }
                      : { color: "var(--txtColor3)" }
                  }
                >
                  Plan ahead by day, week, or month, and see project status at a
                  glance. Search and filter to focus in on anything form a
                  single project to an individual person's workload.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More to discover 1 */}
      <section
        style={
          DarkMode === true
            ? {
                color: "var(--txtColor2)",
                backgroundColor: "var(--bg-fill1)",
              }
            : {
                backgroundColor: "var(--bg-fill3)",
              }
        }
        className="py-20"
      >
        <div className="w-full text-center flex flex-col items-center">
          <h2 className="text-4xl font-bold pb-5">More To Discover</h2>
          <p className="w-10/12 lg:pb-20">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad atque
            reprehenderit maxime totam blanditiis molestias laborum nam, dolores
            quo provident.
          </p>
        </div>

        <div className="w-full md:px-20 flex flex-col lg:flex-row ">
          {/* LEFT HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex justify-center items-center pb-10 lg:pb-0 pt-10 lg:pt-0">
            <img className="w-11/12 lg:w-5/6" src={feature2} alt="" />
          </div>

          {/* RIGHT HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex flex-col px-5 lg:px-0 lg:pr-10">
            {/* SERVICE 1  */}
            <div className="w-full flex flex-col items-center lg:items-start pb-2">
              {/* icon bg  */}
              <div
                style={
                  DarkMode === true
                    ? {
                        color: "var(--txtColor2)",
                        backgroundColor: "var(--bg-fill5)",
                      }
                    : {
                        color: "var(--bg-fill3)",
                        backgroundColor: "var(--bg-fill5)",
                      }
                }
                className="mr-7 py-1 px-1 rounded-full w-fit"
              >
                <p className="px-2 py-1">01</p>
              </div>
            </div>

            {/* right or heading side  */}
            <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
              {" "}
              <h2 className="text-xl font-bold py-2">Getting Started Page</h2>
              <p
                style={
                  DarkMode === true
                    ? { color: "var(--txtColor2)" }
                    : { color: "var(--txtColor3)" }
                }
                className=""
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aspernatur ea voluptate harum unde alias? Assumenda atque hic
                mollitia? Pariatur, mollitia.
              </p>
              {/* points  */}
              <div className="w-full space-y-2 pt-5">
                {/* point 1  */}
                <div className="flex">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p
                    style={
                      DarkMode === true
                        ? { color: "var(--txtColor2)" }
                        : { color: "var(--txtColor3)" }
                    }
                    className=" px-5 "
                  >
                    Unique Design
                  </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p
                    style={
                      DarkMode === true
                        ? { color: "var(--txtColor2)" }
                        : { color: "var(--txtColor3)" }
                    }
                    className=" px-5 "
                  >
                    Unlimited Video Call
                  </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p
                    style={
                      DarkMode === true
                        ? { color: "var(--txtColor2)" }
                        : { color: "var(--txtColor3)" }
                    }
                    className="px-5 "
                  >
                    Add Favorite Contact{" "}
                  </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p
                    style={
                      DarkMode === true
                        ? { color: "var(--txtColor2)" }
                        : { color: "var(--txtColor3)" }
                    }
                    className=" px-5 "
                  >
                    Camera Filter{" "}
                  </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p
                    style={
                      DarkMode === true
                        ? { color: "var(--txtColor2)" }
                        : { color: "var(--txtColor3)" }
                    }
                    className=" px-5 "
                  >
                    Unique Design
                  </p>
                </div>
              </div>
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
                    ? "px-6 py-3 mt-10 flex items-center btn-hover2 rounded-md"
                    : "px-6 py-3 mt-10 flex items-center btn-hover4 rounded-md"
                }
                onClick={() => navigate("/pricing")}
              >
                <AiFillFire
                  size="1.3em"
                  color={DarkMode === true ? "var(--bg-fill4)" : "orange"}
                  className="mr-2 self-center"
                />
                View Plans
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* More to discover 2 */}
      <section
        style={
          DarkMode === true
            ? {
                color: "var(--txtColor3)",
                backgroundColor: "var(--bg-fill1)",
              }
            : {
                backgroundColor: "var(--bg-fill3)",
              }
        }
        className="lg:pt-10"
      >
        <div className="w-full md:px-20 flex flex-col-reverse lg:flex-row ">
          {/* Left HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex flex-col px-5 lg:px-10">
            {/* SERVICE 1  */}
            <div className="w-full pt-10 lg:pt-0 flex flex-col items-center lg:items-start pb-2">
              {/* icon bg  */}
              <div
                style={
                  DarkMode === true
                    ? {
                        color: "var(--txtColor3)",
                        backgroundColor: "var(--bg-fill5)",
                      }
                    : {
                        color: "var(--bg-fill3)",
                        backgroundColor: "var(--bg-fill5)",
                      }
                }
                className="mr-7 py-1 px-1 rounded-full w-fit"
              >
                <p className="px-2 py-1">02</p>
              </div>
            </div>

            {/* left or heading side  */}
            <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-start">
              {" "}
              <h2 className="text-xl font-bold py-2">
                Outdated Comments Toggling
              </h2>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aspernatur ea voluptate harum unde alias? Assumenda atque hic
                mollitia? Pariatur, mollitia.
              </p>
              {/* points  */}
              <div className="w-full space-y-2 pt-5">
                {/* point 1  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Unique Design</p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Unlimited Video Call</p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className="px-5 text-gray-500">Add Favorite Contact </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Camera Filter </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Unique Design</p>
                </div>
              </div>
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
                    ? "px-6 py-3 mt-10 flex items-center btn-hover2 rounded-md"
                    : "px-6 py-3 mt-10 flex items-center btn-hover4 rounded-md"
                }
                onClick={() => navigate("/pricing")}
              >
                <AiFillFire
                  size="1.3em"
                  color={DarkMode === true ? "var(--bg-fill4)" : "orange"}
                  className="mr-2 self-center"
                />
                View Plans
              </button>
            </div>
          </div>

          {/* Right HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <img className="w-11/12 lg:w-5/6" src={feature3} alt="" />
          </div>
        </div>
      </section>

      {/* More to discover 3 */}
      <section
        style={
          DarkMode === true
            ? {
                color: "var(--txtColor3)",
                backgroundColor: "var(--bg-fill1)",
              }
            : {
                backgroundColor: "var(--bg-fill3)",
              }
        }
        className="lg:pt-10 pb-20"
      >
        <div className="w-full md:px-20 flex flex-col lg:flex-row ">
          {/* LEFT HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex justify-center items-center pt-10 lg:pt-0">
            <img className="w-11/12 lg:w-5/6" src={feature4} alt="" />
          </div>

          {/* RIGHT HAND SIDE  */}
          <div className="w-full pt-10 lg:pt-0 lg:w-1/2 flex flex-col px-5 lg:px-10">
            {/* SERVICE 1  */}
            <div className="w-full flex flex-col items-center lg:items-start pb-2">
              {/* icon bg  */}
              <div
                style={
                  DarkMode === true
                    ? {
                        color: "var(--txtColor3)",
                        backgroundColor: "var(--bg-fill5)",
                      }
                    : {
                        color: "var(--bg-fill3)",
                        backgroundColor: "var(--bg-fill5)",
                      }
                }
                className="mr-7 py-1 px-1 rounded-full w-fit"
              >
                <p className="px-2 py-1">03</p>
              </div>
            </div>

            {/* right or heading side  */}
            <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
              {" "}
              <h2 className="text-xl font-bold py-2">
                Code Review Illustrators
              </h2>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aspernatur ea voluptate harum unde alias? Assumenda atque hic
                mollitia? Pariatur, mollitia.
              </p>
              {/* points  */}
              <div className="w-full space-y-2 pt-5">
                {/* point 1  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Unique Design</p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Unlimited Video Call</p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className="px-5 text-gray-500">Add Favorite Contact </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Camera Filter </p>
                </div>
                {/* point 2  */}
                <div className="flex items-center">
                  <div className="text-emerald-500 ">
                    <AiOutlineCheckCircle />
                  </div>
                  <p className=" px-5 text-gray-500">Unique Design</p>
                </div>
              </div>
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
                    ? "px-6 py-3 mt-10 flex items-center btn-hover2 rounded-md"
                    : "px-6 py-3 mt-10 flex items-center btn-hover4 rounded-md"
                }
                onClick={() => navigate("/pricing")}
              >
                <AiFillFire
                  size="1.3em"
                  color={DarkMode === true ? "var(--bg-fill4)" : "orange"}
                  className="mr-2 self-center"
                />
                View Plans
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements 1  */}
      <section>
        <Achievements />
      </section>

      <section
        style={
          DarkMode === true
            ? { backgroundColor: "var(--bg-fill1)" }
            : { backgroundColor: "var(--bg-fill3)" }
        }
        className="py-20"
      >
        <GetToKnowUs />
      </section>

      <Footer />
    </div>
  );
}

export default Services;
