/** @jsx jsx */
import { jsx } from "@emotion/core";
import { cloneElement, forwardRef } from "react";
import Box from "../Box";
import { cleanChildren } from "../utils";

const ButtonGroup = forwardRef((props, ref) => {
  const {
    size,
    variantColor,
    variant,
    isAttached,
    spacing = 2,
    children,
    ...rest
  } = props;

  const validChildren = cleanChildren(children);
  const clones = validChildren.map((child, index) => {
    const isFirst = index === 0;
    const isLast = index === validChildren.length - 1;

    return cloneElement(child, {
      size: size || child.props.size,
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

  return (
    <Box ref={ref} display="inline-block" {...rest}>
      {clones}
    </Box>
  );
});

export default ButtonGroup;
