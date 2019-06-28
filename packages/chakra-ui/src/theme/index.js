import iconPaths from "../IconPaths";
import colors from "./colors";
import sizes from "./sizes";
import typography from "./typography";

const spacing = [
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

const boxShadows = {
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  focusring: "0 0 0 2px rgba(66, 153, 225, 0.4)",
  modal: {
    dark: "0 7px 14px 0 rgba(60, 66, 87, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07)",
    light:
      "rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 5px 10px, rgba(15, 15, 15, 0.2) 0px 15px 40px"
  },
  none: "none"
};

const theme = {
  breakpoints: ["640px", "768px", "1024px", "1280px"],
  zIndices: {
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
  },
  radii: {
    none: "0",
    sm: "2px",
    md: "4px",
    lg: "8px",
    round: "9999px"
  },
  opacity: {
    "0": 0,
    "25%": 0.25,
    "50%": 0.5,
    "75%": 0.75,
    "100%": 1
  },
  borders: { none: 0, "1px": "1px solid", "2px": "2px solid" },
  colors,
  ...typography,
  sizes,
  shadows: boxShadows,
  space: spacing,
  icons: iconPaths
};

export default theme;
