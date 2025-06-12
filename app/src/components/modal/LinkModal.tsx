"use client"

import React from "react";
import { useRouter } from "next/navigation";

import ActionButton from "../button/ActionButton";

const LinkModal = ({ icon, title, link, isDouble, doubleIcon, doubleTitle, doubleLink }) => {
  const navigate = useRouter();

  const goToLink = () => {
    navigate.push(link);
  };

  const goToDoubleLink = () => {
    if (doubleLink) {
      navigate.push(doubleLink);
    }
  };

  return (
    <div className="modal">
      <div className="modal-container">
          <div className="modal-item">

        {isDouble && (
          <ActionButton isSecondary icon={doubleIcon} text={doubleTitle} onClick={goToDoubleLink} />
        )}

          <ActionButton icon={icon} text={title} onClick={goToLink} />
        </div>
      </div>
    </div>
  );
};

export default LinkModal;