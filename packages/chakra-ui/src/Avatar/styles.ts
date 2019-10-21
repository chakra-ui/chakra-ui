import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";
import { isDarkColor } from "../theme/colors-utils";
import { Theme } from "../theme";
import { AvatarOptions } from "./Avatar";

// Found this on StackOverflow :)
function string2Hex(str: string): string {
  let hash = 0;
  if (str.length === 0) return hash.toString();
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

export const avatarSizes: Record<string, keyof Theme["sizes"]> = {
  "2xs": "4",
  xs: "6",
  sm: "8",
  md: "12",
  lg: "16",
  xl: "24",
  "2xl": "32",
  full: "full",
};

const useAvatarStyle = ({
  size,
  name,
  showBorder,
  borderColor,
}: AvatarOptions) => {
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
    size: size ? avatarSizes[size] : null,
    bg,
    color,
    ...(showBorder && {
      border: "2px",
      borderColor: borderColor || _borderColor[colorMode],
    }),
  };
};

export default useAvatarStyle;
