import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { onSnapshot, collection } from "firebase/firestore";
import { CollectionTypes, IPhoto } from "../types/types";

const usePaintingPhoto = (paintingId: string | undefined) => {
  const [paintingPhoto, setPaintingPhoto] = useState<IPhoto[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(
        projectFirestore,
        `/${CollectionTypes.Paintings}/${paintingId}/gallery`
      ),
      (snap) => {
        const documents: IPhoto[] = [];
        snap.docs.forEach((doc) => {
          const painting = { ...doc.data() };
          documents.push({
            url: painting.url,
            createAt: painting.createAt,
            id: doc.id,
          });
        });
        setPaintingPhoto(documents);
      }
    );
    return () => unsub();
  }, [paintingId]);
  return { paintingPhoto };
};

export default usePaintingPhoto;
