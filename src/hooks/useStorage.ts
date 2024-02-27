import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import showNotification from "../components/Snackbar/Snackbar";
import Resizer from "react-image-file-resizer";

const useStorage = (file: File | null, collectionName: string) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [convertedFile, setConvertedFile] = useState<File | null>(null);

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200,
        1200,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  useEffect(() => {
    if (!file) {
      return;
    }

    resizeFile(file).then((image) => setConvertedFile(image as File));
  }, [file, collectionName]);

  useEffect(() => {
    if (!convertedFile) {
      return;
    }

    const storageRef = ref(
      projectStorage,
      `/${collectionName}/${convertedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, convertedFile);

    const collectionRef = collection(projectFirestore, collectionName);

    uploadTask.on(
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
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const createAt = serverTimestamp();
          addDoc(collectionRef, { url, createAt, images: [] });
          setUrl(url);
          showNotification({
            type: "success",
            message: "Photo uploaded successfully",
          });
          setConvertedFile(null);
        });
      }
    );
  }, [convertedFile, collectionName]);
  return { progress, error, url };
};

export default useStorage;
