import React, { useState, useEffect } from "react";
import { Data5 } from "../PlansData";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import ApiURL from "../../../../Config/Config";
import PaginationButtons from "../../../Pagination/PaginationButtons";
import { GoSearch } from "react-icons/go";
import { ImFolderDownload } from "react-icons/im";
import { useContext } from "react";
import { ThemeContext } from "../../../../App";
import { ToastContainer, toast } from "react-toastify";
import Helmet from "react-helmet";
import { FaPlaneDeparture } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { FcWorkflow } from "react-icons/fc";
import { BiError } from "react-icons/bi";
import SearchButtons from "../../../Buttons/SearchButtons";

function QueryHistory(props) {
  const { DarkMode, setAddButton } = useContext(ThemeContext);

  const [TokenRefresh, setTokenRefresh] = useState(false);

  const [Loader, setLoader] = useState(true);
  const [tableData, setTableData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [record, setRecord] = useState(0);
  const [queryid, setQueryId] = useState("");

  const [checkBool, setCheckBool] = useState(false);

  // Pagination
  const [totalRecords, setTotalRecords] = useState("");
  const [searchRecord, setSearchRecord] = useState(0);
  const [NumberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(5);
  const [totalSearchRecords, setTotalSearchRecords] = useState("");
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchGoto, setSearchGoto] = useState("");
  const [totalSearchPages, setTotalSearchPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [searchUsers, setSearchUser] = useState("");
  const [tempData, setTempData] = useState("");

  const getQueries = (str) => {
    setLoader(true);
    const token = localStorage.getItem("AccessTokenUser");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      query: searchUsers,
    });

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      ApiURL +
        `/UserSearchQueries/${NumberOfRecordsPerPage}/${
          (currentPage - 1) * NumberOfRecordsPerPage
        }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 403) {
          getQueries("");
          setLoader(false);
        } else if (result.status === 406) {
          setLoader(false);
        } else if (result.status === 200) {
          console.log(result);
          if (result.pages === 1) {
            setCurrentPage(1);
          }
          setCheckBool(true);
          setLoader(false);
          setTableData(result.user_queries);
          setTotalPages(result.pages);
          if (searchUsers === "") {
            setTempData(result);
          }
          setTotalRecords(result.total_records);
        }
      })
      .then(() => {
        setLoader(false);
        setRefresh(false);
      })
      .catch((error) => console.log("error", error));
  };

  const ExportCSVAll = () => {
    const token = localStorage.getItem("AccessTokenUser");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(ApiURL + "/UserDownloadQueries", requestOptions)
      .then((result) => {
        return result.blob();
      })
      .then((data) => {
        if (data.type === "text/csv") {
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          a.download = "All Queries";
          a.click();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const ExportCSV = () => {
    const token = localStorage.getItem("AccessTokenUser");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(ApiURL + "/UserDownloadQuery/" + queryid, requestOptions)
      .then((result) => {
        return result.blob();
      })
      .then((data) => {
        if (data.type === "text/csv") {
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          console.log(data);
          a.download = "Single Query";
          a.click();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getFancyStatus = (uglyStatus) => {
    if (uglyStatus === "scraper_done") {
      return (
        <>
          <div className="tooltip">
            <IoMdDoneAll className="text-[#15803d] text-xl" />
            <span className="tooltiptext text-xs">Scrapper Done</span>
          </div>
        </>
      );
    } else if (uglyStatus === "ready to start") {
      return (
        <>
          <div className="tooltip">
            <FaPlaneDeparture className="text-[#075985] text-xl" />
            <span className="tooltiptext text-xs">Ready To Start</span>
          </div>
        </>
      );
    } else if (uglyStatus === "scraper_working") {
      return (
        <>
          <div className="tooltip">
            <FcWorkflow className="text-[#86198f] text-xl" />
            <span className="tooltiptext text-xs">Scarpper Working</span>
          </div>
        </>
      );
    } else if (uglyStatus === "scraper_error") {
      return (
        <>
          <div className="tooltip">
            <BiError className="text-red-800 text-xl"></BiError>
            <span className="tooltiptext text-xs">Scrapper Error</span>
          </div>
        </>
      );
    }
  };

  // useEffect(() => {
  //   getQueries("");
  // }, [refresh,searchUsers]);

  useEffect(() => {
    setAddButton("Download All");
  }, []);

  const State = (props) => {
    if (props.pick === "in Progress") {
      return <p className="text-yellow-500">{props.pick}</p>;
    } else if (props.pick === "Not Active") {
      return <p className="text-red-500">{props.pick}</p>;
    } else if (props.pick === "Complete") {
      return <p className="text-green-500">{props.pick}</p>;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Helmet>
        <title>Instagram Automation | Admin | Query History</title>
      </Helmet>
      <ToastContainer />

      <h2 className="my-3 px-10 text-3xl font-extrabold">Query History</h2>

      <div className="w-full md:px-10 flex flex-col items-center md:flex-row md:justify-between">
        <form
          className="flex w-full"
          onSubmit={(e) => {
            e.preventDefault();
            {
              searchUsers.length <= 0
                ? toast.error("Search form is empty")
                : getQueries(searchUsers);
            }
          }}
        >
          <input
            className="py-2 md:-ml-1 px-7 border border-gray-400 rounded-r-none w-full md:w-4/12"
            type="search"
            value={searchUsers}
            onChange={(e) => {
              setSearchUser(e.target.value);
              if (e.target.value === "") {
                setTableData(tempData.contact_messages);
                setTotalPages(tempData.pages);
                setTotalRecords(tempData.total_records);
              }
            }}
            placeholder="Search Queries"
          />

          <SearchButtons />
        </form>
        <button
          style={
            DarkMode === true
              ? {
                  backgroundColor: "var(--bg-fill7)",
                  color: "var(--txtColor2)",
                }
              : {
                  backgroundColor: "var(--bg-fill7)",
                }
          }
          className="py-2 px-3 text-bold text-white mt-5 md:mt-0 w-full md:w-fit rounded-md btn-hover3"
          onClick={ExportCSVAll}
        >
          Download All
        </button>
      </div>
      <section className="w-full flex justify-center">
        <div className="container w-full mx-auto px-4 sm:px-8">
          <div className="">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full rounded-lg overflow-hidden">
                <form>
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr className="bg-gray-100 text-gray-800 py-4">
                        {/* <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
                          ID.
                        </th> */}
                        <th className="px-6 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          QUERY NAME
                        </th>

                        <th className="pl-9 pr-12 md:px-8 text-center py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          STATUS
                        </th>
                        <th className="pl-12 pr-14 sm:px-10 md:pl-10 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          DATE
                        </th>
                        <th className="pl-12 pr-14 sm:px-10 md:pl-10 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
                          DOWNLOAD
                        </th>
                      </tr>
                    </thead>
                    <tbody className="rounded-b-lg">
                      {tableData &&
                        tableData.map((item) => {
                          return (
                            <tr>
                              {/* <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item.query_id}
                                </p>
                              </td> */}

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item.name}
                                </p>
                              </td>

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap text-center">
                                  {getFancyStatus(item.status)}
                                </p>
                              </td>

                              <td className="px-5 space-x-2 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item.date_created.slice(0, 17)}
                                </p>
                              </td>

                              <td className=" px-10 py-5 border-b border-gray-200 bg-white text-sm">
                                <button
                                  onClick={(e) => {
                                    setQueryId(item.query_id);
                                    ExportCSV();
                                  }}
                                  type="button"
                                  className="px-2 py-2 mx-2 rounded-full border text-emerald-500 hover:text-emerald-400 text-lg border-white hover:border-emerald-400"
                                >
                                  <ImFolderDownload />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </form>
              </div>
              <PaginationButtons
                totalRecords={totalRecords}
                setRecord={setRecord}
                record={record}
                NumberOfRecordsPerPage={NumberOfRecordsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                setGoto={setGoto}
                goto={goto}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default QueryHistory;
