import React from "react";
import css, { get } from "@styled-system/css";
import { Global } from "@emotion/core";
import { ColorModeType } from "./constants";
import { useColorMode } from "./color-mode-provider";

const createColorStyles = (theme: any, colorMode: ColorModeType) => {
  if (!theme.colors) return {};

  const isDark = colorMode === "dark";

  const mx = (str: string) => (isDark ? `__dark.${str}` : str);
  const rx = (str: string) => get(theme, `styles.body.${mx(str)}`);

  return css({
    color: rx("text"),
    bg: rx("background"),
    "*::placeholder": { color: rx("placeholder") },
    "*, *::before, *::after": {
      borderWidth: 0,
      borderStyle: "solid",
      borderColor: rx("border"),
    },
  })(theme);
};

const bodyColor = (colorMode: ColorModeType) => (theme: any) => ({
  body: createColorStyles(theme, colorMode),
});

export const ColorMode = () => {
  const [colorMode] = useColorMode();
  return <Global styles={bodyColor(colorMode)} />;
};
