/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import useBadgeStyle from "./styles";
import Box from "../Box";
import { forwardRef } from "react";

const Badge = forwardRef(({ color, variant, ...props }, ref) => {
  const badgeStyleProps = useBadgeStyle({ color, variant });

  return (
    <Box
      ref={ref}
      display="inline-block"
      px={1}
      textTransform="uppercase"
      fontSize="sm"
      borderRadius="sm"
      fontWeight="bold"
      whiteSpace="nowrap"
      verticalAlign="middle"
      {...badgeStyleProps}
      {...props}
    />
  );
});

Badge.propTypes = {
  variant: propTypes.oneOf(["solid", "subtle", "outline"]),
};

Badge.defaultProps = {
  color: "gray",
  variant: "subtle",
};

export default Badge;
