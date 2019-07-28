const baseSizes = {
  px: "1px",
  "0": "0",
  auto: "auto",
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
  full: "100%",
  screenHeight: "100vh",
  screenWidth: "100vw"
};

const maxWidths = {
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem"
};

const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
};

const components = {
  spinner: {
    xl: "2.5rem",
    lg: "1.75rem",
    md: "1.25rem",
    sm: "1rem",
    xs: "0.75rem"
  },
  progressbar: {
    lg: "1rem",
    md: "0.75rem",
    sm: "0.5rem"
  },
  closeButton: {
    sm: "0.5rem",
    md: "0.8rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2.25rem"
  },
  switch: {
    sm: {
      width: "1.375rem",
      height: "0.75rem"
    },
    md: {
      width: "1.875rem",
      height: "1rem"
    },
    lg: {
      width: "2.875rem",
      height: "1.5rem"
    }
  },
  tab: {
    sm: {
      padding: "0.25rem 1rem",
      fontSize: "0.85rem"
    },
    md: {
      fontSize: "1rem",
      padding: "0.5rem 1rem"
    },
    lg: {
      fontSize: "1.15rem",
      padding: "0.75rem 1rem"
    }
  }
};

const sizes = {
  ...baseSizes,
  ...components,
  ...maxWidths,
  containers
};

export default sizes;
