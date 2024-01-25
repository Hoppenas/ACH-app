import { useState } from "react";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
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
      item
      container
      direction="row"
      overflow="scroll"
      height="fit-content"
      padding="65px 10px 10px"
    >
      {matches && <FollowMeBar vertical={true} />}
      <Box marginX={matches ? 10 : 0}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Typography variant="h3" marginBottom={4} marginX="auto">
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
      </Box>
      {!matches && <FollowMeBar vertical={false} />}
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
