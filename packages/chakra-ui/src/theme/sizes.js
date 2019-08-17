const baseSizes = {
  px: "1px",
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "2rem",
  "8": "2.5rem",
  "9": "3rem",
  "10": "4rem",
  "11": "5rem",
  "12": "6rem",
  "13": "8rem",
  "14": "10rem",
  "15": "12rem",
  "16": "14rem",
  "17": "16rem",
  full: "100%",
};

const maxWidths = {
  "3xs": "12rem",
  "2xs": "14rem",
  xs: "16rem",
  sm: "20rem",
  md: "24rem",
  lg: "28rem",
  xl: "32rem",
  "2xl": "36rem",
  "3xl": "42rem",
  "4xl": "48rem",
  "5xl": "56rem",
  "6xl": "64rem",
};

const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

const sizes = {
  ...baseSizes,
  ...maxWidths,
  containers,
};

export default sizes;
