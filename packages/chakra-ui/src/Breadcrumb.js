/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import { Children, cloneElement, Fragment } from "react";
import Icon from "./Icon";
import { Box, Flex } from "./Layout";
import Link from "./Link";
// import Truncate from "./Truncate";

export const BreadcrumbItem = ({
  size,
  isCurrent,
  color = "blue.600",
  separator,
  as,
  ...rest
}) => {
  return (
    <Flex as="li" fontSize={size} display="inline-flex" alignItems="center">
      <Link
        appearance={isCurrent ? "unstyled" : "blue"}
        aria-current={isCurrent ? "page" : undefined}
        as={isCurrent ? "span" : as}
        fontWeight="medium"
        {...rest}
      />
      {!isCurrent && (
        <Fragment>
          {separator === "arrow" && (
            <Icon name="chevronRight" size="1.25em" color="gray.200" mx={1} />
          )}
          {separator === "slash" && (
            <Box
              as="span"
              minWidth="1.25em"
              verticalAlign="middle"
              textAlign="center"
              mx={1}
              fontSize="1em"
              fontWeight="semibold"
              color="gray.200"
            >
              /
            </Box>
          )}
        </Fragment>
      )}
    </Flex>
  );
};

BreadcrumbItem.defaultProps = {
  size: "sm",
  separator: "arrow"
};

BreadcrumbItem.propTypes = {
  size: oneOf(["sm", "md", "lg"]),
  status: oneOf(["disabled", "selected"]),
  separator: oneOf(["arrow", "slash"])
};

const Breadcrumbs = ({
  children,
  role = "navigation",
  ariaLabel = "Breadcrumb",
  size,
  separator,
  ...rest
}) => {
  const clones = Children.map(children, (child, index) => {
    const isLastChild = index + 1 === Children.count(children);
    return cloneElement(child, {
      isCurrent: isLastChild,
      size,
      separator
    });
  });
  return (
    <Box as="ol" role={role} aria-label={ariaLabel} {...rest}>
      {clones}
    </Box>
  );
};

export default Breadcrumbs;
