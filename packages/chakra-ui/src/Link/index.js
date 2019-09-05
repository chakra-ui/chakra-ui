/** @jsx jsx */
import { jsx } from "@emotion/core";
import PseudoBox from "../PseudoBox";
import { forwardRef } from "react";

const baseStyleProps = {
  transition: `all 0.15s ease-out`,
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  _focus: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: "0.4",
    cursor: "not-allowed",
    textDecoration: "none",
  },
};

const Link = forwardRef(({ isDisabled, isExternal, onClick, ...rest }, ref) => {
  const externalProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : null;

  return (
    <PseudoBox
      as="a"
      ref={ref}
      tabIndex={isDisabled ? -1 : undefined}
      aria-disabled={isDisabled}
      onClick={isDisabled ? event => event.preventDefault() : onClick}
      _hover={{ textDecoration: "underline" }}
      {...externalProps}
      {...baseStyleProps}
      {...rest}
    />
  );
});

export default Link;
