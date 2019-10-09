/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import Box from "../Box";

export const useHasImageLoaded = ({ src, onLoad, onError }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const image = new window.Image();
    image.src = src;

    image.onload = event => {
      setHasLoaded(true);
      onLoad && onLoad(event);
    };

    image.onError = event => {
      setHasLoaded(false);
      onError && onError(event);
    };
  }, [src, onLoad, onError]);

  return hasLoaded;
};

const Image = ({ src, fallbackSrc, onError, onLoad, ...props }) => {
  const hasLoaded = useHasImageLoaded({ src, onLoad, onError });
  return <Box as="img" src={hasLoaded ? src : fallbackSrc} {...props} />;
};

export default Image;
