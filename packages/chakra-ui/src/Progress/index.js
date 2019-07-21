/** @jsx jsx */
import { jsx, keyframes, css } from "@emotion/core";
import { number, oneOf, bool } from "prop-types";
import { Box } from "../Layout";
import VisuallyHidden from "../VisuallyHidden";
import { useUIMode } from "../ThemeProvider";

const stripe = keyframes`
  from { background-position: 1rem 0}
  to { background-position: 0 0 }
`;

const stripeAnimation = css`
  animation: ${stripe} 1s linear infinite;
`;

const stripeStyle = css`
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
`;

const Progress = ({
  color = "blue",
  value = 63,
  min = 0,
  max = 100,
  size = "md",
  hasStripe,
  isAnimated,
  borderRadius,
  ...rest
}) => {
  const { mode } = useUIMode();
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
        aria-valuenow={value}
        role="progressbar"
        borderRadius={borderRadius}
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
