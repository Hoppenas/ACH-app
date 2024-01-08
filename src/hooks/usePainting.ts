import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { onSnapshot, DocumentData, doc } from "firebase/firestore";

const usePainting = (collectionName: string, id: string | undefined) => {
  const [painting, setPainting] = useState<DocumentData>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(projectFirestore, `/${collectionName}/${id}`),
      (doc) => {
        const documents = doc.data();
        if (documents) {
          setPainting(documents);
        }
      }
    );
    return () => unsub();
  }, [collectionName, id]);
  return { painting };
};

export default usePainting;
