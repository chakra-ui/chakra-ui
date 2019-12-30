/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState, forwardRef, useRef } from "react";
import Box from "../Box";

export const useHasImageLoaded = ({ src, onLoad, onError }) => {
  const isMounted = useRef(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const image = new window.Image();
    image.src = src;

    image.onload = event => {
      if (isMounted.current) {
        setHasLoaded(true);
        onLoad && onLoad(event);
      }
    };

    image.onError = event => {
      if (isMounted.current) {
        setHasLoaded(false);
        onError && onError(event);
      }
    };
  }, [src, onLoad, onError]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return hasLoaded;
};

const NativeImage = forwardRef(
  ({ htmlWidth, htmlHeight, alt, ...props }, ref) => (
    <img width={htmlWidth} height={htmlHeight} ref={ref} alt={alt} {...props} />
  ),
);

const Image = forwardRef(
  ({ src, fallbackSrc, onError, onLoad, ignoreFallback, ...props }, ref) => {
    const hasLoaded = useHasImageLoaded({ src, onLoad, onError });
    let imageProps;
    if (ignoreFallback) {
      imageProps = { src, onLoad, onError };
    } else {
      imageProps = { src: hasLoaded ? src : fallbackSrc };
    }
    return <Box as={NativeImage} ref={ref} {...imageProps} {...props} />;
  },
);

Image.displayName = "Image";

export default Image;
