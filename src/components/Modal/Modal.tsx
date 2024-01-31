import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import "./modal.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

export interface IModal {
  selectedImg?: { index: number; url: string; id: string } | null;
  setSelectedImg: Dispatch<
    SetStateAction<{ index: number; url: string; id: string } | null>
  >;
  handleOpenOtherPhoto: (newIndex: number) => void;
  totalNumberOfImages: number;
}

const Modal: React.FC<IModal> = ({
  selectedImg,
  setSelectedImg,
  handleOpenOtherPhoto,
  totalNumberOfImages,
}) => {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (event.currentTarget.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  const handleOpenNextPhoto = useCallback(() => {
    if (selectedImg) {
      handleOpenOtherPhoto(selectedImg?.index - 1);
    }
  }, [selectedImg, handleOpenOtherPhoto]);

  const handleOpenPrevPhoto = useCallback(() => {
    if (selectedImg) {
      handleOpenOtherPhoto(selectedImg?.index + 1);
    }
  }, [selectedImg, handleOpenOtherPhoto]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleOpenNextPhoto();
      } else if (event.key === "ArrowRight") {
        handleOpenPrevPhoto();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleOpenPrevPhoto, handleOpenNextPhoto]);

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
        <IconButton color="inherit" onClick={handleOpenPrevPhoto}>
          {selectedImg && selectedImg?.index < totalNumberOfImages - 1 && (
            <ArrowForwardIosIcon />
          )}
        </IconButton>
      </div>
    </>
  );
};

export default Modal;
