import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  DocumentData,
} from "firebase/firestore";

export interface IImages {
  id: string;
  url: string;
  createAt: { seconds: number; nanoseconds: number };
}

const useFirestore = (collectionName: string) => {
  const [docs, setDocs] = useState<DocumentData>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(projectFirestore, collectionName),
        orderBy("createAt", "desc")
      ),
      (snap) => {
        const documents: DocumentData = [];
        snap.docs.forEach((doc: DocumentData) => {
          documents.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setDocs(documents);
      }
    );
    return () => unsub();
  }, [collectionName]);

  return { docs };
};

export default useFirestore;
