import React, { useState, useContext, useEffect } from "react";
import "../App.css";
import { ThemeContext } from "../App";
import { AiFillFire, AiFillGift, AiOutlineCheckCircle } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { BsCodeSlash, BsWindowSidebar } from "react-icons/bs";
import dataext from "../Assets/Images/Data-ext.png";
import feature1 from "../Assets/Images/feature1.png";
import feature2 from "../Assets/Images/feature2.png";
import feature3 from "../Assets/Images/feature3.png";
import feature4 from "../Assets/Images/feature4.png";
import FeatureCard from "../Components/Cards/FeatureCard";
import Pricing from "../Components/Pricing";
import GetToKnowUs from "../Components/ReUsables/GetToKnowUs";
import Testimonials from "../Components/ReUsables/Testimonials";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import ServicesCard from "../Components/Cards/ServicesCard";
import ServicesTab from "../Components/Tabs/ServicesTab";
import Achievements from "../Components/ReUsables/Achievements";
import Header from "../Components/HeaderFooter/Header";
import Footer from "../Components/HeaderFooter/Footer";
import one from "../Assets/Images/1.png";
import two from "../Assets/Images/2.png";
import three from "../Assets/Images/3.png";
import TopServices from "../Components/Cards/TopServices";
import LoginRegisterModal from "../Components/Modals/LoginRegisterModal";
import LtoRBanner from "../Components/Banners/LtoRBanner";
import RtoLBanner from "../Components/Banners/RtoLBanner";
import HeroSection from "../Components/HeroSection/HeroSection";

function Home() {
  let navigate = useNavigate();

  const { DarkMode, setHeaderShow } = useContext(ThemeContext);

  const features = [
    {
      name: "Fast",
      img: one,
      content:
        "Searches literally take seconds to complete before you can download the results.",
    },
    {
      name: "Targetted",
      img: two,
      content:
        "You are in control of who you target whether that be bars, restaurants or dentists etc, Street View Spectator provides you with the targeted results.",
    },
    {
      name: "Accurate",
      img: three,
      content:
        "Our results are incredibly accurate and speak for themselves. If you do happen to find an error, please let us know so that we can improve our algorithm.",
    },
  ];
  const [data, setData] = useState(features);

  useEffect(() => {
    setHeaderShow(true);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Instagram Automation | Home</title>
      </Helmet>

      {/* HERO SECTION  */}
      <HeroSection/>

      {/* TOP FEATURES  */}
      <section>
        <div
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--btn-bgColor1)",
                }
              : {
                  backgroundColor: "var(--bg-fill3)",
                }
          }
          className="w-full px-5 md:px-0 md:p-10 "
        >
          {/* <div className="w-full py-10 flex text-center justify-center items-center">
            <h2
              style={
                DarkMode === true
                  ? { color: "var(--txtColor2)" }
                  : { color: "var(--txtColor1)" }
              }
              className=" text-3xl md:text-4xl font-semibold"
            >
              Our Top Services
            </h2>
          </div> */}

          {/* <div className="w-full pb-20">
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 md:gap-10 md:m-6 text-center">
              {data.map((obj) => {
                return (
                  <>
                    <FeatureCard obj={obj} />
                  </>
                )
              })}
            </ul>
          </div> */}
          <div className="w-full px-10 py-10">
            <TopServices />
          </div>
        </div>
      </section>

      {/* Services offered  */}
      {/* <section>
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
          <div className="w-full lg:w-1/2 flex justify-center items-center pb-10 lg:pb-0 lg:pt-10">
            <img className="w-10/12 lg:w-5/6" src={feature1} alt="" />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center lg:text-left px-5 lg:px-0 lg:pr-10 space-y-10">
            <div className="w-full flex flex-col items-center md:flex-row px-5 lg:px-10">
              <div className="h-full  ">
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

            <div className="w-full flex flex-col items-center md:flex-row px-5 lg:px-10">
              <div className="h-full  ">
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

            <div className="w-full flex-col items-center md:flex-row flex px-5 lg:px-10">
              <div className="h-full  ">
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
      </section> */}


      {/* <div className="w-full text-center flex flex-col items-center">
        <h2 className="text-4xl font-bold pb-5">More To Discover</h2>
        <p className="w-10/12 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad atque
          reprehenderit maxime totam blanditiis molestias laborum nam, dolores
          quo provident.
        </p>
      </div> */}
      {/* More to discover 1 */}
      {/* <LtoRBanner
        image={feature2}
        number={"01"}
        heading1={"Getting Started Page"}
      /> */}
      {/* More to discover 2 */}
      {/* <RtoLBanner
        image={feature3}
        number={"02"}
        heading1={"Outdated Comments Toggling"}
      /> */}
      {/* More to discover 3 */}
      {/* <LtoRBanner
        image={feature4}
        number={"03"}
        heading1={"Code Review Illustrators"}
      /> */}

      {/* Achievements 1  */}
      {/* <section>
        <Achievements />
      </section> */}

      {/* ACHIEVEMENTS 2 */}
      {/* <section
        style={
          DarkMode === true
            ? {
                backgroundColor: "var(--txtColor3)",
              }
            : {
                backgroundColor: "var(--bg-fill3)",
              }
        }
        className="pb-20 lg:py-20 "
      >
        <div className="w-full md:px-20 flex flex-col lg:flex-row ">
          <div className="w-full lg:w-1/2 flex flex-col px-5 lg:px-10">
            <div className="w-full h-full flex flex-col items-center lg:justify-center lg:items-start text-center lg:text-start">
              <h2 className="text-xl mt-5 lg:mt-0 font-bold py-2">
                Why Choose Us ?
              </h2>
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
              <div className="w-full space-y-2 pt-5">
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
      </section> */}

      {/* SERVICES TAB  */}
      {/* <section
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
      </section> */}

      {/* TESTIMONIALS  */}
      <section>
        <Testimonials />
      </section>

      <section>
        <Pricing />
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

export default Home;
