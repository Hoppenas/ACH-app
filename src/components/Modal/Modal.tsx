import React, { Dispatch, MouseEvent, SetStateAction } from "react";

export interface IModal {
  selectedImg?: string;
  setSelectedImg: Dispatch<SetStateAction<string | null>>;
}

const Modal: React.FC<IModal> = ({ selectedImg, setSelectedImg }) => {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    //TODO: fix, clicking on img works same as click on backdrop
    if (event.currentTarget.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };
  return (
    <div className="backdrop" onClick={handleClick}>
      <img className="img" src={selectedImg} alt="enlarged pic" />
    </div>
  );
};

export default Modal;
