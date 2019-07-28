/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import useBadgeStyle from "./styles";
import Box from "../Box";

const Badge = ({ color, variant, ...props }) => {
  const badgeStyleProps = useBadgeStyle({ color, variant });

  return (
    <Box
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
};

Badge.propTypes = {
  variant: propTypes.oneOf(["solid", "subtle", "outline"])
};

Badge.defaultProps = {
  color: "red",
  variant: "subtle"
};

export default Badge;
