import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CollectionTypes } from "../types/types";

const collectionName = CollectionTypes.Paintings;

const usePaintingPhotoUpload = (file: File | null, paintingId: string) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setError("Please choose a file first!");
      return;
    }
    const storageRef = ref(projectStorage, `/${collectionName}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const collectionRef = collection(
      projectFirestore,
      CollectionTypes.Paintings,
      paintingId,
      "gallery"
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
          const data = {
            url: url,
            createAt: createAt,
            id,
          };
          addDoc(collectionRef, data).then((docRef) => setId(docRef.id));
          setUrl(url);
        });
      }
    );
  }, [file, id, paintingId]);

  return { progress, error, url, id };
};

export default usePaintingPhotoUpload;
