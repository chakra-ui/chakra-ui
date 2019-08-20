/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import Box from "../Box";

export const useHasImageLoaded = ({ src, onLoad, onError }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    const img = new Image();
    img.src = src;

    if (isSubscribed) {
      img.onload = () => {
        setHasLoaded(true);
        onLoad && onLoad();
      };
      img.onerror = () => {
        setHasLoaded(false);
        onError && onError();
      };
    }

    return () => (isSubscribed = false);
  }, [src, onLoad, onError]);

  return hasLoaded;
};

const Img = ({ src, onLoad, onError, fallbackSrc, alt, ...props }) => {
  const hasLoaded = useHasImageLoaded({ src, onLoad, onError });
  return <Box as="img" src={hasLoaded ? src : fallbackSrc} {...props} />;
};

Img.propTypes = {
  src: propTypes.string,
  fallbackSrc: propTypes.string,
  alt: propTypes.string.isRequired,
  onLoad: propTypes.func,
  onError: propTypes.func,
};

export default Img;
