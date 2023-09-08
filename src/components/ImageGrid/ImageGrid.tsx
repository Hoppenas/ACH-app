import React from "react";
import useFirestore from "../../hooks/useFirestore";
import { motion } from "framer-motion";

export interface IImageGrid {
  setSelectedImg: (url: string) => void;
}

const ImageGrid: React.FC<IImageGrid> = ({ setSelectedImg }) => {
  const { docs } = useFirestore("images");
  return (
    <div className="img-grid">
      {docs &&
        docs.map(
          (doc: {
            id: React.Key | null | undefined;
            url: string | undefined;
          }) => (
            <motion.div
              className="img-wrap"
              key={doc.id}
              layout
              whileHover={{ opacity: 1 }}
              onClick={() => setSelectedImg(doc.url || "")}
            >
              <motion.img
                src={doc.url}
                alt="pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          )
        )}
    </div>
  );
};

export default ImageGrid;
