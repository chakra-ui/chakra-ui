import { BoxProps } from "../Box";
import { FC } from "react";

interface IHeading {
  /**
   * The size of the Heading.
   */
  size?: "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
}

export type HeadingProps = IHeading & BoxProps;

declare const Heading: FC<HeadingProps>;

export default Heading;
