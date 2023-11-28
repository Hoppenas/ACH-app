import React, { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./uploadForm.css";
import useStorage from "../../hooks/useStorage";

const types = ["image/png", "image/jpeg"];

interface IUploadForm {
  collection: string;
}

const UploadForm: React.FC<IUploadForm> = ({ collection }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { url, progress } = useStorage(file, collection);

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

  return (
    <form>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div className="">{file.name}</div>}
        {file && (
          <ProgressBar
            file={file}
            setFile={setFile}
            collectionName={collection}
            progress={progress}
          />
        )}
      </div>
    </form>
  );
};

export default UploadForm;
