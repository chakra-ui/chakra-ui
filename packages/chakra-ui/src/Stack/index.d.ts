import { BoxProps } from "../Box";
import * as React from "react";
import { FlexProps } from "../Flex";

interface IStack {
  /**
   * If `true` the stack will be displayed inline.
   */
  isInline?: boolean;
  /**
   * The content of the stack.
   */
  children?: React.ReactNode;
  /**
   * The space between each stack item
   */
  spacing?: string | number;
  /**
   * The alignment of the stack item
   */
  align?: FlexProps["align"];
  /**
   * The distribution of the stack item
   */
  justify?: FlexProps["justify"];
}

export type StackProps = IStack & BoxProps;

declare const Stack: React.FC<StackProps>;

export default Stack;
