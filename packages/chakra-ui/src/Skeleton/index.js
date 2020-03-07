/** @jsx jsx */
import { Fragment } from "react";
import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";
import { css, jsx, keyframes } from "@emotion/core";
import Box from "../Box";

const skeletonGlow = (colorStart, colorEnd) => keyframes`
from {
  border-color: ${colorStart};
  background: ${colorStart};
}

to {
  border-color: ${colorEnd};
  background: ${colorEnd};
}
`;

const getStyle = ({ colorStart, colorEnd, speed }) => css`
  border-color: ${colorStart} !important;
  box-shadow: none !important;

  // do not !important this for Firefox support
  background: ${colorStart};

  // Prevent background color from extending to the border and overlappping
  background-clip: padding-box !important;
  cursor: default;

  // Transparent text will occupy space but be invisible to the user
  color: transparent !important;
  animation: ${speed}s linear infinite alternate
    ${skeletonGlow(colorStart, colorEnd)};
  pointer-events: none;
  user-select: none;

  // Make pseudo-elements (CSS icons) and children invisible
  &::before,
  &::after,
  * {
    visibility: hidden !important;
  }
`;

const Skeleton = props => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const defaultStart = { light: colors.gray[100], dark: colors.gray[800] };
  const defaultEnd = { light: colors.gray[400], dark: colors.gray[500] };
  const {
    colorStart = defaultStart[colorMode],
    colorEnd = defaultEnd[colorMode],
    isLoaded = false,
    speed = 1,
    ...rest
  } = props;
  if (isLoaded) {
    return <Box {...rest} />;
  }

  return (
    <Box
      css={getStyle({ colorStart, colorEnd, speed })}
      borderRadius="2px"
      {...rest}
    />
  );
};

export default Skeleton;
