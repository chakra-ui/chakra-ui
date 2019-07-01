/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import propTypes from "prop-types";
import { Box } from "../Layout";
import { useTheme } from "../ThemeProvider";

const variantStyle = ({ color, variant, theme }) => {
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
        boxShadow: `inset 0 0 0px 1px ` + theme.colors[color][600],
        color: theme.colors[color][600],
        backgroundColor: "transparent"
      };
    default:
      return {};
  }
};

const useBadgeStyle = props => {
  const theme = useTheme();
  const _props = { ...props, theme };

  return css`
    ${variantStyle(_props)}
  `;
};

const Badge = props => {
  const style = useBadgeStyle(props);
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
      css={style}
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
