/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, forwardRef } from "react";
import Box from "../Box";
import Link from "../Link";

const BreadcrumbSeparator = forwardRef(({ spacing, ...props }, ref) => {
  return (
    <Box ref={ref} role="presentation" as="span" mx={spacing} {...props} />
  );
});

const Span = forwardRef((props, ref) => <Box ref={ref} as="span" {...props} />);

const BreadcrumbLink = forwardRef(({ isCurrentPage, ...props }, ref) => {
  const Comp = isCurrentPage ? Span : Link;

  return (
    <Comp ref={ref} aria-current={isCurrentPage ? "page" : null} {...props} />
  );
});

const BreadcrumbItem = ({
  isCurrentPage,
  separator,
  isLastChild,
  addSeparator,
  spacing,
  children,
  ...rest
}) => {
  const clones = Children.map(children, child => {
    if (child.type === BreadcrumbLink) {
      return cloneElement(child, { isCurrentPage });
    }

    if (child.type === BreadcrumbSeparator) {
      return cloneElement(child, {
        spacing,
        children: child.props.children || separator,
      });
    }

    return child;
  });

  return (
    <Box display="inline-flex" alignItems="center" as="li" {...rest}>
      {clones}
      {!isLastChild && addSeparator && (
        <BreadcrumbSeparator spacing={spacing} children={separator} />
      )}
    </Box>
  );
};

const Breadcrumb = ({
  children,
  spacing = 2,
  addSeparator = true,
  separator = "/",
  ...rest
}) => {
  const clones = Children.map(children, (child, index) =>
    cloneElement(child, {
      addSeparator,
      separator,
      spacing,
      isLastChild: Children.count(children) === index + 1,
    }),
  );

  return (
    <Box as="nav" aria-label="breadcrumb" {...rest}>
      <Box as="ol">{clones}</Box>
    </Box>
  );
};

export default Breadcrumb;
export { BreadcrumbLink, BreadcrumbItem, BreadcrumbSeparator };
