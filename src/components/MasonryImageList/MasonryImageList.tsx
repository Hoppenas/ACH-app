import { FC, useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { motion } from "framer-motion";
import deleteFile from "../../utils/deleteFile";
import { CollectionTypes, IModalImage, IPhoto } from "../../types/types";
import { minWidth } from "../../constants/styleConstants";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

interface IMasonryImageList {
  imageList: IPhoto[];
  openImage: (img: IModalImage) => void;
  collectionType: CollectionTypes;
  isLogedIn: boolean;
}

const MasonryImageList: FC<IMasonryImageList> = ({
  imageList,
  openImage,
  collectionType,
  isLogedIn,
}) => {
  const matches = useMediaQuery(`(min-width:${minWidth})`);
  const [openDeletePhotoDialog, setOpenDeletePhotoDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);

  const handleOpenDeletePhotoDialog = (photo: IPhoto) => {
    setOpenDeletePhotoDialog(true);
    setSelectedPhoto(photo);
  };

  const handleDeletePhoto = () => {
    deleteFile(selectedPhoto, collectionType);
    setOpenDeletePhotoDialog(false);
    setSelectedPhoto(null);
  };

  const handleCloseDeletePhotoDialog = () => {
    setOpenDeletePhotoDialog(false);
    setSelectedPhoto(null);
  };

  return (
    <Box>
      <ImageList variant="masonry" cols={matches ? 3 : 2} gap={8}>
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
              {isLogedIn && (
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

export default MasonryImageList;
