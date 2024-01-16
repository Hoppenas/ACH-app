import { ref, getStorage, deleteObject } from "firebase/storage";
import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";
import showNotification from "../components/Snackbar/Snackbar";

export const deleteFileFromStorage = async (url: string) => {
  if (!url) {
    return;
  }

  const storage = getStorage();
  const storageRef = ref(storage, url);

  deleteObject(storageRef)
    .then(() => {
      showNotification({ type: "success", message: "Image deleted" });
    })
    .catch((error) => {
      showNotification({
        type: "error",
        message: error.message,
      });
    });
};

const deleteFile = async (file: DocumentData | null, collection: string) => {
  if (!file) {
    return;
  }

  deleteFileFromStorage(file.url);
  await deleteDoc(doc(projectFirestore, collection, file.id))
    .then(() =>
      showNotification({ type: "success", message: "Database deleted" })
    )
    .catch((error) => {
      showNotification({
        type: "error",
        message: error.message,
      });
    });
};

export default deleteFile;
