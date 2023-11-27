import * as React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import profileImg from "../../images/profileImg.jpg";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";

//https://ubaimutl.github.io/react-portfolio/

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const ContactMePage = (props: Props) => {
  const matches = useMediaQuery("(min-width:768px)");

  return (
    // <Grid
    //   container
    //   direction={matches ? "row" : "column-reverse"}
    //   color="#FFF"
    //   sx={{ background: "#0e0e0d" }}
    //   // height={matches ? "100%" : "auto"}
    //   height="100%"
    //   paddingTop="65px"
    // >
    //   <Grid
    //     item
    //     container
    //     xs={matches ? 6 : 12}
    //     direction="row"
    //     overflow="hidden"
    //     height="100%"
    //   >
    //     {matches && <FollowMeBar vertical={true} />}
    //     <Grid item xs margin="auto 0" paddingLeft={1}>
    //       <Box maxWidth="450px" margin="0 auto">
    //         <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
    //           Contact Me
    //         </Typography>
    //         <Typography variant="h4" marginBottom={3} fontFamily="Marcellus">
    //           Tel Email
    //         </Typography>
    //         {!matches && <FollowMeBar vertical={false} />}
    //       </Box>
    //     </Grid>
    //   </Grid>
    //   <Grid
    //     item
    //     container
    //     margin={matches ? "none" : "auto 0"}
    //     xs={matches ? 6 : 12}
    //     overflow="hidden"
    //     height="100%"
    //   >
    //     <img
    //       src={profileImg}
    //       alt="Me"
    //       width="100%"
    //       height="100%"
    //       style={{ objectFit: "cover" }}
    //     />
    //   </Grid>
    // </Grid>

    <Grid
      container
      direction={matches ? "row" : "column-reverse"}
      color="#FFF"
      sx={{ background: "#0e0e0d" }}
      // height={matches ? "100%" : "auto"}
      height="100vh"
      width="100%"
      paddingTop="65px"
      border="2px solid green"
    >
      <Grid
        item
        container
        xs={matches ? 6 : 12}
        direction="row"
        overflow="hidden"
        height="100%"
      >
        {matches && <FollowMeBar vertical={true} />}
        <Grid
          item
          xs
          margin="auto 0"
          paddingLeft={1}
          marginLeft={matches ? "35px" : 0}
        >
          <Box maxWidth="450px" margin="0 auto">
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              Contact Me
            </Typography>
            <Typography variant="h4" marginBottom={3} fontFamily="Marcellus">
              Tel Email
            </Typography>
            {!matches && <FollowMeBar vertical={false} />}
          </Box>
        </Grid>
      </Grid>
      <Grid
        item
        container
        margin={matches ? "none" : "auto 0"}
        xs={matches ? 6 : 12}
        overflow="hidden"
        height="100%"
      >
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
