/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, isValidElement } from "react";
import Flex from "../Flex";
import Box from "../Box";
import css from "../Css";

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
  direction = direction || (isInline ? "row" : "column");
  isInline |= direction.startsWith("row");
  isReversed |= direction.endsWith("reverse");

  let spacingProp = isInline
    ? { [isReversed ? "mr" : "ml"]: spacing }
    : { [isReversed ? "mb" : "mt"]: spacing };

  return (
    <Flex
      css={css({
        ">*+*": spacingProp,
      })}
      align={align}
      justify={justify}
      direction={direction}
      {...rest}
    >
      {shouldWrapChildren
        ? Children.map(children, (child, index) => {
            if (!isValidElement(child)) return;
            return <Box d="inline-block">{child}</Box>;
          })
        : children}
    </Flex>
  );
};

export default Stack;
