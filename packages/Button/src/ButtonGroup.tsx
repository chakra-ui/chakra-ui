import { Box, BoxProps } from "@chakra-ui/layout";
import { SystemProps } from "@chakra-ui/system";
import { cleanChildren } from "@chakra-ui/utils";
import * as React from "react";
import { ButtonProps } from "./Button";

export interface ButtonGroupOptions
  extends Pick<ButtonProps, "variantSize" | "variant" | "variantColor"> {
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   */
  isAttached?: boolean;
  spacing?: SystemProps["marginRight"];
}

export type ButtonGroupProps = BoxProps & ButtonGroupOptions;

export const ButtonGroup = ({
  variantSize,
  variantColor,
  variant,
  isAttached,
  spacing = 2,
  children,
  ...rest
}: ButtonGroupProps) => {
  const validChildren = cleanChildren(children);

  const clones = validChildren.map((child, index) => {
    const isFirst = index === 0;
    const isLast = index === validChildren.length - 1;

    return React.cloneElement(child as React.ReactElement<ButtonProps>, {
      variantSize,
      variantColor: child.props.variantColor || variantColor,
      variant: child.props.variant || variant,
      _focus: { boxShadow: "outline", zIndex: 1 },
      ...(!isLast && !isAttached && { mr: spacing }),
      ...(isFirst && isAttached && { roundedRight: 0 }),
      ...(isLast && isAttached && { roundedLeft: 0 }),
      ...(!isLast && isAttached && { borderRight: 0 }),
      ...(!isFirst && !isLast && isAttached && { rounded: 0 }),
    });
  });

  return <Box display="inline-block" {...rest} children={clones} />;
};

export default ButtonGroup;
