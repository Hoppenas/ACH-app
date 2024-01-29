import { useState } from "react";
import { Box, Grid, Typography, useMediaQuery, Button } from "@mui/material";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import Modal from "../../components/Modal/Modal";
import { CollectionTypes, IPaintings } from "../../types/types";
import useFirestore from "../../hooks/useFirestore";
import { minWidth } from "../../constants/styleConstants";
import AddPaintingModal from "../../components/AddPaintingModal/AddPaintingModal";
import PaintingsImageList from "../../components/PaintingsImageList/PaintingsImageList";
import { useNavigate } from "react-router-dom";
import { deleteFileFromStorage } from "../../utils/deleteFile";

interface IPaintingsPage {
  isLogedIn: boolean;
}

const collection = CollectionTypes.Paintings;

const PaintingsPage = ({ isLogedIn }: IPaintingsPage) => {
  const [openAddNewPaintingModal, setOpenAddNewPaintingModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState<{
    index: number;
    url: string;
    id: string;
  } | null>(null);
  const { docs } = useFirestore(collection);

  const navigate = useNavigate();

  const matches = useMediaQuery(`(min-width:${minWidth})`);

  const handleopenOtherPhoto = (newIndex: number) => {
    if (docs && selectedImg && newIndex < docs.length && newIndex >= 0) {
      setSelectedImg({
        index: newIndex,
        url: docs[newIndex].url,
        id: docs[newIndex].id,
      });
    }
  };

  const handleCloseAddPaintingModal = (url: string | null) => {
    if (url) {
      deleteFileFromStorage(url);
    }
    setOpenAddNewPaintingModal(false);
  };

  return (
    <Grid paddingTop="65px" item container xs={12} direction="row">
      {matches && <FollowMeBar vertical={true} />}
      <Grid item margin="auto" paddingLeft={1} maxWidth="1320px" width="80%">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" marginBottom={1}>
            Paveikslai
          </Typography>
          {isLogedIn && (
            <Button
              variant="outlined"
              onClick={() => setOpenAddNewPaintingModal(true)}
              size="large"
              sx={{
                color: "#FFF",
                borderRadius: 2,
                fontSize: "1.2rem",
              }}
            >
              + Add painting
            </Button>
          )}
        </Grid>
        <Typography variant="h6" textAlign="justify" marginBottom={2}>
          Esu kūrėja, kuri mėgsta tapyti ne tik portretus, bet ir abstrakčius
          paveikslus. Per skirtingas formas, potėpius, spalvas, tekstūras
          stengiuosi perteikti savo emocijas, nuotaikas, jausmus ir
          pasaulėžiūrą.
        </Typography>
        <Typography variant="h6" textAlign="justify" marginBottom={2}>
          Mano meninė interpretacija dažnai sutelkiama į moterų portretus.
          Stengiuosi išryškinti jų moteriškumą, grakštumą ir gilumą. Kiekviena
          mano sukurta moteris tampa gyva ir įdomia.
        </Typography>
        <Typography variant="h6" textAlign="justify" marginBottom={5}>
          Noriu pasidalinti savo kūrybine kelione bei savęs paieškomis.
          Didžiausias komplimentas, kai mano paveikslas tampa jūsų interjero
          dalimi. Jeigu domina kuris nors kūrinys - mielai lauksiu Jūsų žinutės.
        </Typography>
        <PaintingsImageList
          imageList={docs as IPaintings[]}
          handleGoToPainting={(id) => navigate(`/paintings/${id}/overview`)}
          collectionType={collection}
          isLogedIn={isLogedIn}
        />
        {!matches && <FollowMeBar vertical={false} />}
      </Grid>
      {selectedImg && (
        <Modal
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          handleOpenOtherPhoto={handleopenOtherPhoto}
          totalNumberOfImages={docs ? docs.length : 0}
        />
      )}
      {openAddNewPaintingModal && (
        <AddPaintingModal handleClose={handleCloseAddPaintingModal} />
      )}
    </Grid>
  );
};

export default PaintingsPage;
