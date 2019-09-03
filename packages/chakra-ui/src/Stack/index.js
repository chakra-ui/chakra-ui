/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement } from "react";
import Flex from "../Flex";
import Box from "../Box";

const Stack = ({
  isInline,
  children,
  align,
  justify,
  spacing = 2,
  shouldWrapChildren,
  ...rest
}) => {
  return (
    <Flex
      align={align}
      justify={justify}
      flexDir={isInline ? "row" : "column"}
      {...rest}
    >
      {Children.map(children, (child, index) => {
        let isLastChild = children.length === index + 1;
        let spacingProps = isInline
          ? { mr: isLastChild ? null : spacing }
          : { mb: isLastChild ? null : spacing };

        if (shouldWrapChildren) {
          return (
            <Box d="inline-block" {...spacingProps}>
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
