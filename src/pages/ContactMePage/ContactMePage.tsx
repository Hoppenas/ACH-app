import React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import profileImg from "../../images/profileImg.jpg";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { minWidth } from "../../constants/styleConstants";
import ContactList from "../../components/ContactList/ContactList";

const ContactMePage = () => {
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
            <Typography variant="h3" marginBottom={1}>
              Susisiek su manimi
            </Typography>
            <ContactList />
          </Box>
          {!matches && <FollowMeBar vertical={false} />}
        </Grid>
      </Grid>
      <Grid item xs={matches ? 6 : 12} height="100%">
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
