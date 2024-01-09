import { useState } from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { minWidth } from "../../constants/styleConstants";
import { useParams } from "react-router-dom";
import { CollectionTypes } from "../../types/types";
import usePainting from "../../hooks/usePainting";
import usePaintingPhotoUpload from "../../hooks/usePaintingPhotoUpload";
import UploadForm from "../../components/UploadForm/UploadForm";
import usePaintingPhoto from "../../hooks/usePaintingPhoto";
import PaintingImagesList from "../../components/PaintingImagesList/PaintingImagesList";
import Modal from "../../components/Modal/Modal";

//https://ubaimutl.github.io/react-portfolio/

interface Props {
  isLogedIn: boolean;
}

const PaintingOverview = ({ isLogedIn }: Props) => {
  const [selectedImg, setSelectedImg] = useState<{
    index: number;
    url: string;
  } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { paintingId } = useParams();
  const { url, progress } = usePaintingPhotoUpload(file, paintingId);
  const matches = useMediaQuery(`(min-width:${minWidth})`);
  const collection = CollectionTypes.Paintings;
  const { painting } = usePainting(collection, paintingId);
  const { paintingPhoto } = usePaintingPhoto(paintingId);

  const handleopenOtherPhoto = (newIndex: number) => {
    if (
      paintingPhoto &&
      selectedImg &&
      newIndex < paintingPhoto.length &&
      newIndex >= 0
    ) {
      setSelectedImg({
        index: newIndex,
        url: paintingPhoto[newIndex].url,
      });
    }
  };

  return (
    <Grid paddingTop="65px">
      <Grid item container xs={12} direction="row">
        {matches && <FollowMeBar vertical={true} />}
        <Grid item xs margin="auto 0" paddingLeft={1}>
          <Box maxWidth="1320px" width="80%" margin="0 auto" textAlign="center">
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              {painting.name}
            </Typography>
            <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
              Kaina: {painting.price} eur
            </Typography>
            {painting.isSold && (
              <Typography variant="h3" marginBottom={1} fontFamily="Marcellus">
                Parduota
              </Typography>
            )}
            <PaintingImagesList
              imageList={paintingPhoto}
              openImage={setSelectedImg}
              isLogedIn={isLogedIn}
              paintingId={paintingId}
            />
            {!matches && <FollowMeBar vertical={false} />}
            {isLogedIn && (
              <UploadForm
                file={file}
                setFile={setFile}
                url={url}
                progress={progress}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      {selectedImg && (
        <Modal
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          handleopenOtherPhoto={handleopenOtherPhoto}
          totalNumberOfImages={paintingPhoto ? paintingPhoto.length : 0}
        />
      )}
    </Grid>
  );
};

export default PaintingOverview;
