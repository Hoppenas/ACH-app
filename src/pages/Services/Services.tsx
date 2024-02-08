import { useState } from "react";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { minWidth } from "../../constants/styleConstants";
import AddServiceModal from "../../components/AddServiceModal/AddServiceModal";
import useFirestore from "../../hooks/useFirestore";
import { CollectionTypes, IService } from "../../types/types";
import ServiceList from "../../components/ServicesList/ServicesList";
import Modal from "../../components/Modal/Modal";

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
      overflow="hidden"
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
          <Typography variant="h3" marginBottom={1} marginX="auto">
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
