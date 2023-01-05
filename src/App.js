import React, { useState, createContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ADMIN DASHBOARD ROUTES
import Login from "./Pages/auth/Admin/AdminLogin";
import Alerts from "./Components/DashboardComponents/Admin/Alerts/Alerts";
import ViewProfileAdmin from "./Components/DashboardComponents/AdminProfileSettings/ViewProfileAdmin";
import EditProfileAdmin from "./Components/DashboardComponents/AdminProfileSettings/EditProfileAdmin";
import ChangePasswordAdmin from "./Components/DashboardComponents/AdminProfileSettings/ChangePasswordAdmin";
import AdminPasswordReset from "./Components/passwordReset/AdminPasswordReset";
import Reports from "./Components/DashboardComponents/Admin/Reporting/Reports";

// PROTECTED ROUTE FOR ADMIN
import AProtectedRoute from "./Routes/AProtectedRoute";

// EXTRA PAGES
import Error404 from "./Pages/ExtraPages/Error404";
import ThankYou from "./Pages/ExtraPages/ThankYou";
import Welcome from "./Pages/ExtraPages/WelcomePage";
import DOBViolations from "./Components/DashboardComponents/Admin/Violations/DOBViolations";
import Home from "./Pages/Home";
import Pricing from "./Components/Pricing";
import Contact from "./Pages/ExtraPages/ContactUs";
import Services from "./Pages/ExtraPages/Services";
import About from "./Pages/ExtraPages/About";
import PricingPage from "./Pages/ExtraPages/PricingPage";
import LoginRegister from "./Pages/auth/Admin/LoginRegister";
import ProceedPayment from "./Pages/auth/Admin/ProceedPayment";
import Header from "./Components/HeaderFooter/Header";
import LoginRegisterModal from "./Components/Modals/LoginRegisterModal";
import Dashboard from "./Pages/Dashboards/Dashboard";
import MainDashboard from "./Components/DashboardComponents/Admin/MainDashboard";
import QueryHistory from "./Components/DashboardComponents/Admin/QueryHistory/QueryHistory";
import LoginPage from "./Pages/auth/Admin/LoginPage";
import SignupPage from "./Pages/auth/Admin/SignUpPage";
import Settings from "./Components/DashboardComponents/AdminProfileSettings/Settings";

export const ThemeContext = createContext();

function App() {
  const [RefreshAdminLogin, setRefreshAdminLogin] = useState(true);
  const [RefreshUserLogin, setRefreshUserLogin] = useState(true);
  const [TokenRefresh, setTokenRefresh] = useState(true);
  const [TokenRefreshUser, setTokenRefreshUser] = useState(true);

  const [DarkMode, setDarkMode] = useState(false);

  const [SampleEndPoint, setSampleEndPoint] = useState("");
  const [ImportEndPoint, setImportEndPoint] = useState("");
  const [ExportEndPoint, setExportEndPoint] = useState("");
  const [FileName, setFileName] = useState("");

  const [AddButton, setAddButton] = useState("");
  const [FilterButton, setFilterButton] = useState("");
  const [SearchButton, setSearchButton] = useState("");

  let TableData;

  const [header, setHeader] = useState(false);

  const [headerShow, setHeaderShow] = useState(false);

  const handleHeader = () => {
    // console.log(window.scrollY);
    if (window.scrollY >= 500) {
      setHeader(true);
    } else setHeader(false);
  };

  window.addEventListener("scroll", handleHeader);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <ThemeContext.Provider
        value={{
          DarkMode,
          setDarkMode,
          RefreshAdminLogin,
          setRefreshAdminLogin,
          RefreshUserLogin,
          setRefreshUserLogin,
          TokenRefresh,
          setTokenRefresh,
          TokenRefreshUser,
          setTokenRefreshUser,
          SampleEndPoint,
          setSampleEndPoint,
          ImportEndPoint,
          setImportEndPoint,
          ExportEndPoint,
          setExportEndPoint,
          FileName,
          setFileName,
          AddButton,
          setAddButton,
          TableData,
          FilterButton,
          setFilterButton,
          SearchButton,
          setSearchButton,
          headerShow,
          setHeaderShow,
          showModal,
          setShowModal,
        }}
      >
        <Router>
          {headerShow ? (
            <>
              <Header showModal={showModal} setShowModal={setShowModal} />

              {header === true ? (
                <div className="w-full max-w-full fixed top-0 left-0 z-20 header-animation">
                  <Header />
                </div>
              ) : (
                <div className="max-w-0 max-h-0 overflow-hidden header-animation">
                  <Header />
                </div>
              )}
            </>
          ) : null}

          {showModal ? (
            <div className="w-full">
              <LoginRegisterModal
                setShowModal={setShowModal}
                showModal={showModal}
              />
            </div>
          ) : null}

          <Routes key={document.pathname}>
            <Route
              path="/admin-reset/:username/:token"
              element={<AdminPasswordReset />}
            />

            <>
              <Route path="/admin-login" element={<LoginRegister />} />
              <Route path="/Login-Page" element={<LoginPage />} />
              <Route path="/signupPage" element={<SignupPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/proceed-payment" element={<ProceedPayment />} />

              {/* Admin protected routes  */}
              <Route path="/admin-dashboard" element={<AProtectedRoute />}>
                <Route index element={<MainDashboard />} />
                <Route path="" element={<MainDashboard />} />
                <Route path="query-history" element={<QueryHistory />} />
                <Route path="reports" element={<Reports />} />
                <Route path="violations" element={<DOBViolations />} />

                <Route
                  path="view-profile-admin"
                  element={<ViewProfileAdmin />}
                />
                <Route
                  path="edit-profile-admin"
                  element={<EditProfileAdmin />}
                />
                <Route
                  path="change-password-admin"
                  element={<ChangePasswordAdmin />}
                />
              </Route>
            </>

            {/* Extra Pages  */}
            <Route path="*" element={<Error404 />} />
            <Route path="/thank-you" element={<ThankYou />} />

            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
