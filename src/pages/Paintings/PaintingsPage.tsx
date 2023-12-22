import { useState } from "react";
import { Box, Grid, Typography, useMediaQuery, Button } from "@mui/material";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import Modal from "../../components/Modal/Modal";
import { CollectionTypes } from "../../types/types";
import useFirestore, { IImages } from "../../hooks/useFirestore";
import { minWidth } from "../../constants/styleConstants";
import AddPaintingModal from "../../components/AddPaintingModal/AddPaintingModal";
import PaintingsImageList from "../../components/PaintingsImageList/PaintingsImageList";
import { useNavigate } from "react-router-dom";

interface Props {
  isLogedIn: boolean;
}

const collection = CollectionTypes.Paintings;

const PaintingsPage = ({ isLogedIn }: Props) => {
  const [openAddNewPaintingModal, setOpenAddNewPaintingModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState<{
    index: number;
    url: string;
  } | null>(null);
  const { docs } = useFirestore(collection);

  const navigate = useNavigate();

  const matches = useMediaQuery(`(min-width:${minWidth})`);

  const handleopenOtherPhoto = (newIndex: number) => {
    if (docs && selectedImg && newIndex < docs.length && newIndex >= 0) {
      setSelectedImg({
        index: newIndex,
        url: docs[newIndex].url,
      });
    }
  };

  return (
    <Grid height="100%" paddingTop="65px">
      <Grid item container xs={12} direction="row">
        {matches && <FollowMeBar vertical={true} />}
        <Grid item xs margin="auto 0" paddingLeft={1}>
          <Box maxWidth="1320px" width="80%" margin="0 auto">
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              Paveikslai
            </Typography>
            <PaintingsImageList
              imageList={docs as IImages[]}
              handleGoToPainting={(id) => navigate(`/paintings/${id}/overview`)}
              collectionType={collection}
              isLogedIn={isLogedIn}
            />

            {isLogedIn && (
              <Button
                variant="contained"
                onClick={() => setOpenAddNewPaintingModal(true)}
                sx={{
                  color: "#0e0e0d",
                  background: "#FFF",
                  ":hover": {
                    bgcolor: "#0e0e0d",
                    color: "#FFF",
                  },
                }}
              >
                Add painting
              </Button>
            )}
            {!matches && <FollowMeBar vertical={false} />}
          </Box>
        </Grid>
      </Grid>
      {selectedImg && (
        <Modal
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          handleopenOtherPhoto={handleopenOtherPhoto}
          totalNumberOfImages={docs ? docs.length : 0}
        />
      )}
      {openAddNewPaintingModal && (
        <AddPaintingModal
          handleClose={() => setOpenAddNewPaintingModal(false)}
        />
      )}
    </Grid>
  );
};

export default PaintingsPage;
