/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import { Children, Fragment } from "react";
import Box from "../Box";
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
      data-stack=""
      {...rest}
    >
      {Children.map(children, (child, index) => {
        let isLastChild = children.length === index + 1;
        let spacingProps = isInline
          ? { mr: isLastChild ? null : spacing }
          : { mb: isLastChild ? null : spacing };
        return (
          <Fragment>
            <Box data-stack-item="" {...spacingProps}>
              {child}
            </Box>
          </Fragment>
        );
      })}
    </Flex>
  );
};

Stack.propTypes = {
  type: oneOf(["bullet", "number", "none"]),
};

export default Stack;
