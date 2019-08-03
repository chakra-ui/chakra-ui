/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { Children, cloneElement } from "react";
import Box from "../Box";

const ButtonGroup = ({
  size = "md",
  color = "gray",
  variant = "solid",
  isAttached,
  spacing = 2,
  children,
  ...rest
}) => {
  const clones = Children.map(children, (child, index) => {
    const isFirst = index === 0;
    const isLast = index === Children.count(children) - 1;

    return cloneElement(child, {
      size: size || child.props.size,
      color: child.props.color || color,
      variant: child.props.variant || variant,
      _focus: { boxShadow: "outline", zIndex: 1 },

      ...(!isLast && !isAttached && { mr: spacing }),
      ...(isFirst && isAttached && { roundedRight: 0 }),
      ...(isLast && isAttached && { roundedLeft: 0 }),
      ...(!isFirst && !isLast && isAttached && { rounded: 0 }),
    });
  });

  return (
    <Box display="inline-block" {...rest}>
      {clones}
    </Box>
  );
};

ButtonGroup.propTypes = {
  size: propTypes.oneOf(["sm", "md", "lg"]),
  color: propTypes.string,
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   * */
  isAttached: propTypes.bool,
  spacing: propTypes.oneOfType([propTypes.string, propTypes.number]),
  children: propTypes.node.isRequired,
};

export default ButtonGroup;
