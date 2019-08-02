/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import Box from "../Box";
import Icon from "../Icon";
import { forwardRef } from "react";
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
  xs: "12px",
  sm: "16px",
  md: "24px",
  lg: "32px",
  xl: "48px"
};

const Spinner = forwardRef(
  (
    {
      size = "md",
      loadingText = "Loading...",
      thickness = "2px",
      speed = "0.45s",
      ...props
    },
    ref
  ) => {
    const _size = sizes[size] || size;

    return (
      <Box
        ref={ref}
        display="inline-block"
        border={`${thickness} solid`}
        borderColor="currentColor"
        borderBottomColor="transparent"
        borderLeftColor="transparent"
        rounded="full"
        animation={`${spin} ${speed} linear infinite`}
        size={_size}
        {...props}
      >
        {loadingText && <VisuallyHidden>{loadingText}</VisuallyHidden>}
      </Box>
    );
  }
);

const spinCSS = speed => css`
  animation: ${spin} ${speed || "1s"} linear infinite;
`;

export default Spinner;

/* Alt Spinner, just a lil more fancy :) */
export const Spinner2 = ({
  color = "rgba(164, 164, 164, 1)",
  size = "24px",
  speed
}) => (
  <Box display="inline-block">
    <Icon color={color} name="spinner" size={size} css={spinCSS(speed)} />
  </Box>
);
