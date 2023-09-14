import React, { ChangeEventHandler, useState } from "react";

export interface IInput {
  value: string | undefined;
  title: string;
  type: string;
  handleChange: (value: string) => void;
}

const Input: React.FC<IInput> = ({ value, title, type, handleChange }) => {
  const [value1, setValue1] = useState<string>();
  return (
    <div>
      <h5>{title}</h5>
      <input
        value={value}
        name="Username"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
