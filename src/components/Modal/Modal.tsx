import React, { Dispatch, MouseEvent, SetStateAction } from "react";
import { motion } from "framer-motion";

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
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        className="img"
        src={selectedImg}
        alt="enlarged pic"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
    </motion.div>
  );
};

export default Modal;
