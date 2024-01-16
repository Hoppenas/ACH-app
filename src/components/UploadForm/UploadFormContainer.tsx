import React, { useState } from "react";
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
  return (
    <UploadForm file={file} setFile={setFile} progress={progress} url={url} />
  );
};

export default UploadFormContainer;
