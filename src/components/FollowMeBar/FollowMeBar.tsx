import React, { FC } from "react";
import { Grid, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export interface IFollowMeBar {
  vertical: boolean;
}

const FollowMeBar: FC<IFollowMeBar> = ({ vertical }) => {
  return (
    <Grid
      item
      container
      xs={vertical ? 0.5 : 12}
      justifyContent="center"
      alignContent="center"
      direction={vertical ? "column" : "row-reverse"}
      gap={1}
      margin={1}
    >
      <InstagramIcon />
      <FacebookIcon />
      <Grid
        item
        border="1px solid #FFF"
        height={vertical ? "70px" : "1px"}
        width={vertical ? "1px" : "70px"}
        margin={vertical ? "20px auto" : "auto 20px"}
      />
      <Grid item>
        <Typography
          sx={{
            textOrientation: vertical ? "sideways" : "unset",
            writingMode: vertical ? "vertical-lr" : "unset",
          }}
        >
          Follow me
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FollowMeBar;
