/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { forwardRef } from "react";
import Box from "../Box";
import PseudoBox from "../PseudoBox";

export const popperStyle = (arrowSize = "5px") => css`
  > [data-arrow] {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: ${arrowSize};
  }

  &[data-placement^="top"] {
    margin-bottom: ${arrowSize};
    transform-origin: bottom center;
  }

  &[data-placement^="top"] > [data-arrow] {
    border-width: ${arrowSize} ${arrowSize} 0 ${arrowSize};
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    bottom: -${arrowSize};
    margin-top: 0;
    margin-bottom: 0;
  }

  &[data-placement^="bottom"] {
    margin-top: ${arrowSize};
    transform-origin: top center;
  }

  &[data-placement^="bottom"] > [data-arrow] {
    border-width: 0 ${arrowSize} ${arrowSize} ${arrowSize};
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -${arrowSize};
    margin-top: 0;
    margin-bottom: 0;
  }

  &[data-placement^="right"] {
    margin-left: ${arrowSize};
    transform-origin: left center;
  }

  &[data-placement^="right"] > [data-arrow] {
    border-width: ${arrowSize} ${arrowSize} ${arrowSize} 0;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    left: -${arrowSize};
    margin-left: 0;
    margin-right: 0;
  }

  &[data-placement^="left"] {
    margin-right: ${arrowSize};
    transform-origin: right center;
  }

  &[data-placement^="left"] > [data-arrow] {
    border-width: ${arrowSize} 0 ${arrowSize} ${arrowSize};
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    right: -${arrowSize};
    margin-left: 0;
    margin-right: 0;
  }
`;

export const PopoverContent = forwardRef((props, ref) => (
  <PseudoBox
    width="100%"
    position="relative"
    display="flex"
    flexDirection="column"
    rounded="lg"
    shadow="md"
    maxWidth="xs"
    ref={ref}
    css={popperStyle()}
    _focus={{ outline: 0, shadow: "outline" }}
    {...props}
  />
));

export const PopoverHeader = props => (
  <Box px="12px" shadow="bottom" py="8px" as="header" {...props} />
);

export const PopoverFooter = props => (
  <Box px="12px" shadow="top" py="8px" as="footer" {...props} />
);

export const PopoverBody = props => (
  <Box flex="1" px="12px" py="8px" {...props} />
);
