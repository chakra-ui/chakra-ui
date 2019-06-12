/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Transition } from "react-spring/renderprops";
import { Box } from "./Layout";
import CloseButton from "./CloseButton";

export const PopoverTransition = ({
  isOpen,
  duration = 200,
  children,
  ...rest
}) => {
  return (
    <Transition
      items={isOpen}
      from={{
        opacity: 0.01,
        scale: 0.75
      }}
      enter={{
        opacity: 1,
        scale: 1
      }}
      leave={{
        opacity: 0,
        scale: 0.75
      }}
      config={{ duration, ...rest.config }}
      {...rest}
    >
      {isOpen => isOpen && (style => children(style))}
    </Transition>
  );
};

export const popperStyle = css`
  > [data-arrow] {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
  }

  &[data-placement^="top"] {
    margin-bottom: 5px;
    transform-origin: bottom center;
  }

  &[data-placement^="top"] > [data-arrow] {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
  }

  &[data-placement^="bottom"] {
    margin-top: 5px;
    transform-origin: top center;
  }

  &[data-placement^="bottom"] > [data-arrow] {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
    box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
  }

  &[data-placement^="right"] {
    margin-left: 5px;
    transform-origin: left center;
  }

  &[data-placement^="right"] > [data-arrow] {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
    box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
  }

  &[data-placement^="left"] {
    margin-right: 5px;
    transform-origin: right center;
  }

  &[data-placement^="left"] > [data-arrow] {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
    box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
  }
`;

export const PopoverWrapper = styled(Box)`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  ${popperStyle};
`;

export const PopoverCloseButton = ({ onClick, ...props }) => (
  <CloseButton
    size="md"
    onClick={onClick}
    position="absolute"
    top="8px"
    right="8px"
    {...props}
  />
);

export const PopoverHeader = ({ ...props }) => {
  return <Box px="12px" boxShadow="bottom" py="8px" as="header" {...props} />;
};

export const PopoverFooter = ({ ...props }) => {
  return <Box px="12px" boxShadow="top" py="8px" as="footer" {...props} />;
};

export const PopoverBody = ({ isScrollable, ...props }) => {
  return (
    <Box
      flex="1"
      px="12px"
      py="8px"
      {...isScrollable && { overflow: "hidden auto" }}
      {...props}
    />
  );
};
