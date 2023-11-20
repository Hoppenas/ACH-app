import * as React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import aboutMeImg from "../../images/aboutMe.jpg";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const AboutMe = (props: Props) => {
  return (
    <Grid container direction="row">
      <Grid item xs={8}>
        <Typography variant="h2">About Agne</Typography>
        <Typography variant="h3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Paper variant="outlined">
          <img src={aboutMeImg} alt="Me" width="100%" />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AboutMe;
