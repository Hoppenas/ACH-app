import { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import ContactList from "../../components/ContactList/ContactList";

interface Props {
  isLogedIn: boolean;
}

const collection = CollectionTypes.Paintings;

const PaintingOverview = ({ isLogedIn }: Props) => {
  const [selectedImg, setSelectedImg] = useState<{
    index: number;
    url: string;
    id: string;
  } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { paintingId } = useParams();
  const { url, progress } = usePaintingPhotoUpload(file, paintingId);
  const matches = useMediaQuery(`(min-width:${minWidth})`);
  const { painting } = usePainting(collection, paintingId);
  const { paintingPhoto } = usePaintingPhoto(paintingId);
  const navigate = useNavigate();

  const photoList = [
    {
      url: painting.url,
      createAt: painting.createAt,
      id: paintingId || "1",
    },
    ...paintingPhoto,
  ];

  const handleOpenOtherPhoto = (newIndex: number) => {
    if (
      paintingPhoto &&
      selectedImg &&
      newIndex < photoList.length &&
      newIndex >= 0
    ) {
      setSelectedImg({
        index: newIndex,
        url: photoList[newIndex].url,
        id: photoList[newIndex].id,
      });
    }
  };

  return (
    <Grid paddingTop="65px">
      <Grid item container xs={12} direction="row">
        <Box position="absolute" top="105px" left="10px">
          <IconButton color="inherit" onClick={() => navigate("/paintings")}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Box>
        {matches && <FollowMeBar vertical={true} />}
        <Grid item container xs margin="auto 0" paddingLeft={1}>
          <Box maxWidth="1320px" width="80%" margin="0 auto" textAlign="center">
            <Typography variant="h3" marginBottom={1}>
              {painting.name}
            </Typography>
            <Typography variant="h5" marginBottom={1}>
              Kaina: {painting.price} eur
            </Typography>
            {painting.dimentions && (
              <Typography variant="h5" marginBottom={1}>
                {painting.dimentions} cm
              </Typography>
            )}
            {painting.isSold && (
              <Typography variant="h5" marginBottom={1}>
                Parduota
              </Typography>
            )}
            <Typography variant="h5" marginBottom={1}>
              Susisiek su manimi
            </Typography>
            <Box width="fit-content" margin="0 auto">
              <ContactList />
            </Box>
            <PaintingImagesList
              imageList={photoList}
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
          handleOpenOtherPhoto={handleOpenOtherPhoto}
          totalNumberOfImages={photoList ? photoList.length : 0}
        />
      )}
    </Grid>
  );
};

export default PaintingOverview;
