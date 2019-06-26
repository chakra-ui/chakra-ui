/** @jsx jsx */
import { css } from "@emotion/core";
import { useTheme, useUIMode } from "./ThemeProvider";

const centered = css({
  position: "absolute",
  top: "50%",
  transform: `translateY(-50%)`
});

const thumbStyle = ({ thumbSize, trackPercent, theme }) => {
  return css(centered, {
    zIndex: 1,
    width: thumbSize,
    height: thumbSize,
    borderRadius: theme.radii.round,
    backgroundColor: "#fff",
    boxShadow: theme.shadows.sm,
    left: `calc(${trackPercent}% - ${thumbSize} / 2)`,
    border: "1px solid",
    borderColor: "transparent",
    transition: "transform 0.2s",
    "&:focus": {
      boxShadow: theme.shadows.focusring,
      borderColor: theme.colors.blue[300]
    },
    "&[aria-disabled=true]": {
      backgroundColor: theme.colors.gray[300]
    },
    ":active": {
      transform: `translateY(-50%) scale(1.15)`
    }
  });
};

const filledTrackStyle = ({ trackHeight, theme, trackPercent }) =>
  css(centered, {
    height: trackHeight,
    backgroundColor: theme.colors.blue[500],
    width: `${trackPercent}%`,
    borderRadius: theme.radii.sm
  });

const themedTrackStyle = theme => ({
  light: {
    backgroundColor: theme.colors.gray[200],
    "[aria-disabled=true] &": {
      backgroundColor: theme.colors.gray[400]
    }
  },
  dark: {
    backgroundColor: theme.colors.alpha[300],
    "[aria-disabled=true] &": {
      backgroundColor: theme.colors.alpha[500]
    }
  }
});

const trackStyle = ({ trackHeight, theme, mode }) =>
  css({
    height: trackHeight,
    borderRadius: theme.radii.sm,
    ...themedTrackStyle(theme)[mode]
  });

const sliderRootStyle = css({
  width: "100%",
  display: "inline-block",
  position: "relative",
  cursor: "pointer"
});

const useSliderStyle = props => {
  const theme = useTheme();
  const mode = useUIMode();

  const { trackPercent, size, color } = props;
  const { trackHeight, thumb: thumbSize } = theme.sizes.slider[size];

  const _props = {
    trackHeight,
    thumbSize,
    theme,
    trackPercent,
    color,
    mode
  };
  return {
    rootStyle: sliderRootStyle,
    trackStyle: trackStyle(_props),
    filledTrackStyle: filledTrackStyle(_props),
    thumbStyle: thumbStyle(_props)
  };
};

export default useSliderStyle;
