import { number, oneOf } from "prop-types";
import React from "react";
import { Box } from "./Layout";
import VisuallyHidden from "./VisuallyHidden";

const Progress = ({
  color = "blue",
  value = 63,
  min = 0,
  max = 100,
  size = "md",
  mode,
  borderRadius,
  ...rest
}) => {
  const percent = (value / max) * 100;
  return (
    <Box
      className="progress"
      height={`progressbar.${size}`}
      borderRadius={borderRadius}
      bg={mode === "dark" ? "alpha.300" : "gray.100"}
      overflow="hidden"
      {...rest}
    >
      <Box
        height="100%"
        bg={`${color}.500`}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value.toString()}
        role="progressbar"
        borderRadius={borderRadius}
        transition="all 0.3s"
        width={`${percent}%`}
      >
        <VisuallyHidden>{`${percent}%`}</VisuallyHidden>
      </Box>
    </Box>
  );
};

Progress.propTypes = {
  type: oneOf(["circle", "line"]),
  size: oneOf(["md", "sm", "lg"]),
  value: number
};

export default Progress;
