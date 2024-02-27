import { FC } from "react";
import { Box, IconButton, Typography, Grid } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { motion } from "framer-motion";
import { IModalImage, IPhoto, IService } from "../../types/types";

interface IServiceListItem {
  service: IService;
  handleOpenDeletePhotoDialog: (photo: IPhoto) => void;
  isLogedIn: boolean;
  openImage: (image: IModalImage) => void;
  index: number;
}

const ServiceListItem: FC<IServiceListItem> = ({
  service,
  handleOpenDeletePhotoDialog,
  isLogedIn,
  openImage,
  index,
}) => {
  return (
    <Grid
      item
      maxWidth={250}
      maxHeight={350}
      borderRadius={10}
      overflow="hidden"
      position="relative"
      boxShadow="0px 0px 5px #fff"
    >
      <motion.img
        src={service.url}
        alt="portfolio pic"
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onClick={() =>
          openImage({ index: index, url: service.url, id: service.id })
        }
      />
      <Box
        bgcolor="#00000080"
        position="absolute"
        margin="0 5%"
        bottom="10px"
        width="90%"
        borderRadius={3}
      >
        <Typography variant="h6" color="#FFF" padding={1}>
          {service.name}
        </Typography>
      </Box>
      {isLogedIn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            color: "red",
            cursor: "pointer",
          }}
        >
          <IconButton
            sx={{
              padding: 0.5,
              margin: 0.5,
              cursor: "pointer",
              borderRadius: 5,
              border: "1px solid #FFF",
            }}
            onClick={() => handleOpenDeletePhotoDialog(service)}
          >
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </motion.div>
      )}
    </Grid>
  );
};

export default ServiceListItem;
