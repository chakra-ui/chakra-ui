import * as React from "react";
import { getBox, BoxModel } from "@chakra-ui/utils";

export function useDimensions(
  ref: React.RefObject<HTMLElement>,
  observe?: boolean,
) {
  const [dimensions, setDimensions] = React.useState<BoxModel | null>(null);

  React.useLayoutEffect(() => {
    if (!ref.current) return;

    const node = ref.current;

    const measure = () =>
      requestAnimationFrame(() => setDimensions(getBox(node)));
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
