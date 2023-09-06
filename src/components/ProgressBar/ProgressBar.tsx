import React, { Dispatch, SetStateAction, useEffect } from "react";
import useStorage from "../../hooks/useStorage";

export interface IProgressBar {
  file: File;
  setFile: Dispatch<SetStateAction<File | null>>;
}

const ProgressBar: React.FC<IProgressBar> = ({ file, setFile }) => {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
};

export default ProgressBar;
