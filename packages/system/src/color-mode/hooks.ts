import * as React from "react";
import { useColorMode } from "./color-mode-provider";
import { ThemeContext } from "@emotion/core";

export function useModeValue(lightModeValue: any, darkModeValue: any) {
  const [colorMode] = useColorMode();
  const value = { light: lightModeValue, dark: darkModeValue };
  return value[colorMode];
}

export function useChakra() {
  const [colorMode, setColorMode] = useColorMode();
  const theme = React.useContext(ThemeContext);
  return { colorMode, setColorMode, theme };
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
