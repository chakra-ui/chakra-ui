import { useTheme, useUIMode } from "../ThemeProvider";
import { isDarkColor } from "../theme/colors.utils";

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

const useAvatarStyle = props => {
  const { colors } = useTheme();
  const { mode } = useUIMode();
  const { size, name, showBorder } = props;

  const _sizes = {
    xs: 5,
    sm: 6,
    md: 10,
    lg: 12,
    xl: 16,
    "2xl": 24
  };

  const bg = name ? string2Hex(name) : colors.gray[400];
  const color = name ? (isDarkColor(bg) ? "#fff" : "gray.800") : "#fff";

  const baseProps = {
    display: "inline-flex",
    borderRadius: "9999px",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  };

  return {
    ...baseProps,
    size: _sizes[size],
    bg,
    color,
    ...(showBorder && {
      border: "2px",
      borderColor: mode === "dark" ? "#121212" : "#fff"
    })
  };
};

export default useAvatarStyle;
