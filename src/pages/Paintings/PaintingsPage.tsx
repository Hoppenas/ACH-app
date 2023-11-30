import React, { useState } from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import MasonryImageList from "../../components/MasonryImageList/MasonryImageList";
import UploadForm from "../../components/UploadForm/UploadForm";
import Modal from "../../components/Modal/Modal";
import Login from "../../components/LogIn/Login";
import { CollectionTypes } from "../../types/types";
import useFirestore, { IImages } from "../../hooks/useFirestore";
import { minWidth } from "../../constants/styleConstants";

//https://ubaimutl.github.io/react-portfolio/

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const PaintingsPage = (props: Props) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const { docs } = useFirestore(CollectionTypes.Hair);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.ctrlKey && event.code === "KeyL") {
      event.preventDefault();
      console.log("hello");
      setShowLogin(true);
    }
  };

  const handleClose = () => setShowLogin(false);
  const matches = useMediaQuery(`(min-width:${minWidth})`);

  return (
    <Grid height="100%" paddingTop="65px" onKeyDown={keyDownHandler}>
      <Grid item container xs={12} direction="row">
        {matches && <FollowMeBar vertical={true} />}
        <Grid item xs margin="auto 0" paddingLeft={1}>
          <Box maxWidth="1320px" width="80%" margin="0 auto">
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              Paintings
            </Typography>
            <MasonryImageList
              imageList={docs as IImages[]}
              openImage={setSelectedImg}
            />

            <UploadForm collection={CollectionTypes.Hair} />
            {showLogin && <Login handleClose={handleClose} />}

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

export default PaintingsPage;
