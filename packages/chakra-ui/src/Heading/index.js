/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import Box from "../Box";

const sizes = {
  "2xl": "5xl",
  xl: "4xl",
  lg: "2xl",
  md: "xl",
  sm: "md",
  xs: "sm"
};

const Heading = ({ size, ...props }) => (
  <Box fontSize={sizes[size]} {...props} />
);

Heading.propTypes = {
  size: propTypes.oneOf(["2xl", "xl", "lg", "md", "sm", "xs"])
};

export default Heading;
