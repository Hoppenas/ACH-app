import React, { FC } from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";
import { IImages } from "../../hooks/useFirestore";
import { motion } from "framer-motion";

interface IModalImage {
  index: number;
  url: string;
}

interface IMasonryImageList {
  imageList: IImages[];
  openImage: (img: IModalImage) => void;
}

const MasonryImageList: FC<IMasonryImageList> = ({ imageList, openImage }) => {
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
            </ImageListItem>
          ))}
      </ImageList>
    </Box>
  );
};

export default MasonryImageList;
