import { css } from "@emotion/core";
import Color from "color";

export const get = (color: string, hue: string) => `${color}.${hue}`;

export const addOpacity = (color: string, opacity: number) =>
  Color(color)
    .fade(1 - opacity)
    .rgb()
    .string();

export const addWhite = (color: string, opacity: number) => {
  return Color(color)
    .mix(Color("#fff"), opacity)
    .hex();
};

export const addBlack = (color: string, opacity: number) =>
  Color(color)
    .mix(Color("#000"), opacity)
    .hex();

export const isDarkColor = (color: string) => Color(color).isDark();

export const generateAlphaColors = (color: string) => ({
  900: addOpacity(color, 0.92),
  800: addOpacity(color, 0.8),
  700: addOpacity(color, 0.6),
  600: addOpacity(color, 0.48),
  500: addOpacity(color, 0.38),
  400: addOpacity(color, 0.24),
  300: addOpacity(color, 0.16),
  200: addOpacity(color, 0.12),
  100: addOpacity(color, 0.08),
  50: addOpacity(color, 0.04)
});

export const colorEmphasis = (color: string, emphasis: string) => {
  switch (emphasis) {
    case "high":
      return color;
    case "medium":
      return generateAlphaColors(color)[700];
    case "low":
      return generateAlphaColors(color)[500];
    case "lowest":
      return generateAlphaColors(color)[300];
    default:
      return;
  }
};

export const generateStripe = ({
  size = "1rem",
  color = "rgba(255, 255, 255, 0.15)"
}) => css`
  background-image: linear-gradient(
    45deg,
    ${color} 25%,
    transparent 25%,
    transparent 50%,
    ${color} 50%,
    ${color} 75%,
    transparent 75%,
    transparent
  );
  background-size: ${size} ${size};
`;
