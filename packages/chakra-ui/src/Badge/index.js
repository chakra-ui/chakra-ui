/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { Box } from "../Layout";
import useBadgeStyle from "./BadgeStyle";

const Badge = ({ css, ...props }) => {
  const badgeStyle = useBadgeStyle(props);
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
      css={[badgeStyle, css]}
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
