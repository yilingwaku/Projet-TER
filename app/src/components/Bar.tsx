import React from "react";

import BackButton from "./button/BackButton";
import Icon from "./Icon";
import "./bar.css";

const Bar = ({ icon, title, color }) => {

  return (
    <>
    <div className='bar' style={{ backgroundColor: color }}>
        <BackButton />
        <div className="bar-content">
          <Icon icon={icon} size={24} />
          <span className="md-text">{title}</span>
        </div>
      </div>
    </>
  );
};

export default Bar;