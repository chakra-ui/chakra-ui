/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { Box } from "./Layout";

const Badge = props => {
  const { color, children, variant, ...rest } = props;

  const variantStyle = theme => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: theme.colors[color][600],
          color: "#fff"
        };
      case "subtle":
        return {
          backgroundColor: theme.colors[color][100],
          color: theme.colors[color][800]
        };
      case "outline":
        return {
          boxShadow: `0 0 0 1px inset ` + theme.colors[color][600],
          color: theme.colors[color][600],
          backgroundColor: "transparent"
        };
      default:
        return {};
    }
  };

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
      css={variantStyle}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Badge;

Badge.propTypes = {
  variant: propTypes.oneOf(["solid", "subtle", "outline"])
  // color: propType is based on the color keys in the ThemeProvider
};

Badge.defaultProps = {
  color: "red",
  variant: "subtle"
};
