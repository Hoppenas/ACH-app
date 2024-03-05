import { useState, FC } from "react";
import { motion } from "framer-motion";
import { Grid, Button, TextField, Typography } from "@mui/material";
import UploadForm from "../UploadForm/UploadForm";
import useServiceUpload from "../../hooks/useServiceUpload";
import { deleteFileFromStorage } from "../../utils/deleteFile";

export interface IAddServiceModal {
  handleClose: () => void;
}

const AddServiceModal: FC<IAddServiceModal> = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { url, progress, handleAddService, thumbnailUrl } =
    useServiceUpload(file);

  const handleCancel = () => {
    if (url) {
      deleteFileFromStorage(url);
    }
    if (thumbnailUrl) {
      deleteFileFromStorage(thumbnailUrl);
    }
    handleClose();
  };

  const handleAdd = () => {
    if (name && url) {
      handleAddService(name);
      handleClose();
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

        <Grid item>
          <UploadForm
            file={file}
            setFile={setFile}
            progress={progress}
            url={url}
          />
        </Grid>
        <Grid item>
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
            onClick={handleCancel}
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

export default AddServiceModal;
