import React, { Dispatch, MouseEvent, SetStateAction } from "react";
import { motion } from "framer-motion";
import "./modal.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

export interface IModal {
  selectedImg?: { index: number; url: string } | null;
  setSelectedImg: Dispatch<
    SetStateAction<{ index: number; url: string } | null>
  >;
  handleopenOtherPhoto: (newIndex: number) => void;
  totalNumberOfImages: number;
}

const Modal: React.FC<IModal> = ({
  selectedImg,
  setSelectedImg,
  handleopenOtherPhoto,
  totalNumberOfImages,
}) => {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (event.currentTarget.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  const handleOpenNextPhoto = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
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
    <>
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
      </motion.div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          width: "100%",
          justifyContent: "space-between",
          display: "flex",
          padding: "0 10%",
        }}
      >
        <IconButton color="inherit" onClick={handleOpenNextPhoto}>
          {selectedImg && selectedImg?.index > 0 && <ArrowBackIosIcon />}
        </IconButton>
        <IconButton color="inherit" onClick={handleOpenprevPhoto}>
          {selectedImg && selectedImg?.index < totalNumberOfImages - 1 && (
            <ArrowForwardIosIcon />
          )}
        </IconButton>
      </div>
    </>
  );
};

export default Modal;
