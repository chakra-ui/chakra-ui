/**@jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { rotate, spin } from "./Progress.utils";

type CircleProps = React.ComponentProps<"circle">;

const Circle = (props: CircleProps) => (
  <circle
    cx={50}
    cy={50}
    r={42}
    fill="transparent"
    strokeLinecap="round"
    {...props}
  />
);

type ShapeProps = React.ComponentProps<"svg"> & {
  size?: string | number;
  isIndeterminate?: boolean;
};

const Shape = ({ size, isIndeterminate, ...props }: ShapeProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    css={
      isIndeterminate &&
      css`
        animation: ${rotate} 2s linear infinite;
      `
    }
    {...props}
  />
);

export function CircularProgress({
  percent = 10,
  strokeWidth = "5px",
  strokeColor = "#0078d4",
  trackColor = "#edebe9",
  size = "100px",
}) {
  const determinant = percent * 2.64;

  const isIndeterminate = percent == null;

  const indicatorProps = isIndeterminate
    ? {
        css: css`
          animation: ${spin} 1.5s linear infinite;
        `,
      }
    : {
        strokeDashoffset: 66,
        strokeDasharray: `${determinant} ${264 - determinant}`,
        css: css`
          transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease;
        `,
      };

  return (
    <Shape size={size}>
      <Circle stroke={trackColor} strokeWidth={strokeWidth} />
      <Circle
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        {...indicatorProps}
      />
    </Shape>
  );
}
