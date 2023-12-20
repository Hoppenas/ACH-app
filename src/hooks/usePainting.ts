import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  DocumentData,
} from "firebase/firestore";
import { CollectionTypes } from "../types/types";

export interface IImages {
  id: string;
  url: string;
  createAt: { seconds: number; nanoseconds: number };
}

const usePainting = (collectionName: string) => {
  const [painting, setPainting] = useState<DocumentData>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(
          projectFirestore,
          //   CollectionTypes.Paintings + "/" + "XNLLibk6pBH2r4cLrjbr"
          CollectionTypes.Paintings
        ),
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
        setPainting(documents);
      }
    );
    return () => unsub();
  }, [collectionName]);

  return { painting };
};

export default usePainting;
