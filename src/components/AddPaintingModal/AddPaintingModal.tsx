import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Grid, Button, TextField, Checkbox, Typography } from "@mui/material";
import { CollectionTypes } from "../../types/types";
import { types } from "../../constants/general";
import ProgressBar from "../ProgressBar/ProgressBar";
import usePaintingUpload from "../../hooks/usePaintingUpload";
import UploadForm from "../UploadForm/UploadForm";

export interface IAddPaintingModal {
  handleClose: () => void;
}

const AddPaintingModal: React.FC<IAddPaintingModal> = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [isSold, setIsSold] = useState(false);
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const { url, progress, handleAddPainting } = usePaintingUpload(file);

  const handleAdd = () => {
    const paintingData = {
      name: name,
      price: price,
      isSold: isSold,
    };
    if (name && price && url) {
      handleAddPainting(paintingData);
      //TODO: ADD navigate to paintings/:paintingId/overview
    }
  };
  return (
    <motion.div
      className="backdrop"
      //   onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Grid
        container
        direction="column"
        gap={1}
        padding={5}
        width="50%"
        margin="70px auto"
        boxShadow="3px 5px 7px rgba(0, 0, 0, 0.5)"
        border="3px solid #FFF"
        bgcolor="#FFF"
        justifyContent="center"
        alignItems="center"
        color="#0e0e0d"
      >
        <Typography>Pavadinimas</Typography>
        <TextField
          // label="Pavadinimas"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Typography>Kaina</Typography>
        <TextField
          // label="Kaina"
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
        />
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Checkbox
            name="sold"
            value={isSold}
            onChange={(event) => setIsSold(event.target.checked)}
          />
          <Typography>Mark as sold</Typography>
        </Grid>

        <Grid item>
          <UploadForm
            file={file}
            setFile={setFile}
            progress={progress}
            url={url}
          />
        </Grid>
        <Grid item>
          {file && <ProgressBar progress={progress} />}
          {url && <img src={url} alt="painting" style={{ margin: "auto" }} />}
        </Grid>
        <Grid item container width="fit-content" gap={2}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              height: "fit-content",
              color: "#FFF",
              background: "#0e0e0d",
              ":hover": {
                bgcolor: "#FFF",
                color: "#0e0e0d",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            color="inherit"
            onClick={handleAdd}
            // disabled={!name || !price}
            sx={{
              height: "fit-content",
              color: "#FFF",
              background: "#0e0e0d",
              ":hover": {
                bgcolor: "#FFF",
                color: "#0e0e0d",
              },
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default AddPaintingModal;
