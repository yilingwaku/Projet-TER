import React from "react";

import Icon from "../Icon";
import "./text.css";

const Bubble = ({ children, isDescription, icon, title, onClick } : { children : React.ReactNode }) => {
      const classNameIsDescription = isDescription ? "description-bubble" : "";

      return (
        <>
            <div className="bubble-container" onClick={onClick}>
                <div className={`bubble ${classNameIsDescription}`}>
                    <div className='bubble-title'>
                        <Icon icon={icon} size={20}/>
                        <span className="sm-text">{title}</span>
                    </div>
                    <span className="md-text">{children}</span>
                </div>
            </div>
        </>
    );
};

export default Bubble;