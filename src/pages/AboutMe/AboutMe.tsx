import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import aboutMeImg from "../../images/aboutMe.jpg";
import { useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

//https://ubaimutl.github.io/react-portfolio/

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const AboutMe = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="row"
      color="#FFF"
      sx={{ background: "#0e0e0d" }}
      height="100%"
      padding="65px 30px 0 0"
      alignContent="center"
    >
      <Grid item container xs={6} direction="row" height="100%">
        <Grid
          item
          container
          xs={0.5}
          justifyContent="center"
          alignContent="center"
          direction="column"
          gap={1}
        >
          <InstagramIcon />
          <FacebookIcon />
          <Grid
            item
            border="1px solid #FFF"
            height="70px"
            width="1px"
            margin="20px auto "
          />
          <Grid item>
            <Typography
              sx={{
                textOrientation: "sideways",
                writingMode: "vertical-lr",
              }}
            >
              Follow me
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={11.5} margin="auto 0">
          <Box maxWidth="450px" margin="0 auto">
            <Typography variant="h3">I'm Agne</Typography>
            <Typography variant="h3">
              I will help you to show your inner beauty{" "}
            </Typography>
            <Typography variant="h5">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer
            </Typography>
            <Grid container direction="row" gap={2} marginTop={4}>
              <Button
                variant="contained"
                onClick={() => navigate("/businessportraits")}
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
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={6} margin="auto 0">
        <img src={aboutMeImg} alt="Me" width="100%" />
      </Grid>
    </Grid>
  );
};

export default AboutMe;
