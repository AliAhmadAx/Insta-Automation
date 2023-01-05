import React, { useState } from "react";
import Buttons from "../Buttons/Buttons";
import Search from "../DashboardComponents/Admin/Search";

function Table({
  TableHeader,
  ViolationCategoriesData,
  ViolationStatus,
  ViolationTypeCount,
  StreetFilterData,
  TimeFilter,
  setLoader,
}) {
  const [showModal, setShowModal] = useState(false);
  const [ID, setID] = useState("");
  const [BORO, setBORO] = useState("");
  const [ISNDOB, setISNDOB] = useState("");
  const [Bin, setBin] = useState("");
  const [Block, setBlock] = useState("");
  const [DateCreated, setDateCreated] = useState("");
  const [DeviceNo, setDeviceNo] = useState("");
  const [Description, setDescription] = useState("");
  const [DispositionComments, setDispositionComments] = useState("");
  const [DispositionDate, setDispositionDate] = useState("");
  const [ECBNo, setECBNo] = useState("");
  const [HouseNo, setHouseNo] = useState("");
  const [IssueDate, setIssueDate] = useState("");
  const [Lot, setLot] = useState("");
  const [Number, setNumber] = useState("");
  const [ViolationCode, setViolationCode] = useState("");
  const [Street, setStreet] = useState("");

  return (
    <>
      <table className="overflow-x-scroll leading-normal w-full border-2 border-slate-300">
        <thead>
          <tr className="bg-gray-100 text-gray-800 py-4 ">
            {TableHeader?.map((item, i, i2, i3) => {
              return (
                <>
                  {ViolationCategoriesData ? (
                    <th
                      key={i}
                      className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider"
                    >
                      {item.violations}
                    </th>
                  ) : null}

                  {ViolationStatus ? (
                    <>
                      <th
                        key={i}
                        className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold  uppercase tracking-wider"
                      >
                        {item.VStatus}
                      </th>

                      <th
                        key={i2}
                        className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider"
                      >
                        {item.count}
                      </th>
                    </>
                  ) : null}

                  {ViolationTypeCount ? (
                    <>
                      <th
                        key={i}
                        className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold  uppercase tracking-wider"
                      >
                        {item.VCount}
                      </th>

                      <th
                        key={i2}
                        className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider"
                      >
                        {item.count}
                      </th>
                    </>
                  ) : null}

                  {StreetFilterData ? (
                    <>
                      <th
                        key={i}
                        className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold  uppercase tracking-wider"
                      >
                        {item.ViolationNumbers}
                      </th>

                      <th
                        key={i2}
                        className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider"
                      >
                        {item.street}
                      </th>

                      <th
                        key={i3}
                        className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider"
                      >
                        {item.VCount}
                      </th>
                    </>
                  ) : null}

                  {TimeFilter ? (
                    <>
                      <th
                        key={i}
                        className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold  uppercase tracking-wider"
                      >
                        {item.violations}
                      </th>

                      <th
                        key={i2}
                        className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider"
                      >
                        {item.VNumber}
                      </th>

                      <th
                        key={i3}
                        className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider"
                      >
                        {item.VCount}
                      </th>

                      <th className="px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold  uppercase tracking-wider">
                        View Details
                      </th>
                    </>
                  ) : null}
                </>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {ViolationCategoriesData ? (
            <>
              {ViolationCategoriesData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                      {item.violation_category}
                    </td>
                  </tr>
                );
              })}
            </>
          ) : null}

          {ViolationStatus ? (
            <>
              {ViolationStatus?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs ">
                      {item.violation_category}
                    </td>
                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                      {item.count}
                    </td>
                  </tr>
                );
              })}
            </>
          ) : null}

          {ViolationTypeCount ? (
            <>
              {ViolationTypeCount?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs ">
                      {item.violation_type}
                    </td>
                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                      {item.count}
                    </td>
                  </tr>
                );
              })}
            </>
          ) : null}

          {StreetFilterData ? (
            <>
              {StreetFilterData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs ">
                      {item.number_of_violations}
                    </td>
                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                      {item.street}
                    </td>
                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                      {item.violation_type}
                    </td>
                  </tr>
                );
              })}
            </>
          ) : null}

          {TimeFilter ? (
            <>
              {TimeFilter?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs ">
                      {item.violation_category}
                    </td>
                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                      {item.violation_number}
                    </td>
                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                      {item.violation_type}
                    </td>

                    <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs text-center">
                      {/* <button
                        style={{ background: "var(--bg-fill4)" }}
                        key={index}
                        className="py-2 btn-hover3 px-10 mt-5 md:mt-0 w-full md:w-fit rounded-md text-white"
                        onClick={() => setShowModal(true)}
                      >
                        View More
                      </button> */}
                      <Buttons
                        key={index}
                        onClick={() => {
                          setShowModal(true);
                          setID(item.id ? item.id : "null");
                          setBORO(item.BORO ? item.BORO : "null");
                          setISNDOB(
                            item.ISN_DOB_BIS_VIOL
                              ? item.ISN_DOB_BIS_VIOL
                              : "null"
                          );
                          setBin(item.bin ? item.bin : "null");
                          setBlock(item.block ? item.block : "null");
                          setDateCreated(
                            item.date_created
                              ? item.date_created.slice(0, 17)
                              : "null"
                          );
                          setDescription(
                            item.description ? item.description : "null"
                          );
                          setDeviceNo(
                            item.device_number ? item.device_number : "null"
                          );
                          setDispositionComments(
                            item.disposition_comments
                              ? item.disposition_comments
                              : "null"
                          );
                          setDispositionDate(
                            item.disposition_date
                              ? item.disposition_date.slice(0, 17)
                              : "null"
                          );
                          setECBNo(item.ecb_number ? item.ecb_number : "null");
                          setHouseNo(
                            item.house_number ? item.house_number : "null"
                          );
                          setIssueDate(
                            item.IssueDate
                              ? item.IssueDate.slice(0, 17)
                              : "null"
                          );
                          setLot(item.lot ? item.lot : "null");
                          setNumber(item.Number ? item.Number : "null");
                          setStreet(item.street ? item.street : "null");
                          setViolationCode(
                            item.violation_type_code
                              ? item.violation_type_code
                              : "null"
                          );
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </>
          ) : null}
        </tbody>
      </table>

      {showModal === true ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
            <div className={"relative w-auto mx-auto max-w-full"}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[700px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">View Details</h3>
                  <button
                    className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false);
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
                  <p>
                    ID:
                    <span className="font-bold  text-red-500 ml-1">{ID}</span>
                  </p>

                  <p>
                    BORO:
                    <span className="font-bold  text-red-500 ml-1">
                      {BORO}
                    </span>{" "}
                  </p>

                  <p>
                    Issue Date:
                    <span className="font-bold  text-red-500 ml-1">
                      {IssueDate}
                    </span>{" "}
                  </p>

                  <p>
                    ISN_DOB_BIS_VIOL:
                    <span className="font-bold  text-red-500 ml-1">
                      {ISNDOB}
                    </span>{" "}
                  </p>

                  <p>
                    Violation Type Code:
                    <span className="font-bold  text-red-500 ml-1">
                      {ViolationCode}
                    </span>
                  </p>

                  <p>
                    Bin:
                    <span className="font-bold  text-red-500 ml-1">{Bin}</span>
                  </p>
                  <p>
                    Block:
                    <span className="font-bold  text-red-500 ml-1">
                      {Block}
                    </span>
                  </p>

                  <p>
                    Date Created:
                    <span className="font-bold  text-red-500 ml-1">
                      {DateCreated}
                    </span>{" "}
                  </p>
                  <p>
                    Description:
                    <span className="font-bold  text-red-500 ml-1">
                      {Description}
                    </span>{" "}
                  </p>
                  <p>
                    Device Number:
                    <span className="font-bold  text-red-500 ml-1">
                      {DeviceNo}
                    </span>
                  </p>
                  <p>
                    Disposition Comments:
                    <span className="font-bold  text-red-500 ml-1">
                      {DispositionComments}
                    </span>
                  </p>

                  <p>
                    Disposition Date:
                    <span className="font-bold  text-red-500 ml-1">
                      {DispositionDate}
                    </span>{" "}
                  </p>
                  <p>
                    ECB Number:
                    <span className="font-bold  text-red-500 ml-1">
                      {ECBNo}
                    </span>{" "}
                  </p>
                  <p>
                    House Number:
                    <span className="font-bold  text-red-500 ml-1">
                      {HouseNo}
                    </span>
                  </p>

                  <p>
                    Lot:
                    <span className="font-bold  text-red-500 ml-1">
                      {Lot}
                    </span>{" "}
                  </p>
                  <p>
                    Number:
                    <span className="font-bold  text-red-500 ml-1">
                      {Number}
                    </span>
                  </p>
                  <p>
                    Street:
                    <span className="font-bold  text-red-500 ml-1">
                      {Street}
                    </span>
                  </p>
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
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Table;
