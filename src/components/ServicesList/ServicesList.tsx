import { FC, useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  IconButton,
  useMediaQuery,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { motion } from "framer-motion";
import deleteFile from "../../utils/deleteFile";
import {
  CollectionTypes,
  IModalImage,
  IPhoto,
  IService,
} from "../../types/types";
import { minWidth } from "../../constants/styleConstants";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

interface IMasonryImageList {
  list: IService[];
  collectionType: CollectionTypes;
  isLogedIn: boolean;
  openImage: (img: IModalImage) => void;
}

const ServiceList: FC<IMasonryImageList> = ({
  list,
  collectionType,
  isLogedIn,
  openImage,
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
      <ImageList variant="masonry" gap={20}>
        {list &&
          list.map((item, index) => (
            <ImageListItem key={item.id}>
              <motion.img
                src={item.url}
                alt="portfolio pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  minWidth: "150px",
                  borderRadius: 10,
                }}
                onClick={() =>
                  openImage({ index: index, url: item.url, id: item.id })
                }
              />
              <Box
                bgcolor="#00000080"
                position="absolute"
                margin="0 5%"
                bottom="10px"
                width="90%"
                borderRadius={3}
              >
                <Typography variant="h6" color="#FFF" padding={1}>
                  {item.name}
                </Typography>
              </Box>
              {isLogedIn && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
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

export default ServiceList;
