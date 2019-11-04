/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Box, BoxProps } from "@chakra-ui/layout";
import { forwardRef, Fragment } from "react";

interface HeadingOptions {
  /**
   * The size of the Heading.
   */
  size?: "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
}

export type HeadingProps<P, T> = HeadingOptions & BoxProps<P, T>;

const sizes = {
  "2xl": ["4xl", null, "5xl"],
  xl: ["3xl", null, "4xl"],
  lg: ["xl", null, "2xl"],
  md: "xl",
  sm: "md",
  xs: "sm",
};

type Sizes = keyof typeof sizes;

const Heading = forwardRef(function Heading<P, T extends HTMLHeadingElement>(
  { size = "xl", ...props }: HeadingProps<P, T>,
  ref: React.Ref<T>,
) {
  return (
    <Box
      ref={ref}
      as="h2"
      fontSize={sizes[size as Sizes]}
      lineHeight="shorter"
      fontWeight="bold"
      {...props}
    />
  );
}) as <P = {}, T = HTMLHeadingElement>(
  props: HeadingProps<P, T>,
) => React.ReactElement<HeadingProps<P, T>>;

export function HeadingExample() {
  return (
    <Fragment>
      {["2xl", "xl", "lg", "md", "sm", "xs"].map((size, index) => (
        <Heading size={size as Sizes}>Heading {index + 1}</Heading>
      ))}
    </Fragment>
  );
}

export default Heading;
