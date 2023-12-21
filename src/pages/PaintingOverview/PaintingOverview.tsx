import React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { minWidth } from "../../constants/styleConstants";
import { useParams } from "react-router-dom";
import { CollectionTypes } from "../../types/types";
import usePainting from "../../hooks/usePainting";

// const q = query(citiesRef, where("country", "in", ["USA", "Japan"]));

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
            {!matches && <FollowMeBar vertical={false} />}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaintingOverview;
