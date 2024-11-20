// components/DialogBox.js
import React from 'react';

const DialogBox = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-md w-1/3">
        <h2 className="text-lg font-bold">Dialog Box</h2>
        <p>This is the content of the dialog box.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DialogBox;
