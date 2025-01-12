import React from "react";
import "./Toast.css"; // Ensure this file exists and styles are correct.

const Toast = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  

  return (
    <div className="toast-container btn-purple">
      <div className="toast-message btn-purple" >
        {message}
        <button className="close-btn "  onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default Toast;