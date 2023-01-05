import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import ApiURL from "../../../Config/Config";

import Papa from "papaparse";
import readXlsxFile from "read-excel-file";
import AdminRefreshToken from "../../../Pages/auth/Admin/AdminRefreshToken";

const ImpExpModals = ({
  getData,
  sampleEndPoint,
  importEndPoint,
  exportEndPoint,
}) => {
  const [Loader, setLoader] = useState(false);
  const [TokenRefresh, setTokenRefresh] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  // export csv file functions--->>>
  const handleExport = () => {
    toast.success("Downloading processed");
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    //export event api--->>>
    fetch(ApiURL + exportEndPoint, requestOptions)
      .then((res) => {
        if (res.status === 500) {
          return res.json();
        } else {
          return res.blob();
        }
      })
      .then((data) => {
        if (data.type === "text/csv") {
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          a.download = "file";
          a.click();
        } else if (data.msg === "Token has expired") {
          AdminRefreshToken({ TokenRefresh, setTokenRefresh });
          setTimeout(function () {
            handleExport();
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error("Can't be able to download file");
        console.log("error", error);
      });
  };

  // import csv file function--->>>

  const handleImport = () => {
    var file1 = document.getElementById("fileId");
    console.log(file1, "filesssssssssssss");
    if (file1.value !== "") {
      setLoader(true);
      const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

      var formdata = new FormData();
      formdata.append("file", file1.files[0]);

      if (file1.files[0] != undefined) {
        formdata.append("file", file1.files[0]);
        console.log("File found");
      } else {
        console.log("Not Found");
      }
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      console.log(ApiURL + importEndPoint, "importEndPoint");
      //import event api--->>>
      fetch(ApiURL + importEndPoint, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result.status);
          console.log(result.status === 406);
          if (result.status === 406) {
            toast.error(result.message);
            setLoader(false);
          } else {
            if (result.msg !== "Token has expired") {
              setLoader(false);
              getData("");
              toast.success("Files Uploaded Successfully");
              setShowInputModal(false);
            } else if (result.msg === "Token has expired") {
              AdminRefreshToken({ TokenRefresh, setTokenRefresh });

              setTimeout(function () {
                handleImport();
              }, 1000);
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
          setLoader(true);
          // setUploadLoader(false);
        });
    } else {
      toast.error("Please upload file!");
    }
  };
  //import event api end--->>>

  //samplefile download function--->>>
  const sampleDownloadFile = () => {
    var myHeaders = new Headers();
    const AdminAuth = JSON.parse(localStorage.getItem("AdminAuth"));
    myHeaders.append("Authorization", "Bearer " + AdminAuth.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    //samplefile api---->>>
    fetch(ApiURL + sampleEndPoint, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result, "hellllllo");
        const blob = new Blob([result], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", `sample_file.csv`);
        a.click();
        setLoader(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoader(false);
      });
  };
  //sample file api ends---->>>
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  //handleChange function--->>>
  const handleChange = (e) => {
    console.log(e.target.files, "eeeeee");
    setLoader(true);
    var files = e.target.files;
    console.log(files);
    var filesArray = [].slice.call(files);
    if (e.target.files[0].type === "text/csv") {
      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          var check = Object.values(results.data)[0];
          var check1 = Object.keys(check);
          console.log(results, "Hello I am here!!");
        },
      });
    } else if (
      e.target.files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      e.target.files[0].type === "application/vnd.ms-excel"
    ) {
      readXlsxFile(e.target.files[0]).then((rows) => {
        var check = Object.values(rows)[0];
        console.log(check);
      });
    }

    filesArray.forEach((e) => {
      setFileName(e.name);
      if (
        e.type != "text/csv" &&
        e.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        e.type !== "application/vnd.ms-excel"
      ) {
        toast.error("This file type is not allowed please upload file again", {
          duration: 2000,
        });
        setLoader(true);
        setShowInputModal(false);
        getData();

        document.getElementById("fileId").value = "";
        setFileName("");
        setFileType("");
      }
    });
  };
  //handleChange function ends---->>>

  //handleSelect function---->>>
  const handleSelect = (e) => {
    if (e.target.value === "Import") {
      setShowInputModal(true);
    } else if (e.target.value === "export") {
      handleExport();
    } else if (e.target.value === "samplefile") {
      sampleDownloadFile();
    }
  };
  //handleSelect function ends-->>>
  return (
    <>
      <div>
        <select
          onChange={handleSelect}
          defaultValue={"options"}
          style={{
            padding: "5px",
            border: "2px solid var(--bg-fill4)",
            borderRadius: "8px",
          }}
        >
          <option value="options">Import/Export</option>
          <option value="Import">Import</option>
          <option value="export">Export</option>
          <option value="samplefile">Sample File</option>
        </select>

        <>
          {showInputModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
                <div className="relative w-auto  mx-auto max-w-full">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Select File</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowInputModal(false)}
                      >
                        <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto ">
                      <p
                        className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1 text-start"
                        style={{
                          textAlign: "start",
                        }}
                      >
                        Select csv File <span className="text-red-900">*</span>
                      </p>
                      <input
                        type="file"
                        id="fileId"
                        className="w-full rounded-md border p-3"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        style={{
                          background: "black",
                        }}
                        className="btn text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowInputModal(false)}
                      >
                        Close
                      </button>
                      <button
                        style={{
                          background: "var(--bg-fill1)",
                        }}
                        className="btn-hover text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          // setShowInputModal(false);
                          handleImport();
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>
      </div>
    </>
  );
};

export default ImpExpModals;
