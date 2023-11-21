import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import aboutMeImg from "../../images/aboutMe.jpg";
import { useNavigate } from "react-router-dom";

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
      padding="60px 30px 30px"
      alignContent="center"
    >
      <Grid item xs={6}>
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
      <Grid item xs={6}>
        {/* <Paper variant="outlined"> */}
        <img src={aboutMeImg} alt="Me" width="100%" />
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
};

export default AboutMe;
