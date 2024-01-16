import React, { ChangeEvent, useEffect, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./uploadForm.css";
import { types } from "../../constants/general";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let selected = e.target.files;
    if (selected && types.includes(selected[0].type)) {
      setFile(selected[0]);
      setError(null);
    } else {
      setFile(null);
      setError("Please sellect an image (png or jpg)");
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar progress={progress} />}
      </div>
    </form>
  );
};

export default UploadForm;
