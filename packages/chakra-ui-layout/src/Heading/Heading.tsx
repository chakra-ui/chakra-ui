/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Box, BoxProps } from "../Box";
import { forwardRef, Fragment } from "react";
import { Merge } from "@chakra-ui/utils";

const sizes = {
  "2xl": ["4xl", null, "5xl"],
  xl: ["3xl", null, "4xl"],
  lg: ["xl", null, "2xl"],
  md: "xl",
  sm: "md",
  xs: "sm",
};

type Sizes = keyof typeof sizes;

interface HeadingOptions {
  /**
   * The size of the Heading.
   */
  size?: Sizes;
}

export type HeadingProps = Merge<BoxProps, HeadingOptions>;

const Heading = forwardRef<HTMLElement, HeadingProps>(function Heading(
  { size = "xl", ...props },
  ref,
) {
  return (
    <Box
      ref={ref}
      as="h2"
      fontSize={sizes[size as Sizes]}
      lineHeight="shorter"
      fontWeight="bold"
      fontFamily="heading"
      {...props}
    />
  );
});

export default Heading;
