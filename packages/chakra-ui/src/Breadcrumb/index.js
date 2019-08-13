/** @jsx jsx */
import { jsx } from "@emotion/core";
import { node, oneOf, oneOfType, string } from "prop-types";
import { Children, cloneElement } from "react";
import Box from "../Box";

export const BreadcrumbItem = ({
  isLastChild,
  isActive,
  separator,
  separatorColor,
  children,
  ...rest
}) => {
  return (
    <Box as="li" display="inline-flex" alignItems="center" {...rest}>
      {isActive ? (
        <Box as="span" aria-current="page">
          {typeof children === "string" ? children : children.props.children}
        </Box>
      ) : (
        children
      )}
      {!isLastChild && (
        <Box
          role="presentation"
          as="span"
          verticalAlign="middle"
          textAlign="center"
          mx="0.5em"
          fontSize="1em"
          opacity="0.5"
          color={separatorColor}
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

const Breadcrumb = ({ children, separator, separatorColor, ...rest }) => {
  return (
    <Box as="nav" aria-label="Breadcrumb" {...rest}>
      <Box as="ol">
        {Children.map(children, (child, index) => {
          return cloneElement(child, {
            separator,
            separatorColor,
            isLastChild: index + 1 === Children.count(children),
          });
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
