import { BoxProps } from "../Box";
import * as React from "react";
import * as StyledSystem from "styled-system";
import { FlexProps } from "../Flex";

interface IStack {
  /**
   * If `true` the items will be stacked horizontally inline.
   */
  isInline?: boolean;
  /**
   * The content of the stack.
   */
  children?: React.ReactNode;
  /**
   * The space between each stack item
   */
  spacing?: StyledSystem.MarginProps["margin"];
  /**
   * The alignment of the stack item. Similar to `align-items`
   */
  align?: FlexProps["align"];
  /**
   * The distribution of the stack item. Similar to `justify-content`
   */
  justify?: FlexProps["justify"];
  /**
   * If `true`, the children will be wrapped in a `Box` with
   * `display: inline-block`, and the `Box` will take the spacing props
   */
  shouldWrapChildren?: boolean;
}

export type StackProps = IStack & BoxProps;

declare const Stack: React.FC<StackProps>;

export default Stack;
