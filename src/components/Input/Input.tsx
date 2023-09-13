import React from "react";

export interface IInput {
  value: string;
  title: string;
  type: string;
  handleChange: () => void;
}

const Input: React.FC<IInput> = ({ value, title, type, handleChange }) => {
  return (
    <div>
      <h5>{title}</h5>
      <input value={value} type={type} onChange={handleChange} />
    </div>
  );
};

export default Input;
