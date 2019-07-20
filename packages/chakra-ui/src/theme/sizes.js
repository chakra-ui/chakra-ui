const baseSize = 8; // => 8px

// 14px is the root font-size
const getRem = pxValue => `${pxValue / 14}rem`;

const avatarSizes = {
  xs: getRem(baseSize * 2),
  sm: getRem(baseSize * 3),
  md: getRem(baseSize * 4),
  lg: getRem(baseSize * 5),
  xl: getRem(baseSize * 8),
  xxl: getRem(baseSize * 12)
};

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
  checkbox: {
    lg: "20px",
    md: "16px",
    sm: "14px"
  },
  spinner: {
    xl: "2.5rem",
    lg: "1.75rem",
    md: "1.25rem",
    sm: "1rem",
    xs: "0.75rem"
  },
  avatar: avatarSizes,
  progressbar: {
    lg: "1rem",
    md: "0.75rem",
    sm: "0.5rem"
  },
  input: {
    lg: {
      fontSize: 16,
      paddingLeft: 14,
      paddingRight: 14,
      height: 40,
      lineHeight: "24px",
      borderRadius: 4
    },
    md: {
      fontSize: 14,
      paddingLeft: 12,
      paddingRight: 12,
      height: 32,
      lineHeight: "20px",
      borderRadius: 3
    },
    sm: {
      fontSize: 12,
      height: 24,
      lineHeight: "16px",
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 2
    }
  },
  slider: {
    lg: {
      thumb: "16px",
      trackHeight: "4px"
    },
    md: {
      thumb: "14px",
      trackHeight: "4px"
    },
    sm: {
      thumb: "10px",
      trackHeight: "2px"
    }
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
