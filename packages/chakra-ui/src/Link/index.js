/** @jsx jsx */
import { jsx } from "@emotion/core";
import PseudoBox from "../PseudoBox";

const useLinkStyle = ({ color, isUnstyled }) => ({
  transition: `all 0.15s ease-out`,
  textDecoration: "none",
  color: `${color}.500`,
  cursor: "pointer",
  _focus: {
    boxShadow: "outline"
  },
  _disabled: {
    color: "gray.400",
    cursor: "not-allowed",
    textDecoration: "none"
  },
  _hover: {
    color: `${color}.600`,
    textDecoration: "underline"
  },
  _active: {
    color: `${color}.400`
  },
  ...(isUnstyled && {
    color: "inherit",
    textDecoration: "none"
  })
});

const Link = ({ isDisabled, color = "blue", isUnstyled, onClick, ...rest }) => {
  const styledProps = useLinkStyle({ color, isUnstyled });
  return (
    <PseudoBox
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      borderRadius="sm"
      onClick={isDisabled ? e => e.preventDefault() : onClick}
      {...styledProps}
      {...rest}
    />
  );
};

export default Link;
