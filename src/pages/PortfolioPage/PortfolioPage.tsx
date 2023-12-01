import React, { useState } from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import MasonryImageList from "../../components/MasonryImageList/MasonryImageList";
import UploadForm from "../../components/UploadForm/UploadForm";
import Modal from "../../components/Modal/Modal";
import useFirestore, { IImages } from "../../hooks/useFirestore";
import { CollectionTypes } from "../../types/types";
import { minWidth } from "../../constants/styleConstants";

//https://ubaimutl.github.io/react-portfolio/

interface Props {
  isLogedIn: boolean;
}

const PortfolioPage = ({ isLogedIn }: Props) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const { docs } = useFirestore(CollectionTypes.Images);

  const matches = useMediaQuery(`(min-width:${minWidth})`);

  return (
    <Grid container height="100vh" paddingTop="65px">
      <Grid
        item
        container
        xs={12}
        direction="row"
        sx={{ overflowY: "scroll" }}
        height="100%"
      >
        {matches && <FollowMeBar vertical={true} />}
        <Grid item xs margin="auto 0" paddingLeft={1}>
          <Box maxWidth="1320px" width="80%" margin="0 auto">
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              Portfolio
            </Typography>
            <MasonryImageList
              imageList={docs as IImages[]}
              openImage={setSelectedImg}
            />

            {isLogedIn && <UploadForm collection={CollectionTypes.Images} />}

            {!matches && <FollowMeBar vertical={false} />}
          </Box>
        </Grid>
      </Grid>
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </Grid>
  );
};

export default PortfolioPage;
