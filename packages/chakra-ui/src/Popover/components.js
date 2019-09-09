/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { forwardRef } from "react";
import Box from "../Box";
import Transition from "react-transition-group/Transition";

export const ScaleTransition = ({
  in: inProp,
  duration = 200,
  children,
  ...props
}) => {
  const transitionStyles = {
    entering: { opacity: 0, scale: 0.75 },
    entered: {
      opacity: 1,
      scale: 1,
      transition: `transform, opacity ${duration}ms ease-in-out`,
    },
    // exiting: { opacity: 1, scale: 1 },
    exited: {
      opacity: 0,
      scale: 0.75,
      transition: `transform, opacity ${duration}ms ease-in-out`,
    },
  };
  const defaultStyle = {
    // transition: `transform, opacity ${duration}ms ease-in-out`,
    opacity: 0,
    // scale: 0.75,
  };

  // const defaultStyle = {
  //   transition: `opacity ${duration}ms ease-in-out`,
  //   opacity: 0,
  // };

  // const transitionStyles = {
  //   entering: { opacity: 1 },
  //   entered: { opacity: 1 },
  //   exiting: { opacity: 0 },
  //   exited: { opacity: 0 },
  // };

  return (
    <Transition in={inProp} timeout={duration} {...props}>
      {state => children({ ...defaultStyle, ...transitionStyles[state] })}
    </Transition>
  );
};

const arrowSize = "5px";

export const popperStyle = css`
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
    bottom: -5px;
    margin-top: 0;
    margin-bottom: 0;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
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
    top: -5px;
    margin-top: 0;
    margin-bottom: 0;
    box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
  }

  &[data-placement^="right"] {
    margin-left: 5px;
    transform-origin: left center;
  }

  &[data-placement^="right"] > [data-arrow] {
    border-width: ${arrowSize} ${arrowSize} ${arrowSize} 0;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    left: -5px;
    margin-left: 0;
    margin-right: 0;
    box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
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
    right: -5px;
    margin-left: 0;
    margin-right: 0;
    box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
  }
`;

export const PopoverContent = forwardRef((props, ref) => (
  <Box
    width="100%"
    position="relative"
    display="flex"
    flexDirection="column"
    rounded="lg"
    boxShadow="lg"
    maxWidth="xs"
    ref={ref}
    css={popperStyle}
    {...props}
  />
));

export const PopoverHeader = props => (
  <Box px="12px" boxShadow="bottom" py="8px" as="header" {...props} />
);

export const PopoverFooter = props => (
  <Box px="12px" boxShadow="top" py="8px" as="footer" {...props} />
);

export const PopoverBody = ({ isScrollable, ...props }) => (
  <Box
    flex="1"
    px="12px"
    py="8px"
    {...(isScrollable && { overflow: "hidden auto" })}
    {...props}
  />
);
