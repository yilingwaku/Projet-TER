"use client";

import Icon from "../Icon";
import "./button.css";

const ActionButton = ({ isExample, isSecondary, isDelete, isDisable, icon, text, onClick }) => {
  const classNameIsSecondary = isSecondary ? "secondary-button" : "";
  const classNameIsDisable = isDisable ? "disable-button" : "";
  const classNameIsDelete = isDelete ? "delete-button" : "";
  const classNameIsExample = isExample ? "example-button" : "";

  return (
    <button className={`button default-button ${classNameIsSecondary} ${classNameIsDisable} ${classNameIsDelete} ${classNameIsExample}`} onClick={isDisable ? undefined : onClick}>
      <Icon icon={icon} size={20} />
      <span className="sm-text">{text}</span>
    </button>
  );
};

export default ActionButton;