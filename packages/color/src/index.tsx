import tiny from "tinycolor2";
import * as SS from "@styled-system/css";

export const getColor = (theme: object, color: string): string =>
  SS.get(theme, `colors.${color}`, color);

const get = getColor;

export const isDark = (color: string) => (theme: object) =>
  tiny(get(theme, color)).isDark();

export const isLight = (color: string) => (theme: object) =>
  tiny(get(theme, color)).isLight();

export const addOpacity = (color: string, opacity: number) => (theme: object) =>
  tiny(get(theme, color))
    .setAlpha(opacity)
    .toRgbString();

export const mixWithWhite = (color: string, amount: number) => (
  theme: object,
) => tiny.mix(get(theme, color), "#fff", amount).toHexString();

export const mixWithBlack = (color: string, amount: number) => (
  theme: object,
) => tiny.mix(get(theme, color), "#000", amount).toHexString();

export const darken = (color: string, amount: number) => (theme: object) =>
  tiny(get(theme, color))
    .darken(amount)
    .toHexString();

export const lighten = (color: string, amount: number) => (theme: object) =>
  tiny(get(theme, color))
    .lighten(amount)
    .toHexString();

export const getContrastRatio = (fg: string, bg: string) => (theme: object) =>
  tiny.readability(get(theme, bg), get(theme, fg));

export const passWCAGRequirement = (fg: string, bg: string) => (
  theme: object,
) => tiny.isReadable(get(theme, bg), get(theme, fg));

export const getRandomColor = () => tiny.random().toHexString();

export const getComplementary = (color: string) => (theme: object) =>
  tiny(get(theme, color))
    .complement()
    .toHexString();

export const generateStripe = (
  size = "1rem",
  color = "rgba(255, 255, 255, 0.15)",
) => ({
  backgroundImage: `linear-gradient(
    45deg,
    ${color} 25%,
    transparent 25%,
    transparent 50%,
    ${color} 50%,
    ${color} 75%,
    transparent 75%,
    transparent
  )`,
  backgroundSize: `${size} ${size}`,
});

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
  50: addOpacity(color, 0.04),
});

export const colorEmphasis = (
  color: string,
  emphasis: "high" | "medium" | "low",
) =>
  ({
    high: color,
    medium: generateAlphaColors(color)[700],
    low: generateAlphaColors(color)[500],
    lowest: generateAlphaColors(color)[300],
  }[emphasis]);

export const stringToColor = (str: string) => {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let color = "#";
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};
