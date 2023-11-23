import React, { FC } from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";

interface IMasonryImageList {
  imageList: string[];
}

const MasonryImageList: FC<IMasonryImageList> = ({ imageList }) => {
  return (
    <Box sx={{ width: 500, height: 450, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {imageList.map((item, index) => (
          <ImageListItem key={item}>
            <img
              // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={item}
              // alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default MasonryImageList;
