import Resizer from "react-image-file-resizer";

export const resizeFile = (file: File, maxWidth: number, maxHeight: number) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
