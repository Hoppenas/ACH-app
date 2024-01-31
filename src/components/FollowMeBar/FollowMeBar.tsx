import { FC } from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { instagramLink, facebookLink } from "../../constants/links";

export interface IFollowMeBar {
  vertical: boolean;
}

const FollowMeBar: FC<IFollowMeBar> = ({ vertical }) => {
  return (
    <Grid
      item
      container
      xs={vertical ? 0.5 : 12}
      position={vertical ? "fixed" : "relative"}
      top="40%"
      justifyContent="center"
      alignContent="center"
      direction={vertical ? "column" : "row-reverse"}
      gap={1}
      margin={0.5}
    >
      <IconButton
        color="inherit"
        sx={{ padding: 0, cursor: "pointer" }}
        href={instagramLink}
        target="_blank"
      >
        <InstagramIcon />
      </IconButton>
      <IconButton
        color="inherit"
        sx={{ padding: 0, cursor: "pointer" }}
        href={facebookLink}
        target="_blank"
      >
        <FacebookIcon />
      </IconButton>
      <Grid
        item
        border="1px solid #FFF"
        height={vertical ? "70px" : "1px"}
        width={vertical ? "1px" : "70px"}
        margin={vertical ? "10px auto" : "auto 20px"}
      />
      <Grid item marginTop={3} margin={vertical ? "30px 0" : "auto 0"}>
        <Typography
          noWrap
          sx={{
            transform: vertical ? "rotate(-90deg)" : "none",
          }}
        >
          Follow me
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FollowMeBar;
