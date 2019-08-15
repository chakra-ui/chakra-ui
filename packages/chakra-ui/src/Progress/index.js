/** @jsx jsx */
import { jsx, keyframes, css } from "@emotion/core";
import { number, oneOf, bool } from "prop-types";
import { useColorMode } from "../ColorModeProvider";
import Box from "../Box";
import { generateStripe } from "../theme/colors-utils";
import { valueToPercent } from "../Slider";

const stripe = keyframes`
  from { background-position: 1rem 0}
  to { background-position: 0 0 }
`;

const stripeAnimation = css`
  animation: ${stripe} 1s linear infinite;
`;

export const ProgressLabel = props => (
  <Box textAlign="center" width="100%" {...props} />
);

const ProgressIndicator = ({ min, max, value, ...rest }) => {
  const percent = valueToPercent(value, min, max);

  return (
    <Box
      height="100%"
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      role="progressbar"
      transition="all 0.3s"
      width={`${percent}%`}
      {...rest}
    ></Box>
  );
};

const progressbarSizes = {
  lg: "1rem",
  md: "0.75rem",
  sm: "0.5rem",
};

const ProgressTrack = ({ size, ...rest }) => {
  return <Box height={progressbarSizes[size]} overflow="hidden" {...rest} />;
};

const Progress = ({
  color = "blue",
  value = 63,
  min = 0,
  max = 100,
  size = "md",
  hasStripe,
  isAnimated,
  borderRadius,
  rounded,
  children,
  ...rest
}) => {
  const _borderRadius = rounded || borderRadius;
  const { mode } = useColorMode();

  const trackColor = { light: "gray.100", dark: "whiteAlpha.300" };
  const indicatorColor = { light: `${color}.500`, dark: `${color}.200` };

  const stripeStyle = {
    light: generateStripe({}),
    dark: generateStripe({
      color: "rgba(0,0,0,0.1)",
    }),
  };

  return (
    <ProgressTrack
      size={size}
      bg={trackColor[mode]}
      borderRadius={_borderRadius}
      {...rest}
    >
      <ProgressIndicator
        min={min}
        max={max}
        value={value}
        bg={indicatorColor[mode]}
        borderRadius={_borderRadius}
        css={[
          hasStripe && stripeStyle[mode],
          hasStripe && isAnimated && stripeAnimation,
        ]}
      />
    </ProgressTrack>
  );
};

Progress.propTypes = {
  size: oneOf(["md", "sm", "lg"]),
  value: number,
  hasStripe: bool,
  isAnimated: bool,
};

export default Progress;
