import { FC, useState } from "react";
import { Box, ImageList, ImageListItem, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { motion } from "framer-motion";
import { IModalImage, IPhoto } from "../../types/types";
import deletePaintingImage from "../../utils/deletePaintingImage";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

interface IPaintingImagesList {
  imageList: IPhoto[];
  openImage: (img: IModalImage) => void;
  isLogedIn: boolean;
  paintingId: string | undefined;
}

const PaintingImagesList: FC<IPaintingImagesList> = ({
  imageList,
  openImage,
  isLogedIn,
  paintingId,
}) => {
  const [openDeletePhotoDialog, setOpenDeletePhotoDialog] = useState(false);
  const [activePhoto, setActivePhoto] = useState<IPhoto | null>(null);

  const handleOpenDeletePhotoDialog = (photo: IPhoto) => {
    setActivePhoto(photo);
    setOpenDeletePhotoDialog(true);
  };

  const handleDeletePhoto = () => {
    deletePaintingImage(activePhoto, paintingId);
    setOpenDeletePhotoDialog(false);
    setActivePhoto(null);
  };

  const handleCloseDeletePhotoDialog = () => {
    setActivePhoto(null);
    setOpenDeletePhotoDialog(false);
  };

  return (
    <Box>
      <ImageList cols={3} gap={8}>
        {imageList &&
          imageList.map((item, index) => (
            <ImageListItem key={item.id}>
              <motion.img
                src={item.url}
                alt="portfolio pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                loading="lazy"
                style={{ display: "block", width: "100%" }}
                onClick={() =>
                  openImage({ index: index, url: item.url, id: item.id })
                }
              />
              {isLogedIn && index !== 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  <IconButton
                    sx={{
                      padding: 0.5,
                      margin: 0.5,
                      cursor: "pointer",
                      borderRadius: 5,
                      border: "1px solid #FFF",
                    }}
                    onClick={() => handleOpenDeletePhotoDialog(item)}
                  >
                    <DeleteOutlineIcon color="error" />
                  </IconButton>
                </motion.div>
              )}
            </ImageListItem>
          ))}
      </ImageList>
      <ConfirmationDialog
        open={openDeletePhotoDialog}
        handleClose={handleCloseDeletePhotoDialog}
        handleConfirm={handleDeletePhoto}
        question="Are you sure you want to delete?"
      />
    </Box>
  );
};

export default PaintingImagesList;
