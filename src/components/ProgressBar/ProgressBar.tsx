import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import "./progressBar.css";

export interface IProgressBar {
  file: File;
  setFile: Dispatch<SetStateAction<File | null>>;
  collectionName: string;
  progress: number;
}

const ProgressBar: React.FC<IProgressBar> = ({ progress }) => {
  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
