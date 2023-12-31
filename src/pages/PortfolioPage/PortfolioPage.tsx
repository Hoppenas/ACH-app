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

const PortfolioPage = ({ isLogedIn }: Props) => {
  const [selectedImg, setSelectedImg] = useState<{
    index: number;
    url: string;
  } | null>(null);

  const { docs } = useFirestore(CollectionTypes.Images);

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
    <Grid container height="100vh" paddingTop="65px">
      <Grid
        item
        container
        xs={12}
        direction="row"
        sx={{ overflowY: "scroll" }}
        height="100%"
      >
        {matches && <FollowMeBar vertical={true} />}
        <Grid item xs margin="auto 0" paddingLeft={1}>
          <Box maxWidth="1320px" width="80%" margin="0 auto">
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              Portfolio
            </Typography>
            <MasonryImageList
              imageList={docs as IPhoto[]}
              openImage={setSelectedImg}
              collectionType={CollectionTypes.Images}
              isLogedIn={isLogedIn}
            />

            {isLogedIn && (
              <UploadFormContainer collection={CollectionTypes.Images} />
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
    </Grid>
  );
};

export default PortfolioPage;
