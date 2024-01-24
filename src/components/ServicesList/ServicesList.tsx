import { FC, useState } from "react";
import { Box, IconButton, Typography, Grid } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { motion } from "framer-motion";
import deleteFile from "../../utils/deleteFile";
import {
  CollectionTypes,
  IModalImage,
  IPhoto,
  IService,
} from "../../types/types";
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
    <Grid container direction="row" gap={1} justifyContent="space-around">
      {list &&
        list.map((item, index) => (
          <Grid
            item
            key={item.id}
            maxWidth={250}
            borderRadius={10}
            overflow="hidden"
            position="relative"
            border={1}
          >
            <motion.img
              src={item.url}
              alt="portfolio pic"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
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
          </Grid>
        ))}
      <ConfirmationDialog
        open={openDeletePhotoDialog}
        handleClose={handleCloseDeletePhotoDialog}
        handleConfirm={handleDeletePhoto}
        question="Are you sure you want to delete?"
      />
    </Grid>
  );
};

export default ServiceList;
