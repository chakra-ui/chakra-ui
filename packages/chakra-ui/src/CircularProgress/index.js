/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";
import { forwardRef } from "react";

const circularProgressCircle = keyframes`
  0% {
    stroke-dasharray: 1, 400;
    stroke-dashoffset: 0;
  }
  
  50% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -100;
  }
  
  100% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -300;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const CircularProgressLabel = props => (
  <Box
    position="absolute"
    left="50%"
    top="50%"
    lineHeight="1"
    transform="translate(-50%, -50%)"
    fontSize="0.25em"
    css={{ fontVariantNumeric: "tabular-nums" }}
    {...props}
  ></Box>
);

function getComputedProps({
  min,
  max,
  size,
  value,
  angle,
  thickness,
  trackColor,
  color,
  capIsRound,
  isIndeterminate,
}) {
  let radius = 50;
  let diameter = radius * 2;
  let circumference = diameter * Math.PI;
  let strokeDasharray = Math.round(circumference * 1000) / 1000;

  let viewBox = diameter / (1 - thickness / 2);
  let viewBoxAttr = `${viewBox / 2} ${viewBox / 2} ${viewBox} ${viewBox}`;
  let strokeWidth = (thickness / 2) * viewBox;
  let progress = 1 - (value - min) / (max - min);
  let strokeDashoffset = progress * circumference;

  function getCircleProps({ thickness, offset, color }) {
    return {
      as: "circle",
      color,
      fill: "transparent",
      stroke: "currentColor",
      strokeWidth: thickness,
      strokeDasharray: strokeDasharray,
      strokeDashoffset: offset,
      cx: viewBox,
      cy: viewBox,
      r: radius,
    };
  }

  return {
    rootProps: {
      size: "1em",
      fontSize: size,
      display: "inline-block",
      position: "relative",
      veriticalAlign: "middle",
      role: "progressbar",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": isIndeterminate ? null : value,
    },

    svgProps: {
      as: "svg",
      viewBox: viewBoxAttr,
      verticalAlign: "top",
      transform: `rotate3d(0, 0, 1, ${angle - 90}deg)`,
      size: "100%",
      ...(isIndeterminate && {
        transformOrigin: "50% 50%",
        animation: `${spin} 2s linear infinite`,
      }),
    },

    trackCircleProps: getCircleProps({
      thickness: strokeWidth,
      offset: 0,
      color: trackColor,
    }),

    indicatorCircleProps: {
      ...getCircleProps({
        thickness: strokeWidth,
        offset: strokeDashoffset,
        color: color,
      }),
      ...(capIsRound && { strokeLinecap: "round" }),
      ...(isIndeterminate && {
        transition: "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease",
        animation: `${circularProgressCircle} 1.5s ease-in-out infinite`,
        strokeDasharray: "1 400",
        strokeDashoffset: "0",
      }),
      stroke: "currentColor",
    },
  };
}

const CircularProgress = forwardRef((props, ref) => {
  const {
    size = "48px",
    max = 100,
    min = 0,
    isIndeterminate,
    thickness = 0.2,
    value,
    angle = 0,
    capIsRound,
    children,
    trackColor = "gray",
    color = "blue",
    ...rest
  } = props;
  const { colorMode } = useColorMode();

  const _trackColor = { light: `${trackColor}.100`, dark: "whiteAlpha.300" };
  const _color = { light: `${color}.500`, dark: `${color}.200` };

  const {
    rootProps,
    indicatorCircleProps,
    svgProps,
    trackCircleProps,
  } = getComputedProps({
    min,
    max,
    value,
    size,
    angle,
    thickness,
    capIsRound,
    isIndeterminate,
    color: _color[colorMode],
    trackColor: _trackColor[colorMode],
  });

  return (
    <Box ref={ref} {...rootProps} {...rest}>
      <Box {...svgProps}>
        <Box {...trackCircleProps} data-progress-track />
        <Box {...indicatorCircleProps} data-progress-indicator />
      </Box>
      {children}
    </Box>
  );
});

export default CircularProgress;
