/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { Box } from "../Layout";
import badgeStyle from "./styles";
import { useTheme, useUIMode } from "../ThemeProvider";

const Badge = ({ color, variant, ...props }) => {
  const { mode } = useUIMode();
  const theme = useTheme();
  const badgeStyleProps = badgeStyle({ color, variant, mode, theme });

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
