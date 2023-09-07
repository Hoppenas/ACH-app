import React, { useState } from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";

const types = ["image/png", "image/jpeg"];

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      <input type="file" onChange={changeHandler} />
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div className="">{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
