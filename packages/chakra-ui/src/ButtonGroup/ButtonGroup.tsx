/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, isValidElement, forwardRef } from "react";
import { Box, BoxProps } from "../Box";
import { ButtonOptions, ButtonProps } from "../Button";
import * as StyledSystem from "styled-system";

interface ButtonGroupOptions {
  size?: ButtonOptions["size"];
  variant?: ButtonOptions["variant"];
  variantColor?: ButtonOptions["variantColor"];
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   */
  isAttached?: boolean;
  spacing?: StyledSystem.MarginRightProps["marginRight"];
  children?: React.ReactNode;
}

export type ButtonGroupProps<P, T> = BoxProps<P, T> & ButtonGroupOptions;

const ButtonGroup = forwardRef(function ButtonGroup<P, T extends HTMLElement>(
  {
    size,
    variantColor,
    variant,
    isAttached,
    spacing = 2,
    children,
    ...rest
  }: ButtonGroupProps<P, T>,
  ref: React.Ref<T>,
) {
  const clones = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return;

    const isFirst = index === 0;
    const isLast = index === Children.count(children) - 1;

    return cloneElement(
      child as React.ReactElement<ButtonProps<{}, HTMLButtonElement>>,
      {
        size: size || (child.props as ButtonProps<P, T>).size,
        variantColor:
          (child.props as ButtonProps<P, T>).variantColor || variantColor,
        variant: (child.props as ButtonProps<P, T>).variant || variant,
        _focus: { boxShadow: "outline", zIndex: 1 },

        ...(!isLast && !isAttached && { mr: spacing }),
        ...(isFirst && isAttached && { roundedRight: 0 }),
        ...(isLast && isAttached && { roundedLeft: 0 }),
        ...(!isFirst && !isLast && isAttached && { rounded: 0 }),
      },
    );
  });

  return (
    <Box ref={ref} display="inline-block" {...rest}>
      {clones}
    </Box>
  );
}) as <P, T>(
  props: ButtonGroupProps<P, T>,
) => React.ReactElement<ButtonGroupProps<P, T>>;

export default ButtonGroup;
