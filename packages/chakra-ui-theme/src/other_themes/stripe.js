const colors = {
  gray: {
    900: "#1a1f36",
    800: "#2a2f45",
    700: "#3c4257",
    600: "#4f566b",
    500: "#697386",
    400: "#8792a2",
    300: "#a3acb9",
    200: "#c1c9d2",
    100: "#e3e8ee",
    50: "#f7fafc",
  },
  blue: {
    900: "#131f41",
    800: "#212d63",
    700: "#2f3d89",
    600: "#3d4eac",
    500: "#556cd6",
    400: "#6c8eef",
    300: "#7dabf8",
    200: "#a4cdfe",
    100: "#d6ecff",
    50: "#f5fbff",
  },
  cyan: {
    900: "#042235",
    800: "#093353",
    700: "#06457a",
    600: "#075996",
    500: "#067ab8",
    400: "#3a97d4",
    300: "#4db7e8",
    200: "#7fd3ed",
    100: "#c4f1f9",
    50: "#edfdfd",
  },
  green: {
    900: "#082429",
    800: "#0b3733",
    700: "#0d4b3b",
    600: "#0e6245",
    500: "#09825d",
    400: "#1ea672",
    300: "#33c27f",
    200: "#85d996",
    100: "#cbf4c9",
    50: "#efffed",
  },
  orange: {
    900: "#420e11",
    800: "#5d161b",
    700: "#7e1e23",
    600: "#9e2f28",
    500: "#c44c34",
    400: "#e56f4a",
    300: "#f5925e",
    200: "#f8b886",
    100: "#fee3c0",
    50: "#fffaee",
  },
  purple: {
    900: "#2d0f55",
    800: "#401d6a",
    700: "#5b2b80",
    600: "#7b3997",
    500: "#a450b5",
    400: "#c96ed0",
    300: "#e28ddc",
    200: "#f0b4e4",
    100: "#fce0f6",
    50: "#fff8fe",
  },
  red: {
    900: "#420828",
    800: "#5e1039",
    700: "#80143f",
    600: "#a41c4e",
    500: "#cd3d64",
    400: "#ed5f74",
    300: "#fa8389",
    200: "#fbb5b2",
    100: "#fde2dd",
    50: "#fff8f5",
  },
  yellow: {
    900: "#3a1607",
    800: "#571f0d",
    700: "#762b0b",
    600: "#983705",
    500: "#bb5504",
    400: "#d97917",
    300: "#e5993e",
    200: "#efc078",
    100: "#f8e5b9",
    50: "#fcf9e9",
  },
  violet: {
    900: "#1f184e",
    800: "#352465",
    700: "#4b3480",
    600: "#61469b",
    500: "#8260c3",
    400: "#9c82db",
    300: "#b0a1e1",
    200: "#c7c2ea",
    100: "#e6e6fc",
    50: "#f8f9fe",
  },
};

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

const lineHeights = [
  "16px",
  "20px",
  "24px",
  "28px",
  "32px",
  "40px",
  "56px",
  "64px",
];
const fontSizes = [
  "11px",
  "12px",
  "13px",
  "14px",
  "15px",
  "16px",
  "20px",
  "24px",
  "32px",
  "48px",
  "56px",
];
const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
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

export default {
  colors,
  shadows,
};
