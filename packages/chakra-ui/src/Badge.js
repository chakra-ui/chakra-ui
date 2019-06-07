/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { Box } from "./Layout";

const Badge = ({ color, children, variant, ...rest }) => {
  const colorProps = {
    solid: {
      bg: `${color}.600`,
      color: "#fff"
    },
    subtle: {
      bg: `${color}.100`,
      color: `${color}.800`
    }
  };

  return (
    <Box
      display="inline-block"
      px={2}
      textTransform="uppercase"
      fontSize="sm"
      borderRadius="sm"
      fontWeight="bold"
      whiteSpace="nowrap"
      verticalAlign="middle"
      {...colorProps[variant]}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Badge;

Badge.propTypes = {
  variant: propTypes.oneOf(["solid", "subtle"])
  // color: propType is based on the color keys in the ThemeProvider
};

Badge.defaultProps = {
  color: "red",
  variant: "subtle"
};
