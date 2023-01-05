import React, { useState, useRef, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ApiURL from "../../../../../Config/Config";
import Multiselect from "multiselect-react-dropdown";
import { ToastContainer, toast } from "react-toastify";
import AdminRefreshToken from "../../../../../Pages/auth/Admin/AdminRefreshToken";
import moment from "moment";

function Modal({
  Switch,
  showModal,
  setShowModal,
  editId,
  name,
  setName,
  lastName,
  setLastName,
  userName,
  setUserName,
  password,
  setPassword,
  address,
  setAdress,
  dob,
  setDOB,
  digitalPassLink,
  setDigitalPassLink,
  digitalStatus,
  setDigitalStatus,
  clubList,
  setClubList,
  famList,
  setFamList,
  cardList,
  setCardList,
  familyName,
  setFamilyName,
  memberCardEdit,
  memFamilyNameEdit,
  getMembers,
}) {
  const [Loader, setLoader] = useState(true);
  const [showHide, setShowHide] = useState(false);

  const [PostfixRecommended, setPostfixRecommended] = useState("");
  const [checkPostFix, setCheckPostFix] = useState("");
  // const [famList, setFamList] = useState([]);
  const [codeType, setCodeType] = useState("");

  // Pagination states starts here---->>>
  const [filterSelected, setFilterSelected] = useState(5);
  const [totalRecords, setTotalRecords] = useState("");
  // const [searchRecord, setSearchRecord] = useState(0);
  const [NumberOfRecordsPerPage] = useState(filterSelected);
  const [record, setRecord] = useState(0);

  //setData states ---->>>
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState("");

  const [TokenRefresh] = useState(true);
  const setTokenRefresh = (refresh) => {
    console.log(refresh);
  };

  // save/add members function starts--->>>
  const familyRef = useRef(null);
  const cardRef = useRef(null);
  const clubRef = useRef(null);
  const [value, setValue] = useState("create");
  const [clubCode, setClubCode] = useState("");

  const handleSaveMember = async () => {
    setLoader(true);
    var arr = [];
    var arr1 = [];

    var addfamily;

    if (value === "select") {
      addfamily = familyRef.current.getSelectedItems();
      // console.log(addfamily);
      addfamily.map((role) => {
        arr1.push(role.cat);
      });
    }

    var addcard = cardRef.current.getSelectedItems();

    if (value === "create") {
      var addclub = clubRef.current.getSelectedItems();
    }

    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    if (
      name == "" ||
      lastName == "" ||
      userName == "" ||
      digitalPassLink == "" ||
      digitalStatus == "" ||
      address == "" ||
      dob == "" ||
      // addclub == "" ||
      // PostfixRecommended == "" ||
      password == ""
      // addfamily == [] ||
      // familyName == ""
      // arr2 == ""
    ) {
      toast.error("Please fill the fields");
    } else {
      var raw;
      value === "select"
        ? (raw = JSON.stringify({
            first_name: name,
            last_name: lastName,
            username: userName,
            family_name: null,
            family_id: arr1,
            password: password,
            club_id: null,
            card_id: addcard.length > 0 ? addcard[0].cat : null,
            digital_pass: digitalPassLink,
            digital_status: digitalStatus,
            address: address,
            dob: dob,
            postfix_id: null,
            code_type: null,
          }))
        : (raw = JSON.stringify({
            first_name: name,
            last_name: lastName,
            username: userName,
            family_name: familyName,
            family_id: null,
            password: password,
            // ticketing_source: arr,
            club_id: addclub[0].cat,
            card_id: addcard.length > 0 ? addcard[0].cat : null,
            digital_pass: digitalPassLink,
            digital_status: digitalStatus,
            address: address,
            dob: dob,
            postfix_id: PostfixRecommended,
            code_type: codeType,
          }));
      console.log(raw);
      console.log(codeType);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      // add member api---->>>>
      await fetch(ApiURL + "/AddMembers", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);

          if (result.msg !== "Token has expired") {
            if (result.status === 200) {
              toast.success("members Created Successfully!");
              setName("");
              setLastName("");
              setUserName("");
              setPassword("");
              setFamList([]);
              setFamilyName("");
              setCardList([]);
              setClubCode("");
              setAdress("");
              setDigitalPassLink("");
              setDigitalStatus("");
              setPostfixRecommended("");

              setShowModal(false);
              getMembers();
              setLoader(false);
              // handleCloseAddModal();
            } else if (result.status === 406) {
              toast(result.message);
              setLoader(false);
            }
          } else if (result.msg === "Token has expired") {
            AdminRefreshToken(setTokenRefresh, TokenRefresh);
            setLoader(false);
            toast.error("Oops! An Error Occurred!");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  //edit members function starts---->>>
  const familyNameRefEdit = useRef(null);
  const cardHolderRefEdit = useRef(null);

  const handleEditMember = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);
    myHeaders.append("Content-Type", "application/json");

    var familyId = familyNameRefEdit.current.getSelectedItems();
    var cardId = cardHolderRefEdit.current.getSelectedItems();

    console.log(familyId);
    if (
      name == "" ||
      lastName == "" ||
      familyId == "" ||
      cardId == "" ||
      address == "" ||
      dob == "" ||
      digitalPassLink == "" ||
      digitalStatus == ""
    ) {
      setShowModal(true);
      toast.error("Please fill the fields");
    } else {
      var raw = JSON.stringify({
        first_name: name,
        last_name: lastName,
        family_id: familyId[0].cat,
        card_id: cardId[0].cat,
        address: address,
        dob: dob,
        digital_pass: digitalPassLink,
        digital_status: digitalStatus,
      });

      console.log(raw);

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      console.log(raw);
      //edit api starts--->>>
      fetch(ApiURL + "/EditMembers/" + editId, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.msg !== "Token has expired") {
            if (result.status === 200) {
              setLoader(false);
              toast.success("Admin Edited Successfully!");
              setShowModal(false);
              getMembers();
              // handleCloseEditModal();
            } else if (result.status === 406) {
              toast(result.message);
              setLoader(false);
            }
          } else if (result.msg === "Token has expired") {
            AdminRefreshToken(setTokenRefresh, TokenRefresh);
            toast.error("Oops! An Error Occurred!");
            // handleCloseEditModal();
            setLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Oops! An Error Occurred!");
          setLoader(false);
        });
    }
  };

  //postPreFix function--->>>

  const handlePostPreFix = () => {
    let clubsIds;
    if (Switch === false) {
      clubsIds = clubRef.current.getSelectedItems();
    }

    console.log(clubsIds);
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    //get club code api---->>>
    fetch(ApiURL + "/GetClubCode/" + clubsIds[0].cat, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setClubCode(result.data.club_code);
        setPostfixRecommended(result.data.postfix_recommended);
        setCheckPostFix(result.data.postfix_recommended);
      })

      .catch((error) => console.log("error", error));
  };

  var chkpost;

  const handleCheck = (e) => {
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    let clubsIds = clubRef.current.getSelectedItems();

    console.log(e);

    let myID = clubsIds[0].cat;

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(ApiURL + "/CheckPostFix/" + myID + "/" + e, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (checkPostFix == e && result.status === 200) {
          chkpost = "A";
        } else if (result.status === 200 && checkPostFix !== e) {
          chkpost = "M";
        } else if (result.status === 406 && checkPostFix !== e) {
          toast.error("post fix value already exists");
        }

        setCodeType(chkpost);
        console.log(checkPostFix, "post fix check");
        console.log(e, "post fix other");
        console.log(chkpost, "checking code type");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <ToastContainer />

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
            <div
              className={
                value === "select"
                  ? "relative w-auto mt-56 mx-auto max-w-full"
                  : "relative w-auto mt-96 mx-auto max-w-full"
              }
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[700px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {Switch === true ? "Edit Member" : "Member Info"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false);
                      setLoader(false);
                      setName("");
                      setLastName("");
                      setUserName("");
                      setAdress("");
                      setDOB("");
                      setDigitalPassLink("");
                      setDigitalStatus("");
                    }}
                  >
                    <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 grid grid-cols-2 gap-3 text-left ">
                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      First Name <span className="text-red-900">*</span>
                    </p>
                    <input
                      type="text"
                      className="w-full rounded-md border p-3"
                      placeholder="First Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      Last Name <span className="text-red-900">*</span>
                    </p>
                    <input
                      type="text"
                      className="w-full rounded-md border p-3"
                      placeholder="last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      User Name <span className="text-red-900">*</span>
                    </p>
                    <input
                      type="text"
                      className="w-full rounded-md border p-3"
                      placeholder="User Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  {Switch === true ? null : (
                    <div>
                      <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                        Enter Password <span className="text-red-900">*</span>
                      </p>
                      <div style={{ position: "relative" }}>
                        <input
                          // style={{
                          //   border: "1px solid gray",
                          //   padding: "10px 10px",
                          // }}
                          className="w-full rounded-md border p-3"
                          type={showHide ? "text" : "password"}
                          placeholder="Admin's Account Password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <div
                          className="flexflex"
                          style={{
                            top: "15px",
                            right: "10px",
                            cursor: "pointer",
                            position: "absolute",
                          }}
                        >
                          {showHide ? (
                            <AiOutlineEyeInvisible
                              onClick={() => setShowHide(!showHide)}
                            />
                          ) : (
                            <AiOutlineEye
                              onClick={() => setShowHide(!showHide)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      Address <span className="text-red-900">*</span>
                    </p>
                    <input
                      type="text"
                      className="w-full rounded-md border p-3"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAdress(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      DOB <span className="text-red-900">*</span>
                    </p>
                    <input
                      type="date"
                      max={moment().format("YYYY-MM-DD")}
                      className="w-full rounded-md border p-3"
                      placeholder="DOB"
                      value={dob}
                      onChange={(e) => setDOB(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      Digital Pass Link <span className="text-red-900">*</span>
                    </p>
                    <input
                      type="text"
                      className="w-full rounded-md border p-3"
                      placeholder="Digital Pass Link"
                      value={digitalPassLink}
                      onChange={(e) => setDigitalPassLink(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      Digital Status <span className="text-red-900">*</span>
                    </p>
                    <input
                      type="text"
                      className="w-full rounded-md border p-3"
                      placeholder="Digital Status"
                      value={digitalStatus}
                      onChange={(e) => setDigitalStatus(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  {Switch === true ? (
                    <div>
                      <p
                        className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1"
                        style={{
                          textAlign: "start",
                        }}
                      >
                        Select Family Name{" "}
                        <span className="text-red-900">*</span>
                      </p>
                      <Multiselect
                        closeIcon={"cancel"}
                        displayValue="key"
                        placeholder="Family Name"
                        ref={familyNameRefEdit}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={() => function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        singleSelect
                        onSelect={() => {
                          function noRefCheck() {}
                        }}
                        options={famList}
                        selectedValues={memFamilyNameEdit}
                      />
                    </div>
                  ) : null}

                  {Switch === true ? null : (
                    <div className="m-auto mb-5">
                      <div className="">
                        <label className=" ">
                          <input
                            style={{
                              border: "1px solid gray",
                            }}
                            className="mt-5 rounded-md border p-3"
                            type="radio"
                            name="radio"
                            value="create"
                            checked={value === "create"}
                            onChange={(e) => setValue(e.currentTarget.value)}
                          />
                          <span className="p-3">Create your own Family</span>
                          <input
                            style={{
                              border: "1px solid gray",
                            }}
                            className="mt-5 rounded-md border p-3"
                            type="radio"
                            value="select"
                            name="radio"
                            checked={value === "select"}
                            onChange={(e) => setValue(e.currentTarget.value)}
                          />
                          <span className="p-3">select from Family</span>
                        </label>
                      </div>

                      {value === "select" && (
                        <>
                          <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                            Select Family Name{" "}
                            <span className="text-red-900">*</span>
                          </p>
                          {Switch === true ? (
                            <Multiselect
                              closeIcon={"cancel"}
                              displayValue="key"
                              placeholder="Family Name"
                              ref={familyNameRefEdit}
                              onKeyPressFn={function noRefCheck() {}}
                              onRemove={() => function noRefCheck() {}}
                              onSearch={function noRefCheck() {}}
                              singleSelect
                              onSelect={() => {
                                function noRefCheck() {}
                              }}
                              options={famList}
                              selectedValues={memFamilyNameEdit}
                            />
                          ) : (
                            <Multiselect
                              style={{ margin: "0px" }}
                              closeIcon={"cancel"}
                              displayValue="key"
                              placeholder="Family Name"
                              ref={familyRef}
                              // required={true}
                              onKeyPressFn={function noRefCheck() {}}
                              onRemove={() => function noRefCheck() {}}
                              onSearch={function noRefCheck() {}}
                              singleSelect
                              onSelect={() => {
                                function noRefCheck() {}
                              }}
                              options={famList}
                              // showCheckbox={true}
                            />
                          )}
                        </>
                      )}

                      {value === "create" && (
                        <>
                          <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                            Create Family{" "}
                            <span className="text-red-900">*</span>
                          </p>
                          <input
                            type="text"
                            className="w-full rounded-md border p-3"
                            placeholder="Define Your family"
                            value={familyName}
                            // required={true}
                            onChange={(e) => setFamilyName(e.target.value)}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>

                {value === "select" ? null : (
                  <>
                    <div className="multiSelect">
                      <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                        Select Club Name <span className="text-red-900">*</span>
                      </p>
                      {Switch === true ? null : (
                        <Multiselect
                          style={{ width: "100%", background: "red" }}
                          closeIcon={"cancel"}
                          displayValue="key"
                          placeholder="club Name"
                          ref={clubRef}
                          onKeyPressFn={function noRefCheck() {}}
                          onRemove={() => function noRefCheck() {}}
                          onSearch={function noRefCheck() {}}
                          singleSelect
                          onSelect={function noRefCheck() {
                            setTimeout(() => {
                              handlePostPreFix(
                                clubRef.current.getSelectedItems()[0]
                              );
                            }, 1000);
                          }}
                          options={clubList}
                        />
                      )}
                    </div>
                    {Switch === true ? null : (
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                            Pre Fix <span className="text-red-900">*</span>
                          </p>
                          <input
                            type="text"
                            className="w-full rounded-md border p-3"
                            disabled
                            // placeholder="Digital Status"
                            value={clubCode}
                            // onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>
                        <div>
                          <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                            Post Fix <span className="text-red-900">*</span>{" "}
                            <span
                              id="error"
                              className="text-red-500 text-xs ml-2"
                            ></span>
                          </p>
                          <input
                            type="text"
                            className="w-full rounded-md border p-3"
                            placeholder="Post Fix"
                            value={PostfixRecommended}
                            onChange={(e) => {
                              setPostfixRecommended(e.target.value);
                              handleCheck(e.target.value);
                              console.log(e.target.value);
                            }}
                          />
                        </div>{" "}
                      </div>
                    )}
                  </>
                )}

                <div className="multiSelect">
                  <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                    Select Card Holder Name
                  </p>
                  {Switch === true ? (
                    <Multiselect
                      closeIcon={"cancel"}
                      displayValue="key"
                      placeholder="card holder Name"
                      ref={cardHolderRefEdit}
                      onKeyPressFn={function noRefCheck() {}}
                      onRemove={() => function noRefCheck() {}}
                      onSearch={function noRefCheck() {}}
                      singleSelect
                      onSelect={() => {
                        function noRefCheck() {}
                      }}
                      options={cardList}
                      selectedValues={memberCardEdit}
                    />
                  ) : (
                    <Multiselect
                      closeIcon={"cancel"}
                      displayValue="key"
                      placeholder="card Name"
                      ref={cardRef}
                      onKeyPressFn={function noRefCheck() {}}
                      onRemove={() => function noRefCheck() {}}
                      onSearch={function noRefCheck() {}}
                      singleSelect
                      onSelect={() => {
                        function noRefCheck() {}
                      }}
                      options={cardList}
                    />
                  )}
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    style={{ background: "black" }}
                    className="btn text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setLoader(false);
                      setName("");
                      setLastName("");
                      setUserName("");
                      setAdress("");
                      setDOB("");
                      setDigitalPassLink("");
                      setDigitalStatus("");
                    }}
                  >
                    Close
                  </button>
                  <button
                    style={{ background: "var(--bg-fill1)" }}
                    className="btn-hover text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={
                      Switch === true
                        ? (e) => {
                            e.preventDefault();
                            handleEditMember();
                          }
                        : (e) => {
                            e.preventDefault();
                            handleSaveMember();
                          }
                    }
                  >
                    {Switch === true ? "Save Changes" : "Add Member"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Modal;
