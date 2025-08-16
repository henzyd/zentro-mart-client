import { useState, useEffect } from "react";
import { StaticImageData } from "next/image";

export const useImageFallback = (
  src: StaticImageData | string,
  fallback: StaticImageData | string,
) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setError(false);
  }, [src]);

  const handleError = () => {
    if (!error) {
      setError(true);
      setImgSrc(fallback);
    }
  };

  return { src: imgSrc, onError: handleError, hasError: error };
};
