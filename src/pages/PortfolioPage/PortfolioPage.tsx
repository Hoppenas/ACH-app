import { useState } from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import MasonryImageList from "../../components/MasonryImageList/MasonryImageList";
import Modal from "../../components/Modal/Modal";
import useFirestore from "../../hooks/useFirestore";
import { CollectionTypes, IPhoto } from "../../types/types";
import { minWidth } from "../../constants/styleConstants";
import UploadFormContainer from "../../components/UploadForm/UploadFormContainer";

interface Props {
  isLogedIn: boolean;
}

const collection = CollectionTypes.Images;

const PortfolioPage = ({ isLogedIn }: Props) => {
  const [selectedImg, setSelectedImg] = useState<{
    index: number;
    url: string;
    id: string;
  } | null>(null);

  const { docs } = useFirestore(collection);

  const matches = useMediaQuery(`(min-width:${minWidth})`);

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
    <Grid container height="100%" paddingTop="65px">
      <Grid item container xs={12} direction="row" overflow="hidden">
        {matches && <FollowMeBar vertical={true} />}
        <Grid item xs paddingLeft={1}>
          <Box maxWidth="1320px" width="80%" margin="0 auto">
            <Grid container direction="row" justifyContent="space-between">
              <Typography variant="h3">Portfolio</Typography>
              {isLogedIn && <UploadFormContainer collection={collection} />}
            </Grid>
            <MasonryImageList
              imageList={docs as IPhoto[]}
              openImage={setSelectedImg}
              collectionType={collection}
              isLogedIn={isLogedIn}
            />
            {!matches && <FollowMeBar vertical={false} />}
          </Box>
        </Grid>
      </Grid>
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

export default PortfolioPage;
