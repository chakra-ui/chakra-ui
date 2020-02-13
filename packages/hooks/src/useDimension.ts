import * as React from "react";
import { getBox, BoxModel } from "@chakra-ui/utils";
import useIsomorphicEffect from "./useIsomorphicEffect";

export function useDimensions(
  ref: React.RefObject<HTMLElement>,
  observe?: boolean,
) {
  const [dimensions, setDimensions] = React.useState<BoxModel | null>(null);

  useIsomorphicEffect(() => {
    if (!ref.current) return;

    const node = ref.current;

    function measure() {
      requestAnimationFrame(() => {
        const boxModel = getBox(node);
        setDimensions(boxModel);
      });
    }

    measure();

    if (observe) {
      window.addEventListener("resize", measure);
      window.addEventListener("scroll", measure);

      return () => {
        window.removeEventListener("resize", measure);
        window.removeEventListener("scroll", measure);
      };
    }
  }, [ref, observe]);

  return dimensions;
}

export default useDimensions;
