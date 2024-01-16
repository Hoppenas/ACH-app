import React, { ChangeEvent, useEffect } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { types } from "../../constants/general";
import { Grid, Typography, Input } from "@mui/material";
import showNotification from "../Snackbar/Snackbar";

interface IUploadForm {
  file: File | null;
  setFile: (file: File | null) => void;
  progress: number;
  url: string | null;
}

const UploadForm: React.FC<IUploadForm> = ({
  file,
  setFile,
  progress,
  url,
}) => {
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let selected = e.target.files;
    if (selected && types.includes(selected[0].type)) {
      setFile(selected[0]);
    } else {
      setFile(null);
      showNotification({
        type: "error",
        message: "Please sellect an image (png or jpg)",
      });
    }
  };

  return (
    <form>
      <label>
        <Grid container direction="row" height="100%">
          <Input
            type="file"
            onChange={changeHandler}
            style={{ height: 0, width: 0, opacity: 0 }}
          />
          <Typography
            variant="h5"
            style={{ cursor: "pointer" }}
            width="fit-content"
            alignSelf="center"
          >
            + Add
          </Typography>
        </Grid>
      </label>
      {file && <ProgressBar progress={progress} />}
    </form>
  );
};

export default UploadForm;
