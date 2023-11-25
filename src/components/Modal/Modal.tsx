import React, { Dispatch, MouseEvent, SetStateAction } from "react";
import { motion } from "framer-motion";
import "./modal.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid, IconButton } from "@mui/material";

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
      <div
        style={{
          position: "relative",
          top: "50%",
        }}
      >
        <IconButton color="inherit" sx={{ padding: 0 }}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton color="inherit" sx={{ padding: 0 }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </motion.div>
  );
};

export default Modal;
