import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import showNotification from "../components/Snackbar/Snackbar";

const useStorage = (file: File | null, collectionName: string) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      showNotification({
        type: "error",
        message: "Please choose a file first!",
      });
      setError("Please choose a file first!");
      return;
    }
    const storageRef = ref(projectStorage, `/${collectionName}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
        });
      }
    );
  }, [file, collectionName]);
  return { progress, error, url };
};

export default useStorage;
