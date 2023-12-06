import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { CollectionTypes, IPaintingData } from "../types/types";
import { create } from "domain";

const usePaintingUpload = (file: File | null, paintingData: IPaintingData) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setError("Please choose a file first!");
      return;
    }
    const storageRef = ref(
      projectStorage,
      `/${CollectionTypes.Paintings}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    const collectionRef = collection(
      projectFirestore,
      CollectionTypes.Paintings
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percent);
      },
      (err) => setError(err.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const createAt = serverTimestamp();
          const data = { ...paintingData, urls: [url], createAt: createAt };
          addDoc(collectionRef, data);
          setUrl(url);
        });
      }
    );
  }, [file, paintingData]);
  return { progress, error, url };
};

export default usePaintingUpload;
