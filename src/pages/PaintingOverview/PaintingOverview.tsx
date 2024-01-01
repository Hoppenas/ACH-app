import React from "react";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { minWidth } from "../../constants/styleConstants";
import { useParams } from "react-router-dom";
import { CollectionTypes } from "../../types/types";
import usePainting from "../../hooks/usePainting";
import UploadFormContainer from "../../components/UploadForm/UploadFormContainer";

//https://ubaimutl.github.io/react-portfolio/

interface Props {
  isLogedIn: boolean;
}

const PaintingOverview = ({ isLogedIn }: Props) => {
  const { paintingId } = useParams();
  const matches = useMediaQuery(`(min-width:${minWidth})`);
  const collection = CollectionTypes.Paintings;
  const { painting } = usePainting(collection, paintingId);
  return (
    <Grid height="100%" paddingTop="65px">
      <Grid item container xs={12} direction="row">
        {matches && <FollowMeBar vertical={true} />}
        <Grid item xs margin="auto 0" paddingLeft={1}>
          <Box maxWidth="1320px" width="80%" margin="0 auto">
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              Painting id: {paintingId}
            </Typography>
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              name: {painting.name}
            </Typography>
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              Price: {painting.price} eur
            </Typography>
            {painting.isSold && (
              <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
                Sold
              </Typography>
            )}
            {/* {isLogedIn && (
              <Button
                variant="contained"
                onClick={() => console.log("add img")}
                sx={{
                  color: "#0e0e0d",
                  background: "#FFF",
                  ":hover": {
                    bgcolor: "#0e0e0d",
                    color: "#FFF",
                  },
                }}
              >
                Add image
              </Button>
            )} */}
            {!matches && <FollowMeBar vertical={false} />}
            {isLogedIn && (
              <UploadFormContainer collection={`${collection}/${paintingId}`} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaintingOverview;
