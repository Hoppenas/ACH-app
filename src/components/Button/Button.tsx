import React from "react";
import "./button.css";

export interface IButton {
  title: string;
  handleClick: () => void;
}

const Button: React.FC<IButton> = ({ title, handleClick }) => {
  return (
    <div className="container" onClick={handleClick}>
      <a className="button">
        <div className="button__line"></div>
        <div className="button__line"></div>
        <span className="button__text">{title}</span>
        <div className="button__drow1"></div>
        <div className="button__drow2"></div>
      </a>
    </div>
  );
};

export default Button;
