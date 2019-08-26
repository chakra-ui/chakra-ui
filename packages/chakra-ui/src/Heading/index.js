/** @jsx jsx */
import { jsx } from "@emotion/core";
import Box from "../Box";
import { forwardRef } from "react";

const sizes = {
  "2xl": ["4xl", null, "5xl"],
  xl: ["3xl", null, "4xl"],
  lg: ["xl", null, "2xl"],
  md: "xl",
  sm: "md",
  xs: "sm",
};

const Heading = forwardRef(({ size = "md", ...props }, ref) => (
  <Box
    ref={ref}
    as="h2"
    fontSize={sizes[size]}
    lineHeight="short"
    fontWeight="bold"
    {...props}
  />
));

export default Heading;
