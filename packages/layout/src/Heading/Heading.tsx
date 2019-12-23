import { chakra, forwardRef, PropsOf } from "@chakra-ui/system";
import * as React from "react";
import { SafeMerge } from "@chakra-ui/utils";

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

type HeadingProps = SafeMerge<PropsOf<typeof chakra.h2>, HeadingOptions>;

const Heading = forwardRef(
  ({ size = "xl", ...props }: HeadingProps, ref: React.Ref<any>) => {
    return (
      <chakra.h2
        ref={ref}
        as="h2"
        fontSize={sizes[size as Sizes]}
        lineHeight="shorter"
        fontWeight="bold"
        fontFamily="heading"
        {...props}
      />
    );
  },
);

export default Heading;
