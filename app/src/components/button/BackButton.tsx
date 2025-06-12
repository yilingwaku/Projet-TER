"use client";

import { useRouter } from "next/navigation";
import Icon from "../Icon";
import "./button.css";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="button default-button back-button"
      onClick={() => router.back()}
    >
      <Icon icon="CornerDownLeft" size={20} />
      <span className="sm-text">Retour</span>
    </button>
  );
};

export default BackButton;