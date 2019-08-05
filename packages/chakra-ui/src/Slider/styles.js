/** @jsx jsx */
import { useTheme, useUIMode } from "../ThemeProvider";

const centeredProps = {
  position: "absolute",
  top: "50%",
  transform: `translateY(-50%)`,
};

const thumbStyle = ({ thumbSize, trackPercent, theme }) => {
  return {
    ...centeredProps,
    zIndex: 1,
    size: thumbSize,
    rounded: "full",
    bg: "#fff",
    boxShadow: "sm",
    left: `calc(${trackPercent}% - ${thumbSize} / 2)`,
    border: "1px",
    borderColor: "transparent",
    transition: "transform 0.2s",
    _focus: {
      boxShadow: "outline",
    },
    _disabled: {
      backgroundColor: "gray.300",
    },
    _active: {
      transform: `translateY(-50%) scale(1.15)`,
    },
  };
};

const filledTrackStyle = ({ trackHeight, trackPercent }) => ({
  ...centeredProps,
  height: trackHeight,
  bg: "blue.500",
  width: `${trackPercent}%`,
  rounded: "sm",
});

const themedTrackStyle = {
  light: {
    bg: "gray.200",
    _disabled: {
      bg: "gray.300",
    },
  },
  dark: {
    bg: "whiteAlpha.200",
    _disabled: {
      bg: "whiteAlpha.300",
    },
  },
};

const trackStyle = ({ trackHeight, theme, mode }) => ({
  height: trackHeight,
  borderRadius: "sm",
  width: "100%",
  ...centeredProps,
  ...themedTrackStyle[mode],
});

const rootStyle = {
  width: "full",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  _disabled: {
    opacity: 0.6,
    cursor: "default",
    pointerEvents: "none",
  },
};

const sizes = {
  lg: {
    thumb: "16px",
    trackHeight: "4px",
  },
  md: {
    thumb: "14px",
    trackHeight: "4px",
  },
  sm: {
    thumb: "10px",
    trackHeight: "2px",
  },
};

const useSliderStyle = props => {
  const theme = useTheme();
  const { mode } = useUIMode();

  const { trackPercent, size, color } = props;
  const { trackHeight, thumb: thumbSize } = sizes[size];

  const _props = {
    trackHeight,
    thumbSize,
    theme,
    trackPercent,
    color,
    mode,
  };
  return {
    rootStyle,
    trackStyle: trackStyle(_props),
    filledTrackStyle: filledTrackStyle(_props),
    thumbStyle: thumbStyle(_props),
  };
};

export default useSliderStyle;
