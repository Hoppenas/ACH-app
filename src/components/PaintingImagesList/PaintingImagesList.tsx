import { FC, useRef } from "react";
import { Box, ImageList, ImageListItem, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { motion } from "framer-motion";
import { IModalImage, IPhoto } from "../../types/types";
import { useOnLoadImages } from "../../hooks/useOnLoadImages";
import deletePaintingImage from "../../utils/deletePaintingImage";

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);

  return (
    <Box ref={wrapperRef}>
      <ImageList cols={3} gap={8}>
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
                    onClick={() => deletePaintingImage(item, paintingId)}
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

export default PaintingImagesList;
