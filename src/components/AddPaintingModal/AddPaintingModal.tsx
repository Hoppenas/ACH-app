import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Grid, Button, TextField, Checkbox, Typography } from "@mui/material";
import ProgressBar from "../ProgressBar/ProgressBar";
import usePaintingUpload from "../../hooks/usePaintingUpload";
import UploadForm from "../UploadForm/UploadForm";
import { useNavigate } from "react-router-dom";

export interface IAddPaintingModal {
  handleClose: () => void;
}

const AddPaintingModal: React.FC<IAddPaintingModal> = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [dims, setDims] = useState("");
  const [isSold, setIsSold] = useState(false);
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const { url, progress, handleAddPainting, id } = usePaintingUpload(file);

  useEffect(() => {
    if (id) {
      navigate(`${id}/overview`);
    }
  }, [id, navigate]);

  const handleAdd = () => {
    const paintingData = {
      name: name,
      price: price,
      isSold: isSold,
      dimentions: dims,
    };
    if (name && price && url) {
      handleAddPainting(paintingData);
    }
  };
  return (
    <motion.div
      className="backdrop"
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
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Typography>Kaina</Typography>
        <TextField
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
        />
        <Typography>Išmatavimai</Typography>
        <TextField
          value={dims}
          onChange={(event) => setDims(event.target.value)}
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
          {url && (
            <img
              src={url}
              alt="painting"
              style={{ margin: "auto", maxHeight: "300px" }}
            />
          )}
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
