import React from "react";

import Icon from "../Icon";
import "./text.css";

const Check = ({ children, isChecked, onClick } : { children : React.ReactNode }) => {
      const classNameIsChecked = isChecked ? "checked-todo" : "";
      const iconName = isChecked ? "CircleCheck" : "Circle";

      return (
        <>
            <div className="bubble-container" onClick={onClick}>
                <div className={`bubble todo ${classNameIsChecked}`}>
                    <Icon icon={iconName} size={24}/>
                    <span className="md-text">{children}</span>
                </div>
            </div>
        </>
    );
};

export default Check;