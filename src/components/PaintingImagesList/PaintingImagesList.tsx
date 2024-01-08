import React, { FC, useRef } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  IconButton,
  ImageListItemBar,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoIcon from "@mui/icons-material//Info";
import { motion } from "framer-motion";
import deleteFile from "../../utils/deleteFile";
import { CollectionTypes, IPaintings, IPhoto } from "../../types/types";
import { useOnLoadImages } from "../../hooks/useOnLoadImages";
import { DocumentData } from "firebase/firestore";

interface IPaintingImagesList {
  imageList: IPhoto[];
  //   handleGoToPainting: (id: string) => void;
}

const PaintingImagesList: FC<IPaintingImagesList> = ({
  imageList,
  //   handleGoToPainting,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);
  return (
    <Box ref={wrapperRef}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {imageList &&
          imagesLoaded &&
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
                // onClick={() => handleGoToPainting(item.id)}
              />
            </ImageListItem>
          ))}
      </ImageList>
    </Box>
  );
};

export default PaintingImagesList;
