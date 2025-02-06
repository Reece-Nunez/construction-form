import React from "react";
import "./Spinner.css"; // Make sure you have the CSS for spinner styling

const Spinner = () => {
  return (
    <div className="spinner-container" aria-label="Loading">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
