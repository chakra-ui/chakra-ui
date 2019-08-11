// TODO: Let the spacing a follow multiples of 8

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

const components = {
  switch: {
    sm: {
      width: "1.375rem",
      height: "0.75rem",
    },
    md: {
      width: "1.875rem",
      height: "1rem",
    },
    lg: {
      width: "2.875rem",
      height: "1.5rem",
    },
  },
  tab: {
    sm: {
      padding: "0.25rem 1rem",
      fontSize: "0.85rem",
    },
    md: {
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    lg: {
      fontSize: "1.15rem",
      padding: "0.75rem 1rem",
    },
  },
};

const sizes = {
  ...baseSizes,
  ...components,
  ...maxWidths,
  containers,
};

export default sizes;
