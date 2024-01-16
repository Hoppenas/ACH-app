import { ref, getStorage, deleteObject } from "firebase/storage";
import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";
import { CollectionTypes } from "../types/types";
import showNotification from "../components/Snackbar/Snackbar";

const deletePaintingImage = async (
  file: DocumentData | null,
  paintingId: string | undefined
) => {
  if (!file) {
    showNotification({ type: "error", message: "Please choose a file first!" });
    return;
  }
  if (paintingId) {
    const storage = getStorage();
    const storageRef = ref(storage, file.url);

    deleteObject(storageRef)
      .then(() => {
        showNotification({ type: "success", message: "Painting deleted" });
      })
      .catch((error) => {
        showNotification({ type: "error", message: error.message });
      });

    await deleteDoc(
      doc(
        projectFirestore,
        CollectionTypes.Paintings,
        paintingId,
        "gallery",
        file.id
      )
    )
      .then(() =>
        showNotification({ type: "success", message: "Painting deleted" })
      )
      .catch((error) =>
        showNotification({ type: "error", message: error.message })
      );
  }
};

export default deletePaintingImage;
