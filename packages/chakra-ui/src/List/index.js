/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef, Children, cloneElement } from "react";
import Box from "../Box";
import Icon from "../Icon";

const List = forwardRef(
  ({ type = "none", spacing, children, ...props }, ref) => (
    <Box
      ref={ref}
      as="ul"
      ml={type === "none" ? null : "1.25em"}
      listStyleType={type}
      {...props}
    >
      {Children.map(children, (child, index) => {
        const isLast = index + 1 === Children.count(children);
        if (isLast) {
          return child;
        }

        return cloneElement(child, { spacing });
      })}
    </Box>
  ),
);

export const ListItem = forwardRef(({ spacing, ...props }, ref) => (
  <Box ref={ref} as="li" mb={spacing} {...props} />
));

export const ListIcon = ({ icon, ...props }) => {
  if (typeof icon === "string") {
    return <Icon name={icon} mr={2} {...props} />;
  }

  return (
    <Box
      as={icon}
      d="inline"
      focusable="false"
      size="1em"
      color="currentColor"
      mr={2}
      {...props}
    />
  );
};

export default List;
