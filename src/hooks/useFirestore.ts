import { useState, useEffect, SetStateAction } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, orderBy, onSnapshot, query } from "firebase/firestore";

export interface IImages {
  url: string;
  createAt: string;
  id: string;
}

const useFirestore = (collectionName: string) => {
  const [docs, setDocs] = useState<[IImages] | []>([]);

  // projectFirestore.collection(collection2)
  collection(projectFirestore, collectionName);

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(projectFirestore, collectionName),
        orderBy("createAt", "desc")
      ),
      (snap) => {
        const documents: [IImages] | [] = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      }
    );
    return () => unsub();
  }, [collectionName]);

  return { docs };
};

export default useFirestore;
