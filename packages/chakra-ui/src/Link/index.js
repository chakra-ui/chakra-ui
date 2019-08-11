/** @jsx jsx */
import { jsx } from "@emotion/core";
import PseudoBox from "../PseudoBox";
import useLinkStyle from "./styles";

const Link = ({ isDisabled, color = "blue", variant, onClick, ...rest }) => {
  const styledProps = useLinkStyle({ color, variant });
  return (
    <PseudoBox
      as="a"
      tabIndex={isDisabled ? -1 : undefined}
      aria-disabled={isDisabled}
      borderRadius="sm"
      onClick={isDisabled ? event => event.preventDefault() : onClick}
      {...styledProps}
      {...rest}
    />
  );
};

export default Link;
