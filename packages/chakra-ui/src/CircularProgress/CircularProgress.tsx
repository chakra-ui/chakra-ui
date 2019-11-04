/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import { useColorMode } from "../ColorModeProvider";
import { Box, BoxProps, SystemProps } from "@chakra-ui/layout";
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
interface CircularProgressOptions {
  /**
   * The size of the circular progress in CSS units
   */
  size?: string;
  /**
   * Maximum value defining 100% progress made (must be higher than 'min')
   */
  max?: number;
  /**
   * Minimum value defining 'no progress' (must be lower than 'max')
   */
  min?: number;
  /**
   * Puts the component into 'indeterminate' state; Ignores 'value' prop
   */
  isIndeterminate?: boolean;
  /**
   * The thickness of progress indicator as a ratio of `size`. Must be between `0` and `1`
   */
  thickness?: number;
  /**
   * Current progress (must be between min/max)
   */
  value?: number;
  /**
   * Angle to rotate progress indicator by
   */
  angle?: number;
  /**
   * If `true`, the cap of the progress indicator will be rounded.
   */
  capIsRound?: boolean;
  /**
   * The content of the circular progress bar. If passed, the content will be inside and centered in the progress bar.
   */
  children?: React.ReactNode;
  /**
   * The color name of the progress track. Use a color key in the theme object
   */
  trackColor?: string;
  /**
   * The color of the progress indicator. Use a color key in the theme object
   */
  color?: string;
}

interface SvgProps {
  as?: BoxProps["as"];
  viewBox?: string;
  verticalAlign?: SystemProps["verticalAlign"];
  transform?: SystemProps["transform"];
  size?: SystemProps["size"];
  transformOrigin?: SystemProps["transformOrigin"];
  animation?: SystemProps["animation"];
}

interface IndicatorCircleProps {
  as?: BoxProps["as"];
  stroke: SystemProps["stroke"];
  transform?: SystemProps["transform"];
  animation?: SystemProps["animation"];
  strokeDasharray?: string;
  strokeLinecap?: string;
  strokeDashoffset?: string;
}

type RequiredCircularProgressOptions = Required<
  Pick<
    CircularProgressOptions,
    | "thickness"
    | "angle"
    | "max"
    | "min"
    | "size"
    | "trackColor"
    | "color"
    | "value"
  >
> &
  Pick<CircularProgressOptions, "capIsRound" | "isIndeterminate">;

type CircularProgressProps<P, T> = BoxProps<P, T> & CircularProgressOptions;

export const CircularProgressLabel = (props: BoxProps) => (
  <Box
    position="absolute"
    left="50%"
    top="50%"
    lineHeight="1"
    transform="translate(-50%, -50%)"
    fontSize="0.25em"
    css={{ fontVariantNumeric: "tabular-nums" }}
    {...props}
  />
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
}: RequiredCircularProgressOptions) {
  let radius = 50;
  let diameter = radius * 2;
  let circumference = diameter * Math.PI;
  let strokeDasharray = Math.round(circumference * 1000) / 1000;

  let viewBox = diameter / (1 - thickness / 2);
  let viewBoxAttr = `${viewBox / 2} ${viewBox / 2} ${viewBox} ${viewBox}`;
  let strokeWidth = (thickness / 2) * viewBox;
  let progress = 1 - (value - min) / (max - min);
  let strokeDashoffset = progress * circumference;

  function getCircleProps({
    thickness,
    offset,
    color,
  }: CircularProgressOptions & { offset?: number }) {
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
    } as SvgProps,

    trackCircleProps: getCircleProps({
      thickness: strokeWidth,
      offset: 0,
      color: trackColor,
    }) as CircularProgressOptions & { offset?: number },

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
    } as IndicatorCircleProps,
  };
}

const CircularProgress = forwardRef(function CircularProgress<
  P,
  T extends HTMLElement
>(
  {
    size = "48px",
    max = 100,
    min = 0,
    isIndeterminate,
    thickness = 0.2,
    value = 0,
    angle = 0,
    capIsRound,
    children,
    trackColor = "gray",
    color = "blue",
    ...rest
  }: CircularProgressProps<P, T>,
  ref: React.Ref<T>,
) {
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
}) as <P, T>(
  props: CircularProgressProps<P, T>,
) => React.ReactElement<CircularProgressProps<P, T>>;

export default CircularProgress;
