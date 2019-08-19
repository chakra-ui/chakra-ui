import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";
import { isDarkColor } from "../theme/colors-utils";

// Found this on StackOverflow :)
function string2Hex(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let color = "#";
  for (let j = 0; j < 3; j++) {
    let value = (hash >> (j * 8)) & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

export const avatarSizes = {
  "2xs": 4,
  xs: 5,
  sm: 7,
  md: 9,
  lg: 10,
  xl: 12,
  "2xl": 13,
  full: "full",
};

const useAvatarStyle = ({ size, name, showBorder, borderColor }) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const bg = name ? string2Hex(name) : colors.gray[400];
  const color = name ? (isDarkColor(bg) ? "#fff" : "gray.800") : "#fff";
  const _borderColor = { light: "#fff", dark: "gray.800" };

  const baseProps = {
    display: "inline-flex",
    rounded: "full",
    alignItems: "center",
    flexShrink: "0",
    justifyContent: "center",
    position: "relative",
  };

  return {
    ...baseProps,
    size: avatarSizes[size],
    bg,
    color,
    ...(showBorder && {
      border: "2px",
      borderColor: borderColor || _borderColor[colorMode],
    }),
  };
};

export default useAvatarStyle;
