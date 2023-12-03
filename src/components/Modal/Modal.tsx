import React, { Dispatch, MouseEvent, SetStateAction } from "react";
import { motion } from "framer-motion";
import "./modal.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid, IconButton } from "@mui/material";

export interface IModal {
  selectedImg?: { index: number; url: string } | null;
  setSelectedImg: Dispatch<
    SetStateAction<{ index: number; url: string } | null>
  >;
  handleopenOtherPhoto: (newIndex: number) => void;
}

const Modal: React.FC<IModal> = ({
  selectedImg,
  setSelectedImg,
  handleopenOtherPhoto,
}) => {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    //TODO: fix, clicking on img works same as click on backdrop
    if (event.currentTarget.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  const handleOpenNextPhoto = () => {
    if (selectedImg) {
      handleopenOtherPhoto(selectedImg?.index - 1);
    }
  };
  const handleOpenprevPhoto = () => {
    if (selectedImg) {
      handleopenOtherPhoto(selectedImg?.index + 1);
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
        src={selectedImg?.url}
        alt="enlarged pic"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          width: "100%",
          justifyContent: "space-between",
          display: "flex",
          padding: "0 10px",
        }}
      >
        <IconButton
          color="inherit"
          sx={{ padding: 0 }}
          onClick={handleOpenNextPhoto}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          color="inherit"
          sx={{ padding: 0 }}
          onClick={handleOpenprevPhoto}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </motion.div>
  );
};

export default Modal;
