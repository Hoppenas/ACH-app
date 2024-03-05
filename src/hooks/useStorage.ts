import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import showNotification from "../components/Snackbar/Snackbar";
import { resizeFile } from "../utils/resizeFile";
import { imageSize } from "../constants/general";

const useStorage = (file: File | null, collectionName: string) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
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
  }, [file, collectionName]);

  useEffect(() => {
    if (!convertedFile || !thumbnail) {
      return;
    }

    const mainImageStorageRef = ref(
      projectStorage,
      `/${collectionName}/${convertedFile.name}`
    );
    const mainUploadTask = uploadBytesResumable(
      mainImageStorageRef,
      convertedFile
    );

    const collectionRef = collection(projectFirestore, collectionName);

    mainUploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percent);
      },
      (err) => {
        setError(err.message);
        showNotification({
          type: "error",
          message: err.message,
        });
      },
      () => {
        getDownloadURL(mainUploadTask.snapshot.ref).then((mainUrl) => {
          const timestamp = new Date().getTime();
          const fileName = convertedFile.name.split(".");
          const modifiedThumbnailName = `${fileName[0]}-thumbnail-${timestamp}.${fileName[1]}`;

          const thumbnailStorageRef = ref(
            projectStorage,
            `/${collectionName}/${modifiedThumbnailName}`
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
                  const createAt = serverTimestamp();
                  addDoc(collectionRef, {
                    url: mainUrl,
                    createAt,
                    images: [],
                    thumbnail: thumbnailUrl,
                  });
                  setUrl(mainUrl);
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
  }, [convertedFile, thumbnail, collectionName]);
  return { progress, error, url };
};

export default useStorage;
