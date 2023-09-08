import React from "react";
import useFirestore from "../../hooks/useFirestore";

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
            <div
              className="img-wrap"
              key={doc.id}
              onClick={() => setSelectedImg(doc.url || "")}
            >
              <img src={doc.url} alt="pic" />
            </div>
          )
        )}
    </div>
  );
};

export default ImageGrid;
