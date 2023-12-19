import React, { useEffect, useState } from "react";
import "./uploadForm.css";
import useStorage from "../../hooks/useStorage";
import UploadForm from "./UploadForm";

interface IUploadFormContainer {
  collection: string;
}

const UploadFormContainer: React.FC<IUploadFormContainer> = ({
  collection,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const { url, progress } = useStorage(file, collection);

  //   useEffect(() => {
  //     if (url) {
  //       setFile(null);
  //     }
  //   }, [url, setFile]);

  return (
    <UploadForm file={file} setFile={setFile} progress={progress} url={url} />
  );
};

export default UploadFormContainer;
