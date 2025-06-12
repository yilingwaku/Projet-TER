"use client"

import React, { useState } from "react";

import ActionButton from "../button/ActionButton";

const LinkModal = ({ icon, title, text, onDelete }) => {

  const [isDelete, setIsDelete] = useState(false);


  const deleteEnable = () => {
    
    const view = document.querySelector(".view") as HTMLElement;
    if (view && !isDelete) {
      view.style.opacity = "0.05";
      setIsDelete(true);
    } else if (view && isDelete) {
      view.style.opacity = "1";
      setIsDelete(false);
    }
  }

  const deleteAction = () => {
    setIsDelete(false);
    onDelete?.();
  };

  return (
    <div className="modal">

      {!isDelete && (
        <div className="modal-container">

          <div className="modal-item">
            <ActionButton icon={icon} text={title} onClick={deleteEnable} isDelete/>
          </div>
        </div>
      )}

      {isDelete && (
        <div className="modal-container">

          <span className="md-text">
            { text }
          </span>

          <div className="modal-item">
            <ActionButton isSecondary icon="X" text="Annuler" onClick={deleteEnable}/>
            <ActionButton icon={icon} text={title} onClick={deleteAction} isDelete/>
          </div>
        </div>
      )}

    </div>
  );
};

export default LinkModal;