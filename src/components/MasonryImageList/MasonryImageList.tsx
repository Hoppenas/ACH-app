import React, { FC, useRef } from "react";
import { Box, ImageList, ImageListItem, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IImages } from "../../hooks/useFirestore";
import { motion } from "framer-motion";
import deleteFile from "../../utils/deleteFile";
import { CollectionTypes } from "../../types/types";
import { useOnLoadImages } from "../../hooks/useOnLoadImages";

interface IModalImage {
  index: number;
  url: string;
}

interface IMasonryImageList {
  imageList: IImages[];
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);
  return (
    <Box ref={wrapperRef}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {imageList &&
          imageList.map((item, index) => (
            <ImageListItem key={item.id}>
              <motion.img
                src={item.url}
                alt="portfolio pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                loading="lazy"
                style={{ display: "block", width: "100%" }}
                onClick={() => openImage({ index: index, url: item.url })}
              />
              {isLogedIn && imagesLoaded && (
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
                    onClick={() => deleteFile(item, collectionType)}
                  >
                    <DeleteOutlineIcon color="error" />
                  </IconButton>
                </motion.div>
              )}
            </ImageListItem>
          ))}
      </ImageList>
    </Box>
  );
};

export default MasonryImageList;
