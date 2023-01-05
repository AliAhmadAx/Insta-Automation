import React, { useState, useRef, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ApiURL from "../../../../../Config/Config";
import Multiselect from "multiselect-react-dropdown";
import { ToastContainer, toast } from "react-toastify";
import AdminRefreshToken from "../../../../../Pages/auth/Admin/AdminRefreshToken";
import moment from "moment";

function FilterModal({
  ShowFilterModal,
  setShowFilterModal,
  Loader,
  setLoader,
  dob,
  setDOB,
  streetSelect,
  setStreetSelect,
  filterSelected,
  currentPage,
  StreetFilter,
  StreetDataReturn,
  setStreetDataReturn,
}) {
  const StreetRef = useRef(null);

  const GetStreetsData = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    //get card api--->>>
    fetch(
      ApiURL +
        `/GetStreets/${filterSelected}/${(currentPage - 1) * filterSelected}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let arr = [];

        let Streets = result.DistinctStreets?.map((item) => ({
          cat: item.street,
          key: item.street,
        }));
        setStreetSelect(Streets);

        // arr = StreetRef.current.getSelectedItems();
        // setStreetDataReturn(arr);
        // console.log(arr, "is it workingg");
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    GetStreetsData();
  }, []);

  return (
    <div>
      <ToastContainer />

      {ShowFilterModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
            <div className={"relative w-auto mx-auto max-w-full"}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[700px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Filter Data</h3>
                  <button
                    className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowFilterModal(false);
                      setLoader(false);
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
                      Select Order <span className="text-red-900">*</span>
                    </p>
                    <select
                      name="order"
                      id="order"
                      className="w-full py-3 px-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Order</option>
                      <option value="ascending">Ascending</option>
                      <option value="descending">Descending</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      Select Date <span className="text-red-900">*</span>
                    </p>
                    <input
                      type="date"
                      max={moment().format("YYYY-MM-DD")}
                      className="w-full rounded-md border border-gray-300 p-3"
                      placeholder="DOB"
                      value={dob}
                      onChange={(e) => setDOB(e.target.value)}
                    />
                  </div>

                  <div>
                    <p
                      className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1"
                      style={{
                        textAlign: "start",
                      }}
                    >
                      Select Street <span className="text-red-900">*</span>
                    </p>
                    <Multiselect
                      closeIcon={"cancel"}
                      displayValue="key"
                      placeholder="Select Streets"
                      ref={StreetRef}
                      onKeyPressFn={function noRefCheck() {}}
                      onRemove={() => function noRefCheck() {}}
                      onSearch={function noRefCheck() {}}
                      onSelect={() => {
                        console.log(
                          StreetRef.current.getSelectedItems(),
                          "Qasim"
                        );
                        setStreetDataReturn(
                          StreetRef.current.getSelectedItems()
                        );
                      }}
                      options={streetSelect}
                    />
                  </div>
                </div>

                <div></div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    style={{ background: "black" }}
                    className="btn text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowFilterModal(false);
                      setLoader(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    style={{ background: "var(--bg-fill4)" }}
                    className="btn-hover text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      StreetFilter();
                      setShowFilterModal(false);
                    }}
                  >
                    Filter
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

export default FilterModal;
