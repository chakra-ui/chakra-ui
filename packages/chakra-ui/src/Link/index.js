/** @jsx jsx */
import { jsx } from "@emotion/core";
import PseudoBox from "../PseudoBox";
import useLinkStyle from "./styles";

const Link = ({
  isDisabled,
  variantColor = "blue",
  variant = "basic",
  onClick,
  ...rest
}) => {
  const styledProps = useLinkStyle({ variantColor, variant });
  return (
    <PseudoBox
      as="a"
      tabIndex={isDisabled ? -1 : undefined}
      aria-disabled={isDisabled}
      onClick={isDisabled ? event => event.preventDefault() : onClick}
      {...styledProps}
      {...rest}
    />
  );
};

export default Link;
