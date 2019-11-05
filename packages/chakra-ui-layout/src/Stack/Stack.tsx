/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { FlexProps, Flex } from "../Flex";
import { Box, SystemProps } from "../Box";

interface StackOptions {
  /**
   * The space between each stack item
   */
  spacing?: SystemProps["margin"];
  /**
   * If `true` the items will be stacked horizontally inline.
   */
  isInline?: boolean;
  /**
   * The content of the stack.
   */
  children: React.ReactNode;
  /**
   * If `true`, the children will be wrapped in a `Box` with
   * `display: inline-block`, and the `Box` will take the spacing props
   */
  shouldWrapChildren?: boolean;
}

type StackProps<P, T> = FlexProps<P, T> & StackOptions;

const Stack = React.forwardRef(function Stack<P, T extends HTMLElement>(
  {
    isInline,
    align,
    justify,
    spacing,
    children,
    shouldWrapChildren,
    ...props
  }: StackProps<P, T>,
  ref: React.Ref<T>,
) {
  const validChildren = React.Children.toArray(children).filter(
    React.isValidElement,
  );
  return (
    <Flex
      ref={ref}
      align={align}
      justify={justify}
      flexDir={isInline ? "row" : "column"}
      {...props}
    >
      {React.Children.map(validChildren, (child, index) => {
        let isLastChild = React.Children.count(children) === index + 1;

        let spacingProps: any = isInline
          ? { mr: isLastChild ? null : spacing }
          : { mb: isLastChild ? null : spacing };

        if (shouldWrapChildren) {
          return (
            <Box display="inline-block" {...spacingProps}>
              {child}
            </Box>
          );
        }
        return React.cloneElement(child, spacingProps);
      })}
    </Flex>
  );
}) as <P = {}, T = HTMLElement>(
  props: StackProps<P, T>,
) => React.ReactElement<StackProps<P, T>>;

export default Stack;
