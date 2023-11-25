import React, { Dispatch, SetStateAction, useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import { motion } from "framer-motion";
import "./progressBar.css";

export interface IProgressBar {
  file: File;
  setFile: Dispatch<SetStateAction<File | null>>;
  collectionName: string;
}

const ProgressBar: React.FC<IProgressBar> = ({
  file,
  setFile,
  collectionName,
}) => {
  const { url, progress } = useStorage(file, collectionName);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
