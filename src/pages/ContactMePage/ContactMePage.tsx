import * as React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import profileImg from "../../images/profileImg.jpg";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { minWidth } from "../../constants/styleConstants";

//https://ubaimutl.github.io/react-portfolio/

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const ContactMePage = (props: Props) => {
  const matches = useMediaQuery(`(min-width:${minWidth})`);

  return (
    <Grid
      container
      direction={matches ? "row" : "column-reverse"}
      height={matches ? "100%" : "auto"}
      padding="65px 10px 10px"
    >
      <Grid item container xs={matches ? 6 : 12} direction="row">
        {matches && <FollowMeBar vertical={true} />}
        <Grid
          item
          container
          xs
          margin="auto 0"
          paddingLeft={1}
          marginLeft={matches ? "35px" : 0}
        >
          <Box maxWidth="450px" margin="0 auto">
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              Contact Me
            </Typography>
            <Typography variant="h5" marginBottom={3} fontFamily="Marcellus">
              Email agne.hopp@gmail.com
            </Typography>
            <Typography variant="h5" marginBottom={3} fontFamily="Marcellus">
              Tel +370 611 34488
            </Typography>
          </Box>
          {!matches && <FollowMeBar vertical={false} />}
        </Grid>
      </Grid>
      <Grid xs={matches ? 6 : 12} height="100%">
        <img
          src={profileImg}
          alt="Me"
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      </Grid>
    </Grid>
  );
};

export default ContactMePage;
