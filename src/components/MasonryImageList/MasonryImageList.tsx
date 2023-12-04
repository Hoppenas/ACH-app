import React, { FC } from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";
import { IImages } from "../../hooks/useFirestore";
import { motion } from "framer-motion";
import deleteFile from "../../utils/deleteFile";
import { CollectionTypes } from "../../types/types";

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
  return (
    <Box>
      <ImageList variant="masonry" cols={3} gap={8}>
        {imageList &&
          imageList.map((item, index) => (
            <ImageListItem key={item.id}>
              <motion.img
                src={item.url}
                alt="pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                loading="lazy"
                style={{ display: "block", width: "100%" }}
                onClick={() => openImage({ index: index, url: item.url })}
              />
              {isLogedIn && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    color: "red",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteFile(item, collectionType)}
                >
                  Delete
                </div>
              )}
            </ImageListItem>
          ))}
      </ImageList>
    </Box>
  );
};

export default MasonryImageList;
