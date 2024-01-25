import { FC, useState } from "react";
import { Grid } from "@mui/material";
import deleteFile from "../../utils/deleteFile";
import {
  CollectionTypes,
  IModalImage,
  IPhoto,
  IService,
} from "../../types/types";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import ServiceListItem from "../ServiceListItem/ServiceListItem";

interface IMasonryImageList {
  list: IService[];
  collectionType: CollectionTypes;
  isLogedIn: boolean;
  openImage: (img: IModalImage) => void;
}

const ServiceList: FC<IMasonryImageList> = ({
  list,
  collectionType,
  isLogedIn,
  openImage,
}) => {
  const [openDeletePhotoDialog, setOpenDeletePhotoDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);

  const handleOpenDeletePhotoDialog = (photo: IPhoto) => {
    setOpenDeletePhotoDialog(true);
    setSelectedPhoto(photo);
  };

  const handleDeletePhoto = () => {
    deleteFile(selectedPhoto, collectionType);
    setOpenDeletePhotoDialog(false);
    setSelectedPhoto(null);
  };

  const handleCloseDeletePhotoDialog = () => {
    setOpenDeletePhotoDialog(false);
    setSelectedPhoto(null);
  };

  return (
    <Grid
      container
      direction="row"
      gap={5}
      width="80%"
      margin="auto"
      justifyContent="center"
    >
      {list &&
        list.map((item, index) => (
          <ServiceListItem
            service={item}
            handleOpenDeletePhotoDialog={handleOpenDeletePhotoDialog}
            isLogedIn={isLogedIn}
            index={index}
            openImage={openImage}
          />
        ))}
      <ConfirmationDialog
        open={openDeletePhotoDialog}
        handleClose={handleCloseDeletePhotoDialog}
        handleConfirm={handleDeletePhoto}
        question="Are you sure you want to delete?"
      />
    </Grid>
  );
};

export default ServiceList;
