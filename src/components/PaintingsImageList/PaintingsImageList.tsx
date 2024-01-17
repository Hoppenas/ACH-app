import { FC } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  IconButton,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { motion } from "framer-motion";
import deleteFile from "../../utils/deleteFile";
import { CollectionTypes, IPaintings } from "../../types/types";

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
  return (
    <Box>
      <ImageList
        sx={{ width: "100%", height: "fit-content" }}
        gap={20}
        cols={3}
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
                        onClick={() => deleteFile(item, collectionType)}
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
    </Box>
  );
};

export default PaintingsImageList;
