import icons from "../Icon/IconPaths";
import colors, { Colors } from "./colors";
import sizes, { baseSizes, Sizes, BaseSizes } from "./sizes";
import typography, { Typography } from "./typography";

const space = baseSizes;

const shadows = {
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  none: "none",
};

export type Shadows = typeof shadows;

const breakpoints: any = ["30em", "48em", "62em", "80em"];

// aliases
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

type StringOrNumber = string | number;

export interface ZIndices {
  hide: StringOrNumber;
  auto: StringOrNumber;
  base: StringOrNumber;
  docked: StringOrNumber;
  dropdown: StringOrNumber;
  sticky: StringOrNumber;
  banner: StringOrNumber;
  overlay: StringOrNumber;
  modal: StringOrNumber;
  popover: StringOrNumber;
  skipLink: StringOrNumber;
  toast: StringOrNumber;
  tooltip: StringOrNumber;
}

const zIndices: ZIndices = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

const radii = {
  none: "0",
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.5rem",
  full: "9999px",
};

export type Radii = typeof radii;

const opacity = {
  "0": "0",
  "20%": "0.2",
  "40%": "0.4",
  "60%": "0.6",
  "80%": "0.8",
  "100%": "1",
};

export type Opacity = typeof opacity;

interface Borders {
  none: StringOrNumber;
  "1px": StringOrNumber;
  "2px": StringOrNumber;
  "4px": StringOrNumber;
}

const borders: Borders = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid",
};

// const borderWidths = {
//   xl: "2rem",
//   lg: "1rem",
//   md: "0.5rem",
//   sm: "0.25rem",
//   xs: "0.125rem",
//   "2xs": "0.0625rem",
//   none: 0
// };

export type Icons = keyof typeof icons;

export type Icon = {
  path: JSX.Element;
  viewBox?: string;
};

export interface Theme extends Typography {
  breakpoints: any;
  zIndices: ZIndices;
  radii: Radii;
  opacity: Opacity;
  borders: Borders;
  colors: Colors;
  sizes: Sizes;
  shadows: Shadows;
  space: BaseSizes;
  icons: { [key in Icons]: Icon };
}

const theme = {
  breakpoints,
  zIndices,
  radii,
  opacity,
  borders,
  colors,
  ...typography,
  sizes,
  shadows,
  space,
  icons,
};

export default theme;
