import React, { useEffect, useContext, useState } from "react";
import { ThemeContext } from "../../App";
import GetToKnowUs from "../../Components/ReUsables/GetToKnowUs";
import Pricing from "../../Components/Pricing";
import Helmet from "react-helmet";
import Header from "../../Components/HeaderFooter/Header";
import Footer from "../../Components/HeaderFooter/Footer";

function PricingPage() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const { DarkMode, setHeaderShow } = useContext(ThemeContext);

  useEffect(() => {
    setHeaderShow(true);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Instagram Automation | Pricing</title>
      </Helmet>

      <div></div>
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
          className="w-full flex flex-col justify-center dashboard_color mb-24 items-center h-96 text-5xl"
        >
          <h2>Pricing</h2>
          <p className="text-2xl pt-3">Border-less Account Pricing</p>
        </div>
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

export default PricingPage;
