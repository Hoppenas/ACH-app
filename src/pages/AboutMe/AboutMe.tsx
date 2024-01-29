import React from "react";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import aboutMeImg from "../../images/aboutMe.jpg";
import { useNavigate } from "react-router-dom";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { minWidth } from "../../constants/styleConstants";

const AboutMe = () => {
  const navigate = useNavigate();
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
          xs
          margin="auto 0"
          paddingLeft={1}
          marginLeft={matches ? "35px" : 0}
        >
          <Box maxWidth="600px" margin="0 auto" paddingX={1}>
            <Typography variant="h6" textAlign="justify">
              Aistra grimo ir makiažo pasauliui veda mane per neįtikėtinus
              kūrybinius kelius. Esu profesionali vizažistė, grimo dailininkė ir
              šukuosenų meistrė, kaskart siekianti perteikti kiekvienos
              asmenybės unikalumą ir grožį. Mano rankose Jūsų įvaizdis tampa
              meniniu kūriniu - nuo subtilių natūralių akcentų iki ryškiausio
              šou.
            </Typography>
            <Typography variant="h6" marginTop={2}>
              Mano tikslas - ne tik sukurti puikų įvaizdį, bet ir skatinti
              kiekvieną moterį labiau pasitikėti savimi.
            </Typography>
            <Typography variant="h6" marginTop={2}>
              Esu labai pareiginga, atsakinga, darbšti ir maloni specialistė.
              Kiekviena mano klientė yra dovana.
            </Typography>
            <Typography variant="h6" marginTop={2}>
              Nekantrauju pasimatyti ir su Tavimi!
            </Typography>
            <Typography variant="subtitle1" marginY={2} textAlign="right">
              Agnė
            </Typography>
            <Grid
              container
              direction="row"
              gap={3}
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
                sx={{
                  ":hover": {
                    bgcolor: "#FFF",
                    color: "#0e0e0d",
                  },
                }}
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

export default AboutMe;
