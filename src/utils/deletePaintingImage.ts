import { ref, getStorage, deleteObject } from "firebase/storage";
import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";
import { CollectionTypes } from "../types/types";

const deletePaintingImage = async (
  file: DocumentData | null,
  paintingId: string | undefined
) => {
  if (!file) {
    console.log("Please choose a file first!");
    return;
  }
  if (paintingId) {
    const storage = getStorage();
    const storageRef = ref(storage, file.url);

    deleteObject(storageRef)
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => {
        console.log(error);
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
      .then(() => console.log("database deleted"))
      .catch((error) => console.log(error));
  }
};

export default deletePaintingImage;
