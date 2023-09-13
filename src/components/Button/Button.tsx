import React from "react";

export interface IButton {
  title: string;
  handleClick: () => void;
}

const Button: React.FC<IButton> = ({ title, handleClick }) => {
  return <button onClick={handleClick}>{title}</button>;
};

export default Button;
