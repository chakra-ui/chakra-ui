import { colors } from "./color";

const shadows = {
  keyline: "0 0 0 1px #e3e8ee",
  sm: " 0 2px 5px 0 rgba(60,66,87, .12), 0 1px 1px 0 rgba(0,0,0, .12)",
  md: "0 7px 14px 0 rgba(60,66,87, .12), 0 3px 6px 0 rgba(0,0,0, .12)",
  lg: "0 15px 35px 0 rgba(60,66,87, .12), 0 5px 15px 0 rgba(0,0,0, .12)",
  xl:
    "0 50px 100px 0 rgba(60,66,87, .12), 0 15px 35px 0 rgba(60,66,87, .12), 0 5px 15px 0 rgba(0,0,0, .12)",
  focusring:
    " 0 0 0 4px rgba(58,151,212, .28), 0 0 1px 1px rgba(7,89,150, .36)",
};

const radii = {
  md: "4px",
  circle: "50%",
};

const maxWidths = {
  sm: "320px",
  md: "448px",
  lg: "600px",
  xl: "720px",
  "2xl": "896px",
};

const height = {
  xl: "44px",
  lg: "36px",
  md: "28px",
  sm: "24px",
  xs: "20px",
};

const space = [
  "2px",
  "4px",
  "6px",
  "8px",
  "12px",
  "16px",
  "20px",
  "24px",
  "32px",
  "48px",
  "64px",
];

const components = {
  Avatar: {
    sm: "16px",
    md: "20px",
    lg: "28px",
    xl: "32px",
    "2xl": "42px",
  },
  Spinner: {
    sm: "12px",
    md: "16px",
    lg: "24px",
  },
  ModalOverlay: {
    bg: "rgba(82, 95, 127, .25)",
  },
};

const theme = {
  radii,
  colors,
  shadows,
  components,
  maxWidths,
};

export default theme