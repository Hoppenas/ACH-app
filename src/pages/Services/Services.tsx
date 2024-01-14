import * as React from "react";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import aboutMeImg from "../../images/aboutMe.jpg";
import { useNavigate } from "react-router-dom";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { minWidth } from "../../constants/styleConstants";

const servicesList = [
  "Dieninis makiažas nuo 50 eur",
  "Vakarinis, sceninis makiažas nuo 60 eur",
  "Vestuvinis grimas nuo 70 eur",
  "Teminis grimas/makiažas nuo 50 eur",
  "Šukuosena nuo 50 eur",
  "Makiažas ir šukuosena  nuo 80 eur",
  "Grimas nuo 70 eur",
  "Verslo portretai nuo 35 eur / žm. ",
  "Individualūs makiažo mokymai nuo 150 eur",
  "Individualūs šukuosenų mokymai nuo 150 eur",
];

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
            <Typography variant="h3" marginBottom={1}>
              Paslaugos:
            </Typography>
            {/* <Typography variant="h4" marginBottom={3} >
              I will help you to show your inner beauty
            </Typography> */}
            {servicesList.map((service, index) => (
              <Typography key={index} variant="h6">
                {service}
              </Typography>
            ))}
            <Typography variant="h6" marginTop={3}>
              Dėl tikslesnių kainų, labai mielai kviečiu brūkštelti
              agne.hopp@gmail.com arba skambinti +370 611 34488
            </Typography>
            <Grid
              container
              direction="row"
              gap={2}
              marginY={4}
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
