/** @jsx jsx */
import { jsx } from "@emotion/core";
import { node, oneOf, oneOfType, string } from "prop-types";
import { Children, cloneElement } from "react";
import Box from "../Box";

export const BreadcrumbItem = ({ isCurrent, separator, children, ...rest }) => {
  const currentProps = {
    "aria-current": "page",
    isUnstyled: true,
    as: "span",
  };
  return (
    <Box as="li" display="inline-flex" alignItems="center" {...rest}>
      {cloneElement(children, isCurrent && currentProps)}
      {!isCurrent && (
        <Box
          aria-hidden
          as="span"
          verticalAlign="middle"
          textAlign="center"
          mx="0.5em"
          fontSize="1em"
          fontWeight="semibold"
          opacity="20%"
          children={separator}
        />
      )}
    </Box>
  );
};

BreadcrumbItem.defaultProps = {
  separator: "/",
};

BreadcrumbItem.propTypes = {
  separator: oneOfType([string, node]),
};

const Breadcrumb = ({ children, separator, ...rest }) => {
  return (
    <Box as="nav" aria-label="Breadcrumb" {...rest}>
      <Box as="ol">
        {Children.map(children, child => {
          return cloneElement(child, { separator });
        })}
      </Box>
    </Box>
  );
};

BreadcrumbItem.propTypes = {
  size: oneOf(["sm", "md", "lg"]),
  separator: oneOfType([string, node]),
};

export default Breadcrumb;
