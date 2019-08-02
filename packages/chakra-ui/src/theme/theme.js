import icons from "../IconPaths";
import colors from "./colors";
import sizes from "./sizes";
import typography from "./typography";

const space = [
  "0",
  "0.25rem",
  "0.5rem",
  "0.75rem",
  "1rem",
  "1.25rem",
  "1.5rem",
  "2rem",
  "2.5rem",
  "3rem",
  "4rem",
  "5rem",
  "6rem",
  "8rem",
  "10rem",
  "12rem",
  "14rem",
  "16rem"
];

const shadows = {
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  none: "none"
};

const breakpoints = ["640px", "768px", "1024px", "1280px"];
// aliases
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const zIndices = {
  hide: -1,
  auto: "auto",
  "0": 0,
  "1": 10,
  "2": 20,
  "3": 30,
  "4": 40,
  "5": 50,
  "6": 60,
  "7": 70,
  "8": 80
};

const radii = {
  none: "0",
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.5rem",
  full: "9999px"
};

const opacity = {
  "0": "0",
  "20%": "0.2",
  "40%": "0.4",
  "60%": "0.6",
  "80%": "0.8",
  "100%": "1"
};

const borders = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid"
};

const borderWidths = {
  xl: "2rem",
  lg: "1rem",
  md: "0.5rem",
  sm: "0.25rem",
  xs: "0.125rem",
  "2xs": "0.0625rem",
  none: 0
};

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
  icons
};

export default theme;
