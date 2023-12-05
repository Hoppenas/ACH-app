import { ref, getStorage, deleteObject } from "firebase/storage";
import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const deleteFile = async (file: DocumentData | null, collection: string) => {
  if (!file) {
    console.log("Please choose a file first!");
    return;
  }
  const storage = getStorage();
  const storageRef = ref(storage, file.url);
  console.log(file);

  deleteObject(storageRef)
    .then(() => {
      console.log("deleted");
    })
    .catch((error) => {
      console.log(error);
    });

  await deleteDoc(doc(projectFirestore, collection, file.id))
    .then(() => console.log("database deleted"))
    .catch((error) => console.log(error));
};

export default deleteFile;
