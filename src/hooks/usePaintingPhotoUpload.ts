import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CollectionTypes } from "../types/types";
import showNotification from "../components/Snackbar/Snackbar";

const collectionName = CollectionTypes.Paintings;

const usePaintingPhotoUpload = (
  file: File | null,
  paintingId: string | undefined
) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      showNotification({
        type: "error",
        message: "Please choose a file first!",
      });
      setError("Please choose a file first!");
      return;
    }
    const storageRef = ref(
      projectStorage,
      `/${collectionName}/${paintingId}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    if (paintingId) {
      const collectionRef = collection(
        projectFirestore,
        collectionName,
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
        (err) => {
          setError(err.message);
          showNotification({ type: "error", message: err.message });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const createAt = serverTimestamp();
            const data = {
              url: url,
              createAt: createAt,
            };
            addDoc(collectionRef, data).then((docRef) => {
              setId(docRef.id);
              showNotification({
                type: "success",
                message: "Painting photo uploaded!",
              });
            });
            setUrl(url);
          });
        }
      );
    }
  }, [file, id, paintingId]);

  return { progress, error, url, id };
};

export default usePaintingPhotoUpload;
