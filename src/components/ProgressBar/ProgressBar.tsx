import React, { Dispatch, SetStateAction, useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
