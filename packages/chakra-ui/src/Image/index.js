/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import Box from "../Box";

export const useHasImageLoaded = ({ src, onLoad, onError }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    const removeEventListeners = () => {
      image.removeEventListener("load", loadListener);
      image.removeEventListener("error", errorListener);
    };

    const loadListener = () => {
      removeEventListeners();
      setHasLoaded(true);
      onLoad && onLoad();
    };

    const errorListener = err => {
      removeEventListeners();
      setHasLoaded(false);
      onError && onError(err);
    };

    image.addEventListener("load", loadListener);
    image.addEventListener("error", errorListener);

    return () => {
      if (hasLoaded) {
        return;
      }
      image.src = "";
    };
  }, [hasLoaded, src, onLoad, onError]);

  return hasLoaded;
};

const Img = ({ src, onLoad, onError, fallbackSrc, ...props }) => {
  const hasLoaded = useHasImageLoaded({ src, onLoad, onError });
  return <Box as="img" src={hasLoaded ? src : fallbackSrc} {...props} />;
};

export default Img;
