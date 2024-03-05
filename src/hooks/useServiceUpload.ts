import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CollectionTypes } from "../types/types";
import showNotification from "../components/Snackbar/Snackbar";
import { resizeFile } from "../utils/resizeFile";
import { imageSize } from "../constants/general";

const serviceCollection = CollectionTypes.Services;

const useServiceUpload = (file: File | null) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [convertedFile, setConvertedFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }

    resizeFile(file, imageSize.mainImage.wide, imageSize.mainImage.height).then(
      (image) => setConvertedFile(image as File)
    );
    resizeFile(file, imageSize.thumbnail.wide, imageSize.thumbnail.height).then(
      (image) => setThumbnail(image as File)
    );
  }, [file]);

  useEffect(() => {
    if (!convertedFile || !thumbnail) {
      return;
    }
    const mainImageStorageRef = ref(
      projectStorage,
      `/${serviceCollection}/${convertedFile.name}`
    );
    const mainUploadTask = uploadBytesResumable(
      mainImageStorageRef,
      convertedFile
    );

    mainUploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percent);
      },
      (err) => {
        showNotification({
          type: "error",
          message: err.message,
        });
        setError(err.message);
      },
      () => {
        getDownloadURL(mainUploadTask.snapshot.ref).then((mainUrl) => {
          const timestamp = new Date().getTime();
          const fileName = convertedFile.name.split(".");
          const modifiedThumbnailName = `${fileName[0]}-thumbnail-${timestamp}.${fileName[1]}`;

          const thumbnailStorageRef = ref(
            projectStorage,
            `/${serviceCollection}/${modifiedThumbnailName}`
          );
          const thumbnailUploadTask = uploadBytesResumable(
            thumbnailStorageRef,
            thumbnail
          );

          thumbnailUploadTask.on(
            "state_changed",
            () => {},
            (err) => {
              setError(err.message);
              showNotification({
                type: "error",
                message: err.message,
              });
            },
            () => {
              getDownloadURL(thumbnailUploadTask.snapshot.ref).then(
                (thumbnailUrl) => {
                  setUrl(mainUrl);
                  setThumbnailUrl(thumbnailUrl);
                  showNotification({
                    type: "success",
                    message: "Photo and thumbnail uploaded successfully",
                  });
                  setConvertedFile(null);
                  setThumbnail(null);
                }
              );
            }
          );
        });
      }
    );
  }, [convertedFile, file, thumbnail]);

  const handleAddService = (serviceName: string) => {
    const collectionRef = collection(projectFirestore, serviceCollection);
    const createAt = serverTimestamp();
    const data = {
      name: serviceName,
      url: url,
      createAt: createAt,
      thumbnail: thumbnailUrl,
    };
    addDoc(collectionRef, data).then((docRef) => {
      setId(docRef.id);
      showNotification({
        type: "success",
        message: "Service successfully added!",
      });
    });
  };

  return { progress, error, url, handleAddService, id, thumbnailUrl };
};

export default useServiceUpload;
