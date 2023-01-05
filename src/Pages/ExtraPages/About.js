import React, { useState, useContext } from "react";
import { ThemeContext } from "../../App";
import GetToKnowUs from "../../Components/ReUsables/GetToKnowUs";
import aboutimg from "../../Assets/Images/about-img.jpg";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Helmet from "react-helmet";
import Achievements from "../../Components/ReUsables/Achievements";
import Header from "../../Components/HeaderFooter/Header";
import Footer from "../../Components/HeaderFooter/Footer";
import { useEffect } from "react";

function About() {
  const { DarkMode, setHeaderShow } = useContext(ThemeContext);

  useEffect(() => {
    setHeaderShow(true);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Instagram Automation | About</title>
      </Helmet>

      <section>
        <div className="w-full flex flex-col dashboard_color justify-center items-center h-96 text-5xl">
          <h2>About Us</h2>
          <p className="text-2xl pt-3">The Spectators Story</p>
        </div>
      </section>

      {/* More to discover 2 */}
      <section
        style={
          DarkMode === true
            ? { backgroundColor: "var(--txtColor3)" }
            : { backgroundColor: "var(--txtColor2)" }
        }
        className="py-20 "
      >
        <div className="w-full flex flex-col lg:flex-row ">
          {/* Left HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex flex-col lg:justify-center items-center lg:items-start text-center lg:text-left  px-5 lg:pl-20">
            <p
              style={
                DarkMode === true
                  ? { color: "var(--txtColor2)" }
                  : { color: "var(--txtColor1)" }
              }
              className="py-1"
            >
              How We Are Featured
            </p>

            {/* left or heading side  */}
            <div
              style={
                DarkMode === true
                  ? { color: "var(--txtColor2)" }
                  : { color: "var(--txtColor1)" }
              }
              className="w-full flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <h2 className="text-4xl font-bold py-3">
                Take Your Business To The Next Level
              </h2>
              <p className=" pb-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aspernatur ea voluptate harum unde alias? Assumenda atque hic
                mollitia? Pariatur, mollitia.
              </p>
              <p className=" pb-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aspernatur ea.
              </p>
              <p className="">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aspernatur ea voluptate harum unde alias? Assumenda atque hic
                mollitia? Pariatur, mollitia.
              </p>
            </div>
          </div>

          {/* Right HAND SIDE  */}
          <div className="w-full lg:w-1/2 flex justify-center items-center pt-10 lg:pt-0">
            <img className="w-10/12" src={aboutimg} alt="" />
          </div>
        </div>
      </section>

      {/* achievements 1  */}
      <Achievements />

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

export default About;
