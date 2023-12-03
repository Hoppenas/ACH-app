import * as React from "react";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import aboutMeImg from "../../images/aboutMe.jpg";
import { useNavigate } from "react-router-dom";
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

const ServicesPage = (props: Props) => {
  const navigate = useNavigate();
  const matches = useMediaQuery(`(min-width:${minWidth})`);

  return (
    <Grid
      container
      direction={matches ? "row" : "column-reverse"}
      height={matches ? "100%" : "auto"}
      padding="65px 10px 10px"
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
              Services
            </Typography>
            <Typography variant="h4" marginBottom={3} fontFamily="Marcellus">
              I will help you to show your inner beauty
            </Typography>
            <Typography variant="h6" fontFamily="Marcellus">
              Service 1 Service 2 Service 3 Service 4
            </Typography>
            <Grid container direction="row" gap={2} margin={4}>
              <Button
                variant="contained"
                onClick={() => navigate("/makeup")}
                sx={{
                  color: "#0e0e0d",
                  background: "#FFF",
                  ":hover": {
                    bgcolor: "#0e0e0d",
                    color: "#FFF",
                  },
                }}
              >
                My portfolio
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/contacts")}
              >
                Contact me
              </Button>
            </Grid>
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
          src={aboutMeImg}
          alt="Me"
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      </Grid>
    </Grid>
  );
};

export default ServicesPage;