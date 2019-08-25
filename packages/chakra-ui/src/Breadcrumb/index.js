/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement } from "react";
import Box from "../Box";

const BreadcrumbSeparator = props => (
  <Box
    data-breadcrumb-separator=""
    role="presentation"
    as="span"
    mx={2}
    {...props}
  />
);

export const BreadcrumbItem = ({
  isLastChild,
  isCurrentPage,
  separator = "/",
  separatorColor,
  children,
  ...rest
}) => {
  return (
    <Box
      data-breadcrumb-item=""
      display="inline-flex"
      alignItems="center"
      {...rest}
    >
      {isCurrentPage ? (
        <Box as="span" aria-current="page">
          {typeof children === "string" ? children : children.props.children}
        </Box>
      ) : (
        children
      )}
      {!isLastChild && (
        <BreadcrumbSeparator color={separatorColor} children={separator} />
      )}
    </Box>
  );
};

const Breadcrumb = ({ children, separator, separatorColor, ...rest }) => {
  const clones = Children.map(children, (child, index) => {
    return cloneElement(child, {
      separator,
      separatorColor,
      isLastChild: index + 1 === Children.count(children),
    });
  });

  return (
    <Box data-breadcrumb="" as="nav" aria-label="breadcrumb" {...rest}>
      {clones}
    </Box>
  );
};

export default Breadcrumb;
