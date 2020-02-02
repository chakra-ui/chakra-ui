import * as React from "react";
import { useColorMode } from "./color-mode-provider";
import { ThemeContext } from "@emotion/core";

export function useColorModeValue<T>(lightModeValue: T, darkModeValue: T) {
  const [colorMode] = useColorMode();
  const value = { light: lightModeValue, dark: darkModeValue };
  return value[colorMode];
}

export function useChakra<Theme extends object = object>() {
  const [colorMode, setColorMode] = useColorMode();
  const theme = React.useContext(ThemeContext) as Theme;
  return { colorMode, setColorMode, theme };
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
