/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState, forwardRef, useRef } from "react";
import Box from "../Box";

export function useHasImageLoaded(props) {
  const { src, onLoad, onError, crossOrigin, enabled = true } = props;
  const isMounted = useRef(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!src || !enabled) {
      return;
    }

    const image = new window.Image();

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }

    image.src = src;

    image.onload = event => {
      if (isMounted.current) {
        setHasLoaded(true);
        onLoad && onLoad(event);
      }
    };

    image.onerror = event => {
      if (isMounted.current) {
        setHasLoaded(false);
        onError && onError(event);
      }
    };
  }, [src, onLoad, onError, crossOrigin, enabled]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return hasLoaded;
}

const NativeImage = forwardRef(
  ({ htmlWidth, htmlHeight, alt, ...props }, ref) => (
    <img width={htmlWidth} height={htmlHeight} ref={ref} alt={alt} {...props} />
  ),
);

const Image = forwardRef((props, ref) => {
  const {
    src,
    fallbackSrc,
    onError,
    onLoad,
    ignoreFallback,
    crossOrigin,
    ...rest
  } = props;

  const hasLoaded = useHasImageLoaded({
    src,
    onLoad,
    onError,
    crossOrigin,
    enabled: !Boolean(ignoreFallback),
  });

  const imageProps = ignoreFallback
    ? { src, onLoad, onError }
    : { src: hasLoaded ? src : fallbackSrc };

  return (
    <Box
      as={NativeImage}
      ref={ref}
      crossOrigin={crossOrigin}
      {...imageProps}
      {...rest}
    />
  );
});

Image.displayName = "Image";

export default Image;
