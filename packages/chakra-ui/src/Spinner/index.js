/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import { forwardRef } from "react";
import Box from "../Box";
import VisuallyHidden from "../VisuallyHidden";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const sizes = {
  xs: "0.75rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "3rem",
};

const Spinner = forwardRef(
  (
    {
      size = "md",
      label = "Loading...",
      thickness = "2px",
      speed = "0.45s",
      color,
      emptyColor = "transparent",
      ...props
    },
    ref,
  ) => {
    const _size = sizes[size] || size;

    return (
      <Box
        ref={ref}
        display="inline-block"
        borderWidth={thickness}
        borderColor="currentColor"
        borderBottomColor={emptyColor}
        borderLeftColor={emptyColor}
        rounded="full"
        color={color}
        animation={`${spin} ${speed} linear infinite`}
        size={_size}
        {...props}
      >
        {label && <VisuallyHidden>{label}</VisuallyHidden>}
      </Box>
    );
  },
);

export default Spinner;
