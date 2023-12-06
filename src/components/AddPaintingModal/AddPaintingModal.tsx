import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Grid, Button, TextField, Checkbox, Typography } from "@mui/material";
import { CollectionTypes } from "../../types/types";
import { types } from "../../constants/general";
import ProgressBar from "../ProgressBar/ProgressBar";
import usePaintingUpload from "../../hooks/usePaintingUpload";

export interface IAddPaintingModal {
  handleClose: () => void;
}

const AddPaintingModal: React.FC<IAddPaintingModal> = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [isSold, setIsSold] = useState(false);
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const paintingInfo = { name: name, price: price, isSold: isSold };

  const { url, progress } = usePaintingUpload(file, paintingInfo);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selected = e.target.files;
    if (selected && types.includes(selected[0].type)) {
      setFile(selected[0]);
      setError(null);
    } else {
      setFile(null);
      setError("Please sellect an image (png or jpg)");
    }
  };

  const handleAdd = () => {
    const paintingData = {
      name: name,
      price: price,
      isSold: isSold,
    };
    if (name && price && file) {
      console.log(paintingData);
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
        marginY={4}
        width="40%"
        height="40%"
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
          <form>
            <label>
              <input type="file" onChange={changeHandler} />
              <span>Add photo</span>
            </label>
            <div className="output">
              {error && <div className="error">{error}</div>}
              {file && <div className="">{file.name}</div>}
              {file && (
                <ProgressBar
                  file={file}
                  setFile={setFile}
                  collectionName={CollectionTypes.Paintings}
                  progress={progress}
                />
              )}
            </div>
          </form>
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
            //   variant="outlined"
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
