/** @jsx jsx */
import { jsx, keyframes, css } from "@emotion/core";
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

const indeterminate = keyframes`
0% {
    left: -35%;
    right: 100%; }
  60% {
    left: 100%;
    right: -90%; }
  100% {
    left: 100%;
    right: -90%; } }
`;

const indeterminateAnimation = css`
  animation: ${indeterminate} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
`;

export const ProgressLabel = props => (
  <Box textAlign="center" width="100%" {...props} />
);

const ProgressIndicator = ({ isIndeterminate, min, max, value, ...rest }) => {
  const percent = valueToPercent(value, min, max);

  return (
    <Box
      height="100%"
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={isIndeterminate ? null : value}
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
  return (
    <Box
      pos="relative"
      height={progressbarSizes[size]}
      overflow="hidden"
      {...rest}
    />
  );
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
  isIndeterminate,
  ...rest
}) => {
  const _borderRadius = rounded || borderRadius;
  const { colorMode } = useColorMode();

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
      bg={trackColor[colorMode]}
      borderRadius={_borderRadius}
      {...rest}
    >
      <ProgressIndicator
        min={min}
        max={max}
        value={value}
        bg={indicatorColor[colorMode]}
        borderRadius={_borderRadius}
        isIndeterminate={isIndeterminate}
        {...(isIndeterminate && {
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          willChange: "left, right",
        })}
        css={[
          hasStripe && stripeStyle[colorMode],
          hasStripe && isAnimated && stripeAnimation,
          isIndeterminate && indeterminateAnimation,
        ]}
      />
    </ProgressTrack>
  );
};

export default Progress;
