"use client"

import React from "react";
import { useRouter } from "next/navigation";

import ActionButton from "../button/ActionButton";

const LinkModal = ({ icon, title, link }: { link: string }) => {
  const navigate = useRouter();

  const goToLink = () => {
    navigate.push(link);
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-item">
          <ActionButton icon={icon} text={title} onClick={goToLink} />
        </div>
      </div>
    </div>
  );
};

export default LinkModal;