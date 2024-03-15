import React, { useState } from "react";

const AlertForm = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div>
        <label
          htmlFor="tw-modal"
          className="cursor-pointer rounded bg-black px-8 py-4 text-white active:bg-slate-400"
          onClick={toggleModal}
        >
          SEND ALERT
        </label>
      </div>
      {modalOpen && (
        <label
          htmlFor="tw-modal"
          className="pointer-events-none invisible fixed inset-0 flex cursor-pointer items-center justify-center overflow-hidden overscroll-contain bg-slate-700/30 opacity-0 transition-all duration-200 ease-in-out peer-checked:pointer-events-auto peer-checked:visible peer-checked:opacity-100 peer-checked:scale-100"
        >
          <div className="w-3/4 h-2/3 rounded-md bg-black p-6 text-black shadow-2xl transition relative">
            <button
              className="absolute top-0 right-0 px-2 py-1 text-lg text-white"
              onClick={toggleModal}
            >
              X
            </button>
            <p className="py-4 text-white">
              Form
            </p>
          </div>
        </label>
      )}
    </div>
  );
};

export default AlertForm;