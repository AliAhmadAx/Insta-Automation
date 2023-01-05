import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import LoginRegister from "../../Pages/auth/Admin/LoginRegister";

function LoginRegisterModal({ setShowModal, showModal }) {
  return (
    <div className="w-full">
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
            <div className="relative w-auto mx-auto max-w-full">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[900px] bg-white outline-none focus:outline-none">
                {/* close button  */}
                <span
                  onClick={() => {
                    //   handleDelete(id);
                    setShowModal(false);
                  }}
                  className="rounded-full bg-white cursor-pointer text-black flex justify-center items-center absolute text-xl right-5 top-2"
                >
                  <AiOutlineCloseCircle />
                </span>
                <div className="flex items-start justify-between rounded-t">
                  <LoginRegister />
                </div>
                {/*body*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default LoginRegisterModal;
