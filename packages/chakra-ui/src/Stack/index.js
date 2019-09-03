/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import { Children, cloneElement } from "react";
import Flex from "../Flex";

const Stack = ({
  isInline,
  children,
  align,
  justify,
  spacing = 2,
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
        return cloneElement(child, spacingProps);
      })}
    </Flex>
  );
};

export default Stack;
