/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, isValidElement } from "react";
import Flex from "../Flex";
import Box from "../Box";

// TODO: Reduce complexity by deprecating isInline and isReversed prop
const Stack = ({
  direction,
  isInline = false,
  isReversed = false,
  children,
  align,
  justify,
  spacing = 2,
  shouldWrapChildren,
  ...rest
}) => {
  const _isReversed =
    isReversed || (direction && direction.endsWith("reverse"));
  const _isInline = isInline || (direction && direction.startsWith("row"));
  let _direction;

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

  const validChildrenArray = Children.toArray(children).filter(isValidElement);

  return (
    <Flex align={align} justify={justify} direction={_direction} {...rest}>
      {validChildrenArray.map((child, index) => {
        let isLastChild = validChildrenArray.length === index + 1;
        let spacingProps = _isInline
          ? { [_isReversed ? "ml" : "mr"]: isLastChild ? null : spacing }
          : { [_isReversed ? "mt" : "mb"]: isLastChild ? null : spacing };

        if (shouldWrapChildren) {
          return (
            <Box
              d="inline-block"
              {...spacingProps}
              key={`stack-box-wrapper-${index}`}
            >
              {child}
            </Box>
          );
        }
        return cloneElement(child, spacingProps);
      })}
    </Flex>
  );
};

export default Stack;
