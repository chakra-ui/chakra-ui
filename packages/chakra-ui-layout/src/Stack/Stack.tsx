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
   * If `true` the items will be displayed in reverse order.
   */
  isReversed?: boolean;
  /**
   * The direction to stack the items.
   */
  direction?: React.CSSProperties["flexDirection"];
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
    direction,
    isInline = false,
    isReversed = false,
    align,
    justify,
    spacing = 2,
    children,
    shouldWrapChildren,
    ...props
  }: StackProps<P, T>,
  ref: React.Ref<T>,
) {
  const _isReversed =
    isReversed || (direction && direction.endsWith("reverse"));
  const _isInline = isInline || (direction && direction.startsWith("row"));
  let _direction: any;

  if (_isInline) {
    _direction = "row";
  }

  if (_isReversed) {
    _direction = isInline ? "row-reverse" : "column-reverse";
  }

  if (direction) {
    _direction = direction;
  }

  if (!_isInline && !_isReversed && !direction) {
    _direction = "column";
  }

  const validChildren = React.Children.toArray(children).filter(
    React.isValidElement,
  );

  return (
    <Flex
      ref={ref}
      align={align}
      justify={justify}
      direction={_direction}
      {...props}
    >
      {React.Children.map(validChildren, (child, index) => {
        let isLastChild = React.Children.count(children) === index + 1;

        let spacingProps = _isInline
          ? { [_isReversed ? "ml" : "mr"]: isLastChild ? null : spacing }
          : { [_isReversed ? "mt" : "mb"]: isLastChild ? null : spacing };

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
