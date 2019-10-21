import { useState, useEffect } from "react";

export interface Options {
  src: string;
  onLoad?: (e: Event) => void;
  onError?: (e: string | Event) => void;
}

const cache: string[] = [];

function useHasImageLoaded({ src, onLoad, onError }: Options) {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (cache.includes(src)) {
      setHasLoaded(true);
    } else {
      if (!hasLoaded) {
        const image: HTMLImageElement = new window.Image();
        image.src = src;
        image.onload = event => {
          cache.push(src);
          setHasLoaded(true);
          onLoad && onLoad(event);
        };
        image.onerror = event => {
          setHasLoaded(false);
          onError && onError(event);
        };
      }
    }
  }, [src, onLoad, onError, hasLoaded]);

  return hasLoaded;
}

export default useHasImageLoaded;
