import { useState } from "react";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import aboutMeImg from "../../images/aboutMe.jpg";
import { useNavigate } from "react-router-dom";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { minWidth } from "../../constants/styleConstants";
import ContactList from "../../components/ContactList/ContactList";
import AddServiceModal from "../../components/AddServiceModal/AddServiceModal";
import useFirestore from "../../hooks/useFirestore";
import { CollectionTypes, IService } from "../../types/types";
import ServiceList from "../../components/ServicesList/ServicesList";
import Modal from "../../components/Modal/Modal";

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

interface IServicesPage {
  isLogedIn: boolean;
}

const collection = CollectionTypes.Services;

const ServicesPage = ({ isLogedIn }: IServicesPage) => {
  const [openAddNewServiceModal, setOpenAddNewServiceModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState<{
    index: number;
    url: string;
    id: string;
  } | null>(null);

  const navigate = useNavigate();
  const matches = useMediaQuery(`(min-width:${minWidth})`);

  const { docs } = useFirestore(collection);

  const handleCloseAddnewServiceModal = () => {
    setOpenAddNewServiceModal(false);
  };

  const handleOpenOtherPhoto = (newIndex: number) => {
    if (docs && selectedImg && newIndex < docs.length && newIndex >= 0) {
      setSelectedImg({
        index: newIndex,
        url: docs[newIndex].url,
        id: docs[newIndex].id,
      });
    }
  };

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
          <Box maxWidth="80%" margin="0 auto">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3" marginBottom={1}>
                Paslaugos:
              </Typography>
              {isLogedIn && (
                <Button
                  variant="outlined"
                  onClick={() => setOpenAddNewServiceModal(true)}
                  size={matches ? "large" : "medium"}
                  sx={{
                    color: "#FFF",
                    borderRadius: 2,
                    fontSize: "1.2rem",
                  }}
                >
                  + Add service
                </Button>
              )}
            </Grid>
            <ServiceList
              list={docs as IService[]}
              isLogedIn={isLogedIn}
              collectionType={collection}
              openImage={setSelectedImg}
            />
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
                size={matches ? "large" : "medium"}
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
                size="large"
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
      {openAddNewServiceModal && (
        <AddServiceModal handleClose={handleCloseAddnewServiceModal} />
      )}
      {selectedImg && (
        <Modal
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          handleOpenOtherPhoto={handleOpenOtherPhoto}
          totalNumberOfImages={docs ? docs.length : 0}
        />
      )}
    </Grid>
  );
};

export default ServicesPage;
