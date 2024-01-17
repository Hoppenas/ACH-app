import { FC, useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  IconButton,
  ImageListItemBar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { motion } from "framer-motion";
import deleteFile from "../../utils/deleteFile";
import { CollectionTypes, IPaintings, IPhoto } from "../../types/types";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { minWidth } from "../../constants/styleConstants";

interface IPaintingsImageList {
  imageList: IPaintings[];
  handleGoToPainting: (id: string) => void;
  collectionType: CollectionTypes;
  isLogedIn: boolean;
}

const PaintingsImageList: FC<IPaintingsImageList> = ({
  imageList,
  handleGoToPainting,
  collectionType,
  isLogedIn,
}) => {
  const [openDeletePhotoDialog, setOpenDeletePhotoDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);
  const matches = useMediaQuery(`(min-width:${minWidth})`);

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
      <ImageList
        sx={{ width: "100%", height: "fit-content" }}
        gap={20}
        cols={matches ? 3 : 2}
      >
        {imageList.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <ImageListItem>
              <motion.img
                src={item.url}
                alt="portfolio pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                loading="lazy"
                style={{ display: "block", width: "100%" }}
                onClick={() => handleGoToPainting(item.id)}
              />
              <ImageListItemBar
                position="below"
                subtitle={
                  <Box width="100%" textAlign="center">
                    <Typography>{item.name}</Typography>
                    {item.dimentions && (
                      <Typography>{item.dimentions} cm</Typography>
                    )}
                    <Typography>
                      {item.isSold ? "Parduoda" : `kaina: ${item.price} eur`}
                    </Typography>
                  </Box>
                }
                actionIcon={
                  isLogedIn ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        color: "red",
                        fontSize: "24px",
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
                  ) : null
                }
              />
            </ImageListItem>
          </motion.div>
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

export default PaintingsImageList;
