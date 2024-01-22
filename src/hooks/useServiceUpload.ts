import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CollectionTypes } from "../types/types";
import showNotification from "../components/Snackbar/Snackbar";

const serviceCollection = CollectionTypes.Services;

const useServiceUpload = (file: File | null) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const storageRef = ref(
      projectStorage,
      `/${serviceCollection}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
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
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
        });
      }
    );
  }, [file]);

  const handleAddService = (serviceName: string) => {
    const collectionRef = collection(projectFirestore, serviceCollection);
    const createAt = serverTimestamp();
    const data = {
      name: serviceName,
      url: url,
      createAt: createAt,
    };
    addDoc(collectionRef, data).then((docRef) => {
      setId(docRef.id);
      showNotification({
        type: "success",
        message: "Service successfully added!",
      });
    });
  };

  return { progress, error, url, handleAddService, id };
};

export default useServiceUpload;
