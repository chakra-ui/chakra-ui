export const baseSizes = {
  px: "1px",
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "32": "8rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
};

export type BaseSizes = typeof baseSizes;

const largeSizes = {
  full: "100%",
  "3xs": "14rem",
  "2xs": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
};

const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

// Actual stripe
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

const sizes = {
  ...baseSizes,
  ...largeSizes,
  containers,
};

export type Sizes = typeof baseSizes &
  typeof largeSizes & { containers: typeof containers };

export default sizes;
