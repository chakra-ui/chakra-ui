/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import Box from "../Box";
import PseudoBox from "../PseudoBox";
import getPopperArrowStyle from "../usePopper/styles";

export const PopoverContent = forwardRef(
  ({ arrowSize, arrowShadowColor, hasArrow, ...props }, ref) => (
    <PseudoBox
      width="100%"
      position="relative"
      display="flex"
      flexDirection="column"
      rounded="md"
      shadow="sm"
      maxWidth="xs"
      ref={ref}
      css={getPopperArrowStyle({ arrowSize, arrowShadowColor, hasArrow })}
      _focus={{ outline: 0, shadow: "outline" }}
      {...props}
    />
  ),
);

export const PopoverHeader = props => (
  <Box px={3} py={2} borderBottomWidth="1px" as="header" {...props} />
);

export const PopoverFooter = props => (
  <Box px={3} py={2} borderTopWidth="1px" as="footer" {...props} />
);

export const PopoverBody = props => <Box flex="1" px={3} py={2} {...props} />;
