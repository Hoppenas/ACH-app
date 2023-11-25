import React, { useState } from "react";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { gallery } from "../../images/database";
import MasonryImageList from "../../components/MasonryImageList/MasonryImageList";
import UploadForm from "../../components/UploadForm/UploadForm";
import ImageGrid from "../../components/ImageGrid/ImageGrid";
import Modal from "../../components/Modal/Modal";
import Login from "../../components/LogIn/Login";
import useFirestore, { IImages } from "../../hooks/useFirestore";

//https://ubaimutl.github.io/react-portfolio/

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const MakeUpPage = (props: Props) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const { docs } = useFirestore("images");

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.ctrlKey && event.code === "KeyL") {
      setShowLogin(true);
    }
  };

  const handleClose = () => setShowLogin(false);

  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:768px)");

  return (
    <Grid
      container
      direction={matches ? "row" : "column-reverse"}
      color="#FFF"
      sx={{ background: "#0e0e0d" }}
      height={matches ? "100%" : "auto"}
      paddingTop="65px"
      onKeyDown={keyDownHandler}
      overflow="scroll"
    >
      <Grid
        item
        container
        // xs={matches ? 6 : 12}
        xs={12}
        direction="row"
        // overflow="hidden"
        // height="100%"
      >
        {matches && <FollowMeBar vertical={true} />}
        <Grid item xs margin="auto 0" paddingLeft={1}>
          <Box maxWidth="1320px" width="80%" margin="0 auto">
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              Makeup
            </Typography>
            <MasonryImageList
              imageList={docs as IImages[]}
              openImage={setSelectedImg}
            />

            <UploadForm collection="images" />
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

export default MakeUpPage;
