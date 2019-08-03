/** @jsx jsx */
import { jsx, keyframes, css } from "@emotion/core";
import { number, oneOf, bool } from "prop-types";
import VisuallyHidden from "../VisuallyHidden";
import { useUIMode } from "../ThemeProvider";
import Box from "../Box";
import { generateStripe } from "../theme/colors.utils";
import { valueToPercent } from "../Slider/index";

const stripe = keyframes`
  from { background-position: 1rem 0}
  to { background-position: 0 0 }
`;

const stripeAnimation = css`
  animation: ${stripe} 1s linear infinite;
`;

export const stripeStyle = generateStripe({});

const progressbarSizes = {
  lg: "1rem",
  md: "0.75rem",
  sm: "0.5rem"
};

const Progress = ({
  color = "blue",
  value = 63,
  min = 0,
  max = 100,
  size = "md",
  hasStripe,
  isAnimated,
  ...rest
}) => {
  const { mode } = useUIMode();
  const percent = valueToPercent(value, min, max);
  return (
    <Box
      className="progress"
      height={progressbarSizes[size]}
      bg={mode === "dark" ? "whiteAlpha.300" : "gray.100"}
      overflow="hidden"
      {...rest}
    >
      <Box
        height="100%"
        bg={`${color}.500`}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        role="progressbar"
        borderRadius="full"
        transition="all 0.3s"
        width={`${percent}%`}
        css={[
          hasStripe && stripeStyle,
          hasStripe && isAnimated && stripeAnimation
        ]}
      >
        <VisuallyHidden>{`${percent}%`}</VisuallyHidden>
      </Box>
    </Box>
  );
};

Progress.propTypes = {
  size: oneOf(["md", "sm", "lg"]),
  value: number,
  hasStripe: bool,
  isAnimated: bool
};

export default Progress;
