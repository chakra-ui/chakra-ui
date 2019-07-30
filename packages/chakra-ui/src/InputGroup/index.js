/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  Children,
  cloneElement,
  forwardRef,
  useState,
  useRef,
  useLayoutEffect
} from "react";
import Center from "../Center";
import Box from "../Box";
import { inputSizes } from "../Input/styles";
import { useTheme } from "../ThemeProvider";
import Input from "../Input";

export const InputInnerAddon = forwardRef(
  ({ size, placement = "left", ...props }, ref) => {
    const { height, fontSize } = inputSizes[size];
    const placementProp = { [placement]: "0" };
    return (
      <Center
        ref={ref}
        position="absolute"
        height={height}
        fontSize={fontSize}
        top="0"
        zIndex={1}
        {...placementProp}
        {...props}
      />
    );
  }
);

const useAddonWidth = () => {
  const [width, setWidth] = useState(null);
  const ref = useRef();

  useLayoutEffect(() => {
    if (ref.current) {
      const { clientWidth } = ref.current;
      setWidth(clientWidth);
    }
  }, []);

  return [ref, width];
};

const InputGroup = ({ children, size = "md", ...rest }) => {
  const { sizes } = useTheme();
  const { height } = inputSizes[size];
  const [ref, width] = useAddonWidth();

  return (
    <Box position="relative" {...rest}>
      {Children.map(children, child => {
        const {
          props: { placement, pr, pl },
          type
        } = child;

        if (type === Input) {
          return cloneElement(child, {
            size,
            pl: pl || sizes[height],
            pr: pr || `${width}px`
          });
        }

        if (type === InputInnerAddon) {
          return placement === "right"
            ? cloneElement(child, {
                size,
                ref
              })
            : cloneElement(child, {
                size,
                width: height
              });
        }

        return child;
      })}
    </Box>
  );
};

export default InputGroup;
