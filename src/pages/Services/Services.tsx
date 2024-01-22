import * as React from "react";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import aboutMeImg from "../../images/aboutMe.jpg";
import { useNavigate } from "react-router-dom";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { minWidth } from "../../constants/styleConstants";
import ContactList from "../../components/ContactList/ContactList";

const servicesList = [
  "Dieninis makiažas",
  "Vakarinis, sceninis makiažas",
  "Vestuvinis grimas",
  "Teminis grimas/makiažas",
  "Šukuosena",
  "Makiažas ir šukuosena",
  "Grimas",
  "Verslo portretai",
  "Individualūs makiažo mokymai",
  "Individualūs šukuosenų mokymai",
];

const ServicesPage = () => {
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
            <Typography variant="h4" marginBottom={1}>
              Paslaugos:
            </Typography>
            {servicesList.map((service, index) => (
              <Typography key={index} variant="h6">
                {service}
              </Typography>
            ))}
            <Typography variant="h6" marginTop={3} marginBottom={3}>
              Dėl tikslesnių kainų, labai mielai kviečiu susisiekti:
            </Typography>
            <ContactList />
            <Grid
              container
              direction="row"
              gap={2}
              marginY={5}
              justifyContent={matches ? "left" : "space-around"}
            >
              <Button
                variant="contained"
                onClick={() => navigate("/portfolio")}
                sx={{
                  color: "#0e0e0d",
                  background: "#FFF",
                  ":hover": {
                    bgcolor: "#0e0e0d",
                    color: "#FFF",
                  },
                }}
              >
                Mano darbai
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/contacts")}
              >
                Susisiek su manimi!
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
