import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import Helmet from "react-helmet";
import { ThemeContext } from "../../App";
import ApiURL from "../../Config/Config";
import AdminRefreshToken from "../auth/Admin/AdminRefreshToken";

// icons
import { FiMenu } from "react-icons/fi";
import { HiCreditCard } from "react-icons/hi";
import {
  BsFillSunFill,
  BsFillMoonFill,
  BsCalendar2Event,
} from "react-icons/bs";
import {
  AiFillWarning,
  AiOutlineCloseCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaCcDinersClub, FaUser, FaUserFriends } from "react-icons/fa";
import { TiTicket } from "react-icons/ti";
import { RiAdminLine } from "react-icons/ri";
import {
  MdDashboardCustomize,
  MdFamilyRestroom,
  MdManageAccounts,
} from "react-icons/md";
import { BiArrowToLeft, BiArrowToRight, BiCommentDetail } from "react-icons/bi";
import { GoReport } from "react-icons/go";
import { IoWarningOutline } from "react-icons/io5";
import TotalServices from "../../TotalServices";

const AdminDashboard = () => {
  const { DarkMode, setDarkMode, RefreshAdminLogin, setRefreshAdminLogin } =
    useContext(ThemeContext);

  const [active, setActive] = useState(1);
  const [active2, setActive2] = useState(false);
  const [Accordion, setAccordion] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [UserModal, setUserModal] = useState(false);
  const [ShrinkMenu, setShrinkMenu] = useState(false);

  const [ShrinkSettings, setShrinkSettings] = useState(false);

  let navigate = useNavigate();

  const toggle2 = () => {
    if (Accordion === 1) {
      return setAccordion(0);
    }
    setAccordion(1);
  };

  // ADMIN LOGOUT API STARTS
  const AdminLogout = async () => {
    try {
      var res = TotalServices.Logout();
      console.log(res, "logout");
      if (res.msg !== "Token has expired") {
        localStorage.removeItem("AdminAuth");
        localStorage.setItem("AdminIsLogin", false);
        navigate("/");
      }
    } catch (error) {
      console.log("error ", error);
    }
  };
  // ADMIN LOGOUT API ENDS

  return (
    <div className="bg-white">
      <Helmet>
        <title>Instagram Automation| Admin | Dashboard</title>
      </Helmet>

      <div
        className={
          DarkMode === true
            ? "w-full flex justify-center bg-gray-600"
            : "w-full flex justify-center bg-white"
        }
      >
        <div className="w-full flex">
          {/* SIDEBAR  */}
          <div
            className={
              ShrinkMenu
                ? "w-[93px] lg:flex bg-gray-200 hidden"
                : "w-[18%] lg:flex hidden bg-gray-200"
            }
          >
            <div
              className={
                ShrinkMenu === true
                  ? " w-full overflow-hidden relative hidden lg:block h-screen"
                  : "w-full overflow-hidden relative hidden lg:block h-screen"
              }
            >
              <div className={"h-full lg:w-full"}>
                {/* SIDE BAR  */}
                <div
                  className={
                    "bg-white/50 shadow-lg pt-5 pb-5 px-3 flex flex-col h-full w-full"
                  }
                >
                  {/* FULL MENU  */}
                  <span
                    className={
                      ShrinkMenu === true
                        ? "hidden"
                        : "space-y-5 flex flex-col items-center"
                    }
                  >
                    <p
                      style={
                        DarkMode === true
                          ? { color: "var(--bg-fill4)" }
                          : { color: "var(--bg-fill4)" }
                      }
                      className="text-xl -ml-12 mb-10 mt-[15px] flex items-center"
                    >
                      <img
                        className="w-10 mr-3"
                        src="https://cdn-icons-png.flaticon.com/512/481/481584.png"
                        alt=""
                      />
                      Dashboard
                    </p>

                    {/* MENU ITEM ZERO */}
                    <NavLink
                      end
                      style={({ isActive }) =>
                        DarkMode === true
                          ? {
                              color: isActive ? "var(--txtColor2)" : "",
                              backgroundColor: isActive
                                ? "var(--bg-fill4)"
                                : "",
                            }
                          : {
                              color: isActive ? "var(--txtColor2)" : "",
                              background: isActive ? "var(--bg-fill4)" : "",
                            }
                      }
                      onClick={() => {
                        setActive(4);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-md w-[90%] flex justify-between btn-hover3"
                      to=""
                    >
                      <MdManageAccounts
                        size="1.4em"
                        className="mr-3 self-center"
                      />
                      <div className="flex w-full">
                        <div className="text-[13px] self-center font-light cursor-pointer">
                          Dashboard
                        </div>
                      </div>
                    </NavLink>

                    {/* MENU ITEM First */}
                    <NavLink
                      end
                      style={({ isActive }) =>
                        DarkMode === true
                          ? {
                              color: isActive ? "var(--txtColor2)" : "",
                              backgroundColor: isActive
                                ? "var(--bg-fill4)"
                                : "",
                            }
                          : {
                              color: isActive ? "var(--txtColor2)" : "",
                              background: isActive ? "var(--bg-fill4)" : "",
                            }
                      }
                      onClick={() => {
                        setActive(4);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-md w-[90%] flex justify-between btn-hover3"
                      to="query-history"
                    >
                      <MdManageAccounts
                        size="1.4em"
                        className="mr-3 self-center"
                      />
                      <div className="flex w-full">
                        <div className="text-[13px] self-center font-light cursor-pointer">
                          Query History
                        </div>
                      </div>
                    </NavLink>

                    {/* MENU ITEM 2 */}
                    {/* <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill4)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(8);
                    
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="reports"
                >
                  <GoReport size="1.3em" className="mr-3 self-center" />
                  <div className="flex w-full">
                    <div className="text-[13px] self-center font-light cursor-pointer">
                      Reports
                    </div>
                  </div>
                </NavLink> */}

                    {/* MENU ITEM 3 */}
                    <NavLink
                      end
                      style={({ isActive }) =>
                        DarkMode === true
                          ? {
                              color: isActive ? "var(--txtColor2)" : "",
                              backgroundColor: isActive
                                ? "var(--bg-fill1)"
                                : "",
                            }
                          : {
                              color: isActive ? "var(--txtColor2)" : "",
                              background: isActive ? "var(--bg-fill4)" : "",
                            }
                      }
                      onClick={() => {
                        setActive(8);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-md w-[90%] flex justify-between btn-hover3"
                      to="violations"
                    >
                      <AiFillWarning
                        size="1.3em"
                        className="mr-3 self-center"
                      />

                      <div className="flex w-full">
                        <div className="text-[13px] self-center font-light cursor-pointer">
                          DOB Violations
                        </div>
                      </div>
                    </NavLink>

                    {/* MENU ITEM 4 */}
                    <span
                      style={
                        active2 === true
                          ? {
                              color: "var(--txtColor2)",
                              background: "var(--bg-fill4)",
                            }
                          : {
                              color: "var(--txtColor1)",
                              background: "",
                            }
                      }
                      onClick={() => {
                        setActive(6);
                        setActive2(!active2);
                        toggle2();
                        setShrinkSettings(!ShrinkSettings);
                      }}
                      className="pl-5 py-2 rounded-md w-[90%] flex justify-between btn-hover3"
                    >
                      <AiOutlineSetting
                        size="1.3em"
                        className="mr-3 self-center"
                      />

                      <div className="flex w-full">
                        <div className="text-[13px] self-center font-light cursor-pointer">
                          Settings
                        </div>
                      </div>
                    </span>
                  </span>

                  {/* ICON ONLY MENU  */}
                  <span
                    className={
                      ShrinkMenu === true ? "space-y-5 pt-3 " : "hidden"
                    }
                  >
                    <img
                      className="w-9 mt-1 ml-3 mb-10"
                      src="https://cdn-icons-png.flaticon.com/512/481/481584.png"
                      alt=""
                    />

                    {/* MENU ITEM 1 */}
                    <NavLink
                      end
                      style={({ isActive }) =>
                        DarkMode === true
                          ? {
                              color: isActive ? "var(--txtColor2)" : "",
                              background: isActive ? "dashboard_color" : "",
                            }
                          : {
                              color: isActive ? "var(--txtColor2)" : "",
                              background: isActive ? "var(--bg-fill4)" : "",
                            }
                      }
                      onClick={() => {
                        setActive(4);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                      to=""
                    >
                      <MdManageAccounts
                        size="1.4em"
                        className="mr-3 self-center"
                      />
                    </NavLink>

                    {/* MENU ITEM 2 */}
                    {/* <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill4)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(8);
                    
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="reports"
                >
                  <GoReport size="1.3em" className="mr-3 self-center" />
                 
                </NavLink> */}

                    {/* MENU ITEM 3 */}
                    <NavLink
                      end
                      style={({ isActive }) =>
                        DarkMode === true
                          ? {
                              color: isActive ? "var(--txtColor2)" : "",
                              backgroundColor: isActive
                                ? "var(--bg-fill1)"
                                : "",
                            }
                          : {
                              color: isActive ? "var(--txtColor2)" : "",
                              background: isActive ? "var(--bg-fill4)" : "",
                            }
                      }
                      onClick={() => {
                        setActive(8);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                      to="violations"
                    >
                      <AiFillWarning
                        size="1.3em"
                        className="mr-3 self-center"
                      />
                    </NavLink>

                    {/* MENU ITEM 4 */}
                    <span
                      style={
                        active2 === true
                          ? {
                              color: "var(--txtColor2)",
                              background: "var(--bg-fill4)",
                            }
                          : {
                              color: "var(--txtColor1)",
                              background: "",
                            }
                      }
                      onClick={() => {
                        setActive(6);
                        setActive2(!active2);
                        toggle2();
                        setShrinkSettings(!ShrinkSettings);
                      }}
                      className="pl-5 py-2 rounded-md w-[90%] flex justify-between btn-hover3"
                    >
                      <AiOutlineSetting
                        size="1.3em"
                        className="mr-3 self-center"
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Settings BAR  */}
          <div
            style={ShrinkMenu === true ? { width: "94%" } : { width: "82%" }}
            className={
              ShrinkSettings === false
                ? "hidden"
                : "shadow-lg pt-5 flex flex-col h-[92%] absolute right-0 bottom-0 "
            }
          >
            <span
              onClick={() => setActive2(false)}
              className={
                "space-y-5 flex flex-col w-full bg-white border-b border-gray-200 h-16"
              }
            >
              <p
                style={
                  DarkMode === true
                    ? { color: "var(--bg-fill4)" }
                    : { color: "var(--bg-fill4)" }
                }
                className="text-3xl font-extrabold mb-10 ml-10 mt-[3px] flex items-center"
              >
                Settings
              </p>
            </span>

            {/* LEFT HAND SIDE */}
            <div className="h-full w-[25%] border-r border-gray-200 p-5">
              {/* SETTINGS MENU  */}
              <span className={"space-y-5 flex flex-col items-center mt-5"}>
                {/*SETTINGS MENU ITEM ZERO */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill4)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          background: isActive ? "var(--bg-fill4)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(4);

                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-md w-[90%] flex justify-between btn-hover3"
                  to=""
                >
                  <MdManageAccounts size="1.4em" className="mr-3 self-center" />
                  <div className="flex w-full">
                    <div className="text-[13px] self-center font-light cursor-pointer">
                      Dashboard
                    </div>
                  </div>
                </NavLink>

                {/*SETTINGS MENU ITEM First */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill4)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          background: isActive ? "var(--bg-fill4)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(4);
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-md w-[90%] flex justify-between btn-hover3"
                  to="query-history"
                >
                  <MdManageAccounts size="1.4em" className="mr-3 self-center" />
                  <div className="flex w-full">
                    <div className="text-[13px] self-center font-light cursor-pointer">
                      Query History
                    </div>
                  </div>
                </NavLink>

                {/*SETTINGS MENU ITEM 3 */}
                <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          background: isActive ? "var(--bg-fill4)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(8);
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-md w-[90%] flex justify-between btn-hover3"
                  to="violations"
                >
                  <AiFillWarning size="1.3em" className="mr-3 self-center" />

                  <div className="flex w-full">
                    <div className="text-[13px] self-center font-light cursor-pointer">
                      DOB Violations
                    </div>
                  </div>
                </NavLink>
              </span>
            </div>

            {/* RIGHT HAND SIDE  */}
            <div></div>
          </div>

          {/* HEADER  */}
          <div
            className={
              ShrinkMenu
                ? "w-full lg:w-[95%] flex flex-col items-end overflow-hidden"
                : "w-full lg:w-[82%] flex flex-col items-end overflow-hidden"
            }
          >
            <div
              className={
                ShrinkMenu
                  ? "w-full lg:w-[92%] xl:w-[95%] pl-2 pr-10 z-10 fixed border-b border-gray-300 flex flex-col items-center justify-center h-14"
                  : "w-full lg:w-[82%] pr-10 z-10 fixed border-b border-gray-300  flex flex-col items-center justify-center h-14"
              }
            >
              <div className="w-full top-0  flex justify-between items-center px-3 lg:px-0 py-6">
                <div
                  className={
                    ShrinkMenu === true
                      ? " py-[2px] flex items-center justify-between"
                      : "flex items-center justify-between"
                  }
                >
                  <div className="hidden lg:flex">
                    <span
                      onClick={() => setShrinkMenu(false)}
                      className={
                        ShrinkMenu === true
                          ? "-ml-2 -mb-[55px] self-center rounded-full bg-gray-100 border border-white p-1 text-xl hover:animate-pulse cursor-pointer"
                          : "hidden"
                      }
                    >
                      <BiArrowToRight />
                    </span>
                  </div>

                  <span
                    onClick={() => setShrinkMenu(true)}
                    className={
                      ShrinkMenu === true
                        ? "hidden"
                        : "hidden lg:block -mb-[55px] -ml-4 rounded-full bg-gray-100 border border-white p-1 text-xl hover:animate-pulse cursor-pointer"
                    }
                  >
                    <BiArrowToLeft />
                  </span>
                </div>

                {/* Mobile Menu  */}
                <div className="flex lg:hidden items-center">
                  <FiMenu
                    className="cursor-pointer"
                    color={
                      DarkMode === true ? "var(--bg-fill3)" : "var(--bg-fill4)"
                    }
                    onClick={() => setShowMenu(!showMenu)}
                    size="1.3em"
                  />
                </div>

                {/* MENU ITEMS START  */}
                <div
                  className={
                    showMenu === true
                      ? "lg:hidden w-full max-w-full max-h-full z-20 dashboard-animation backdrop-blur-lg fixed top-0 left-0 h-full"
                      : "lg:hidden max-w-0 max-h-0 overflow-hidden bg-white/75 z-20 dashboard-animation backdrop-blur-lg fixed top-0 left-0 h-full"
                  }
                >
                  <div className="container pr-5  w-full dashboard_color py-4 flex items-center justify-between">
                    <div className="closing-menu text-white w-full flex items-center justify-between">
                      <div className="flex pl-4 pr-10">
                        <p>Instagram Automation</p>
                      </div>
                      <FiMenu
                        className="zindex-dropdown"
                        color="white"
                        onClick={() => setShowMenu(!showMenu)}
                        size="1.2em"
                      />
                    </div>
                  </div>

                  <div className="container overflow-scroll h-screen space-y-5 pt-14 pb-3 px-5 flex flex-col">
                    <NavLink
                      end
                      style={({ isActive }) =>
                        DarkMode === true
                          ? {
                              color: isActive ? "var(--txtColor2)" : "",
                              background: isActive ? "var(--bg-fill4)" : "",
                            }
                          : {
                              color: isActive ? "var(--txtColor2)" : "black",
                              background: isActive ? "var(--bg-fill4)" : "",
                            }
                      }
                      onClick={() => {
                        setActive(4);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                      to=""
                    >
                      <MdManageAccounts
                        size="2em"
                        className="mr-3 self-center"
                      />
                      <div className="flex w-full">
                        <div className="text-[20px] self-center font-light cursor-pointer">
                          Dashboard
                        </div>
                      </div>
                    </NavLink>
                    {/* MENU ITEM First */}
                    <NavLink
                      end
                      style={({ isActive }) =>
                        DarkMode === true
                          ? {
                              color: isActive ? "var(--txtColor2)" : "",
                              background: isActive ? "var(--bg-fill4)" : "",
                            }
                          : {
                              color: isActive ? "var(--txtColor2)" : "black",
                              background: isActive ? "var(--bg-fill4)" : "",
                            }
                      }
                      onClick={() => {
                        setActive(4);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                      to="alerts"
                    >
                      <MdManageAccounts
                        size="2em"
                        className="mr-3 self-center"
                      />
                      <div className="flex w-full">
                        <div className="text-[20px] self-center font-light cursor-pointer">
                          Alerts
                        </div>
                      </div>
                    </NavLink>

                    {/* MENU ITEM 2 */}
                    {/* <NavLink
                  end
                  style={({ isActive }) =>
                    DarkMode === true
                      ? {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill1)" : "",
                        }
                      : {
                          color: isActive ? "var(--txtColor2)" : "",
                          backgroundColor: isActive ? "var(--bg-fill4)" : "",
                        }
                  }
                  onClick={() => {
                    setActive(8);
                    
                    toggle2();
                  }}
                  className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                  to="reports"
                >
                  <GoReport size="1.3em" className="mr-3 self-center" />
                  <div className="flex w-full">
                    <div className="text-[13px] self-center font-light cursor-pointer">
                      Reports
                    </div>
                  </div>
                </NavLink> */}

                    {/* MENU ITEM 3 */}
                    <NavLink
                      end
                      style={({ isActive }) =>
                        DarkMode === true
                          ? {
                              color: isActive ? "var(--txtColor2)" : "black",
                              backgroundColor: isActive
                                ? "var(--bg-fill1)"
                                : "",
                            }
                          : {
                              color: isActive ? "var(--txtColor2)" : "black",
                              background: isActive ? "var(--bg-fill4)" : "",
                            }
                      }
                      onClick={() => {
                        setActive(8);

                        toggle2();
                      }}
                      className="pl-5 py-2 rounded-full w-full flex justify-between btn-hover3"
                      to="violations"
                    >
                      <AiFillWarning size="2em" className="mr-3 self-center" />

                      <div className="flex w-full">
                        <div className="text-[20px] self-center font-light cursor-pointer">
                          DOB Violations
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>
                {/* MOBILE MENU ENDS HERE */}

                <div
                  style={
                    DarkMode === true
                      ? { color: "var(--txtColor2)" }
                      : { color: "var(--txtColor1)" }
                  }
                  className="w-full flex justify-between"
                >
                  <p></p>
                  <div
                    className={
                      ShrinkMenu === true ? "flex space-x-5" : "flex space-x-5"
                    }
                  >
                    <span className="flex border border-gray-300 p-3 dashboard_color rounded-full ">
                      <FaUser
                        size="1em"
                        onClick={() => setUserModal(!UserModal)}
                        className={
                          active === 7 || active === 8 || active === 9
                            ? " self-center"
                            : " self-center"
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* DASHBOARD SCREEN  */}
            <div
              className={
                ShrinkSettings === true
                  ? " py-20 px-3 lg:px-0 lg:w-[75%] w-full bg-white lg:h-full flex justify-center items-start"
                  : " py-20 px-3 lg:px-0 w-full lg:w-full bg-white lg:h-full flex justify-center items-start"
              }
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {UserModal === true ? (
        <div
          onClick={() => setUserModal(!UserModal)}
          className={
            ShrinkMenu === true
              ? " w-screen h-screen absolute top-0  user-modal flex justify-end"
              : " w-screen h-screen absolute left-0 top-0 user-modal flex justify-end"
          }
        >
          <div
            style={
              DarkMode === true
                ? {
                    backgroundColor: "var(--bg-fill5)",
                  }
                : {
                    backgroundColor: "var(--bg-fill3)",
                  }
            }
            className="w-5/12 sm:w-4/12 lg:w-2/12 h-fit flex flex-col relative mt-16 mr-10 border rounded-lg p-5 text-xs"
          >
            <AiOutlineCloseCircle
              onClick={() => setUserModal(!UserModal)}
              size="1.6em"
              className="absolute top-2 right-3 cursor-pointer hover:text-gray-400"
            />

            <NavLink
              end
              style={({ isActive }) =>
                DarkMode === true
                  ? {
                      color: isActive ? "var(--txtColor2)" : "",
                    }
                  : {
                      color: isActive ? "var(--txtColor1)" : "",
                    }
              }
              onClick={() => {
                setActive(9);

                toggle2();
              }}
              className="pb-2 cursor-pointer hover:underline "
              to="view-profile-admin"
            >
              View Profile
            </NavLink>

            <NavLink
              end
              style={({ isActive }) =>
                DarkMode === true
                  ? {
                      color: isActive ? "var(--txtColor2)" : "",
                    }
                  : {
                      color: isActive ? "var(--txtColor1)" : "",
                    }
              }
              onClick={() => {
                setActive(10);

                toggle2();
              }}
              className="pb-2 cursor-pointer hover:underline "
              to="edit-profile-admin"
            >
              Edit Profile
            </NavLink>

            <NavLink
              end
              style={({ isActive }) =>
                DarkMode === true
                  ? {
                      color: isActive ? "var(--txtColor2)" : "",
                    }
                  : {
                      color: isActive ? "var(--txtColor1)" : "",
                    }
              }
              onClick={() => {
                setActive(11);

                toggle2();
              }}
              className="pb-2 cursor-pointer hover:underline "
              to="change-password-admin"
            >
              Change Password
            </NavLink>

            <span
              style={
                DarkMode === true
                  ? {
                      color: "var(--txtColor2)",
                    }
                  : {
                      color: "var(--txtColor1)",
                    }
              }
              onClick={() => AdminLogout()}
              className="pb-2 cursor-pointer hover:underline"
            >
              Log Out
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminDashboard;
