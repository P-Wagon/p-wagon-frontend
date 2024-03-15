import React from "react";

const AlertForm = ({ isVisible, onClose }) => {
  if ( !isVisible ) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="max-w-[600px] w-full p-4 bg-white rounded-lg">
        <div className="flex justify-end">
          <button className="text-white text-xl" onClick={() => onClose}>X</button>
        </div>
        <p>AlertForm content goes here...</p>
      </div>
    </div>
  );
};

export default AlertForm;