import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  DocumentData,
  documentId,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { CollectionTypes } from "../types/types";

export interface IImages {
  id: string;
  url: string;
  createAt: { seconds: number; nanoseconds: number };
}

const usePainting = (collectionName: string, id: string | undefined) => {
  const [painting, setPainting] = useState<DocumentData>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      // query(
      //   collection(
      //     projectFirestore,
      //     //   CollectionTypes.Paintings + "/" + "XNLLibk6pBH2r4cLrjbr"
      //     collectionName
      //   )
      //   // where("price", "==", 300)
      //   // orderBy("createAt", "desc")
      // ),
      doc(projectFirestore, `${collectionName}/XNLLibk6pBH2r4cLrjbr`),
      (snap) => {
        const documents: DocumentData = [];
        console.log(snap);
        // snap.docs.forEach((doc: DocumentData) => {
        //   documents.push({
        //     ...doc.data(),
        //     id: doc.id,
        //   });
        // });
        setPainting(documents);
      }
    );
    return () => unsub();
  }, [collectionName, id]);
  console.log(painting);
  return { painting };
};

export default usePainting;
