import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../../Assets/Images/logo_dark.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ApiURL from "../../../Config/Config";
import Helmet from "react-helmet";
import { GrStripe } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import { RiH1 } from "react-icons/ri";
import { BiShow, BiHide } from "react-icons/bi";
import ScaleLoader from "react-spinners/ScaleLoader";
import { stringify } from "postcss";
import TotalServices from "../../../TotalServices";

function ProceedPayment() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);

  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [BtnDisabled2, setBtnDisabled2] = useState(false);

  const [FirstName, setFirstName] = useState("");
  const [PayModal, setPayModal] = useState(false);

  const [phone, setPhone] = useState("");

  // const [ConfirmPassword, setConfirmPassword] = useState("");
  const [pricetotal, setPrice] = useState("");
  const [PlanId, setPlanid] = useState("");
  const [passErr, setPassErr] = useState("");
  const [Loader, setLoader] = useState(false);
  const [plandata, setPlanData] = useState("");

  // let { time, duration, planID, price } = useParams();

  // console.log(
  //   "time = ",
  //   time,
  //   "Duraton = ",
  //   duration,
  //   "Planid=",
  //   PlanId,
  //   "Price = ",
  //   pricetotal
  // );

  const [showPassword, setShowPassword] = useState(false);

  // Modal States
  const [CardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardCVC, setCVC] = useState("");

  const process = () => toast("Payment is being processed");
  const processError = () => toast("Invalid Details!");
  const processDone = () => toast("Payment Confirmed!");

  const getPlans = async () => {
    try {
      var res = await TotalServices.ListPlans();

      setPlanData(res.plans);
      // let test = res["plans"].filter(
      //   (obj) =>
      //     obj.id === parseInt(planID) &&
      //     (obj.price === parseInt(price) || obj.price === parseInt(price))
      // );

      // let test1 = res["plans"].filter((obj) => obj.price === parseInt(price));

      // console.log(test, "Test");

      // if (test.length > 0) {
      //   setPlanData(res["plans"]);
      // } else {
      //   navigate("/pricing");
      // }
    } catch (error) {
      console.log("error ", error);
      toast.error("Incorrect Username or Password");
      setBtnDisabled(false);
    }
  };

  useEffect(() => {
    // setPlanid(planID);
    // setPrice(price);
    getPlans();
  }, []);

  // const SignUp_User = () => {
  //   var month = cardMonth.split("-");
  //   setLoader(true);
  //   process();
  //   var raw = JSON.stringify({
  //     username: userName,
  //     name: FirstName,
  //     phone: phone,
  //     password: Password,
  //     email: Email,
  //     plan_id: PlanId,
  //     price: pricetotal,
  //     payment_method: "stripe",
  //     cardNumber: CardNumber,
  //     exp_month: parseInt(month[1]),
  //     exp_year: parseInt(month[0]),
  //     cvc: cardCVC,
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(ApiURL + "/user/register/" + time + "/" + duration, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       // if (Password !=ConfirmPassword)
  //       // {
  //       //   toast("Password doesnot match");
  //       // }
  //       if (result["status"] === 406) {
  //         toast(result["message"]);
  //       } else if (result["status"] === 200) {
  //         console.log("Test");
  //         processDone();
  //         setFirstName("");
  //         setEmail("");
  //         setPhone("");
  //         setCVC("");
  //         setCardMonth("");
  //         setCardNumber();
  //         planID = "";
  //         price = "";
  //         setUserName("");
  //         setPassword("");
  //         // setConfirmPassword("");
  //         setTimeout(function () {
  //           navigate("/admin-dashboard");
  //         }, 7000);
  //       }
  //     })
  //     .then(() => {
  //       setLoader(false);
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //       console.log(error, " error");
  //       setFirstName("");
  //       setEmail("");
  //       setPhone("");
  //       setCVC("");
  //       setCardMonth("");
  //       setCardNumber();
  //       planID = "";
  //       price = "";
  //       setUserName("");
  //       setPassword("");
  //       // setConfirmPassword("");
  //       processError();
  //     });
  // };

  const handleSignup = async () => {
    var month = cardMonth.split("-");
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
          plan_id: PlanId,
          price: pricetotal,
          payment_method: "stripe",
          cardNumber: CardNumber,
          exp_month: parseInt(month[1]),
          exp_year: parseInt(month[0]),
          cvc: cardCVC,
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

  const handleDropDown = (e) => {
    if (e.target.value == "standard(M)") {
      setPrice(5555);
      console.log(pricetotal);
    } else if (e.target.value == "pro(M)") {
      setPrice(100000);
      console.log(pricetotal);
    } else if (e.target.value == "test plan(M)") {
      setPrice(1222);
      console.log(pricetotal);
    } else if (e.target.value == "basic(M)") {
      setPrice(123456);
      console.log(pricetotal);
    } else if (e.target.value == "standard(Y)") {
      setPrice(1234556);
      console.log(pricetotal);
    } else if (e.target.value == "pro(Y)") {
      setPrice(4444444);
      console.log(pricetotal);
    }
  };

  let navigate = useNavigate();
  return (
    <>
      <div class="w-screen h-screen flex">
        <Helmet>
          <title>Co-Crawler | User Registration</title>
        </Helmet>

        <ToastContainer />
        {/* <div className="hidden lg:flex justify-center items-center w-3/12 h-full bg-black ">
        
      </div> */}
        {/* left hand side  */}
        <div className="w-full md:w-[40%] md:h-[100vh] dashboard_color flex items-center justify-center text-center">
          <div className="px-8 sm:px-20 md:px-10 text-white lg:px-20 py-16 text-4xl font-serif font-extrabold">
            Instagram Automation
          </div>
        </div>

        {/* right hand side  */}
        {Loader ? (
          <div class="w-screen h-screen flex items-center justify-center bg-gray-100">
            <div class="w-full mx-auto py-16">
              <div class="prifix_loading_box">
                {" "}
                <span></span> <span></span> <span></span> <span></span>{" "}
                <span></span>{" "}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full scroll overflow-y-scroll  relative   h-screen">
            <form
              action="payment"
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
                // navigate("/");
              }}
            >
              <div class="w-full flex px-10 items-center h-screen">
                {/* add code here */}
                <div className="w-[65%] mx-auto text-center shadow-lg p-10">
                  <div className="mt-10">
                    <h2 className="text-3xl font-bold text-black-800">
                      Your cart
                    </h2>
                    <p className="mt-3 text-gray-800"></p>
                  </div>
                  <div className="mt-6">
                    {plandata &&
                      plandata
                        .filter((obj) => obj.id == PlanId)
                        .map((items) => {
                          console.log(plandata);
                          return (
                            <>
                              <div key={PlanId} class="grid grid-cols-2 gap-4">
                                <div className="mb-6 mt-3">
                                  <div className="">
                                    <label
                                      htmlFor="PlanDetails"
                                      className="flex flex-col items-start text-gray-500"
                                    >
                                      <span className="flex">
                                        {" "}
                                        <p className="text-gray-600">
                                          Selected Plan Name
                                        </p>
                                      </span>

                                      <input
                                        type="text"
                                        value={items.plan_name}
                                        // value="saad"
                                        disabled
                                        className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                        placeholder="Your password"
                                      />
                                    </label>
                                  </div>
                                </div>
                                <div className="mb-6 mt-3">
                                  <div className="">
                                    <label
                                      htmlFor="PlanDetails"
                                      className="flex flex-col items-start text-gray-500"
                                    >
                                      <span className="flex">
                                        {" "}
                                        <p className="text-gray-600">
                                          Selected Plan Price
                                        </p>
                                      </span>
                                      <input
                                        type="text"
                                        value={pricetotal}
                                        disabled
                                        className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                                        placeholder="Your password"
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                  </div>
                  <h2 className="pb-3 text-xl font-bold flex align-middle">
                    Payment
                  </h2>
                  <div className="space-y-5">
                    <div className="flex flex-col">
                      <p className="text-gray-700 flex text-sm mb-1">
                        Card Number<span className="text-red-600"> *</span>
                        <p
                          id="card-number"
                          className="text-red-500 hidden text-xs font-light self-center"
                        >
                          (invalid!)
                        </p>
                      </p>
                      <input
                        type="number"
                        value={CardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        class="w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                        placeholder="Credit Card Number"
                        required
                      />
                    </div>

                    <div className="flex space-x-8">
                      <div className="flex flex-col w-full">
                        <p className="text-gray-700 text-sm mb-1">
                          Expiry Month<span className="text-red-600"> *</span>
                        </p>
                        <input
                          type="date"
                          value={cardMonth}
                          onChange={(e) => setCardMonth(e.target.value)}
                          class="w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                          required
                        />
                      </div>

                      <div className="flex flex-col ">
                        <p className="text-gray-700 text-sm flex mb-1">
                          CVC<span className="text-red-600"> *</span>
                          <p
                            id="cvc"
                            className="text-red-500 hidden text-xs font-light self-center"
                          >
                            (Invalid!)
                          </p>
                        </p>
                        <input
                          type="number"
                          value={cardCVC}
                          onChange={(e) => setCVC(e.target.value)}
                          class="w-full border border-black-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
                          placeholder="CVC"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button class="inline-block rounded-sm bg-gray-900 btn-hover3  my-6 font-medium border border-solid cursor-pointer text-center text-base py-3 px-6 text-white w-full">
                    Continue Payment
                  </button>
                </div>

                <div className="h-screen w-[35%] ">
                  <div className="mt-28 mx-auto text-center pl-10">
                    <div className="mt-10 space-y-10 shadow-lg ">
                      <h2 className="text-3xl pt-5 font-bold text-black-800">
                        Price
                      </h2>

                      <p className="pb-5">$10</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default ProceedPayment;
