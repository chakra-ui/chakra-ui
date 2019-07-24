/** @jsx jsx */
import { jsx } from "@emotion/core";
import { node, oneOf, oneOfType, string } from "prop-types";
import { Children, cloneElement } from "react";
import Box from "../Box";

export const BreadcrumbItem = ({
  isCurrent,
  separator,
  as,
  children,
  ...rest
}) => {
  return (
    <Box
      as="li"
      aria-current={isCurrent ? "page" : undefined}
      display="inline-flex"
      alignItems="center"
      {...rest}
    >
      {cloneElement(
        Children.only(children),
        isCurrent && { "aria-current": "page" }
      )}
      {!isCurrent && (
        <Box
          aria-hidden
          as="span"
          verticalAlign="middle"
          textAlign="center"
          mx="0.5em"
          fontSize="1em"
          fontWeight="semibold"
          color="gray.200"
          children={separator}
        />
      )}
    </Box>
  );
};

BreadcrumbItem.defaultProps = {
  separator: "/"
};

BreadcrumbItem.propTypes = {
  separator: oneOfType([string, node])
};

/* 
<Link
  appearance={isCurrent ? "unstyled" : "blue"}
  as={isCurrent ? "span" : as}
  fontWeight="medium"
  {...rest}
/>
*/

const Breadcrumb = ({ children, separator, ...rest }) => {
  const clones = Children.map(children, (child, index) => {
    const isLastChild = index + 1 === Children.count(children);
    return cloneElement(child, {
      isCurrent: isLastChild,
      separator
    });
  });
  return (
    <Box as="nav" aria-label="Breadcrumb" {...rest}>
      <Box as="ol">{clones}</Box>
    </Box>
  );
};

BreadcrumbItem.propTypes = {
  size: oneOf(["sm", "md", "lg"]),
  separator: oneOfType([string, node])
};

export default Breadcrumb;
