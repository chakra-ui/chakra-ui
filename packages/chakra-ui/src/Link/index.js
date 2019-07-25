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
    opacity: "40%",
    cursor: "not-allowed",
    textDecoration: "none"
  },
  _hover: {
    textDecoration: "underline"
  },
  _active: {
    opacity: "80%"
  },
  ...(isUnstyled && {
    color: "inherit",
    cursor: "default",
    textDecoration: "none",
    _hover: { textDecoration: "none" }
  })
});

const Link = ({ isDisabled, color = "blue", isUnstyled, onClick, ...rest }) => {
  const styledProps = useLinkStyle({ color, isUnstyled });
  return (
    <PseudoBox
      as="a"
      tabIndex={isDisabled ? -1 : undefined}
      aria-disabled={isDisabled}
      borderRadius="sm"
      onClick={isDisabled ? e => e.preventDefault() : onClick}
      {...styledProps}
      {...rest}
    />
  );
};

export default Link;
