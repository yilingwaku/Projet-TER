import React from "react";

import "./text.css";

const TextField = ({ title, subtitle, value, placeholder, type, handleChange, inputRef, onKeyDown, isDisable }) => {
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onKeyDown(e);
    }
  };

  return (
    <>
      <span className="md-text mb-[-10px]">{title}</span>
      <span className="sm-text">{subtitle}</span>

      <input
        disabled={isDisable}
        ref={inputRef}
        className="md-text field"
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default TextField;