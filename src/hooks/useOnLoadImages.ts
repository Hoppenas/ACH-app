import { useState, useEffect, RefObject } from "react";

export const useOnLoadImages = (ref: RefObject<HTMLElement>) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const updateStatus = (images: HTMLImageElement[]) => {
      setStatus(
        images.map((image) => image.complete).every((item) => item === true)
      );
    };

    if (!ref?.current) return;

    const imagesLoaded = Array.from(ref.current.querySelectorAll("img"));

    console.log(imagesLoaded);

    imagesLoaded.forEach((image) => {
      image.addEventListener("load", () => updateStatus(imagesLoaded), {
        once: true,
      });
      image.addEventListener("error", () => updateStatus(imagesLoaded), {
        once: true,
      });
    });

    if (imagesLoaded.length === 0) {
      setStatus(true);
      return;
    }
    return;
  }, [ref]);

  return status;
};
