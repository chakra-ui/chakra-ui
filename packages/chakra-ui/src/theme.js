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
  colors: {
    transparent: "transparent",

    black: "#000",
    white: "#fff",

    alpha: {
      50: "rgba(255, 255, 255, 0.04)",
      100: "rgba(255, 255, 255, 0.06)",
      200: "rgba(255, 255, 255, 0.08)",
      300: "rgba(255, 255, 255, 0.16)",
      400: "rgba(255, 255, 255, 0.24)",
      500: "rgba(255, 255, 255, 0.36)",
      600: "rgba(255, 255, 255, 0.48)",
      700: "rgba(255, 255, 255, 0.64)",
      800: "rgba(255, 255, 255, 0.80)",
      900: "rgba(255, 255, 255, 0.92)"
    },

    darkAlpha: {
      50: "rgba(26, 32, 44, 0.04)",
      100: "rgba(26, 32, 44, 0.06)",
      200: "rgba(26, 32, 44, 0.08)",
      300: "rgba(26, 32, 44, 0.16)",
      400: "rgba(26, 32, 44, 0.24)",
      500: "rgba(26, 32, 44, 0.36)",
      600: "rgba(26, 32, 44, 0.48)",
      700: "rgba(26, 32, 44, 0.64)",
      800: "rgba(26, 32, 44, 0.80)",
      900: "rgba(26, 32, 44, 0.92)"
    },

    gray: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923"
    },
    red: {
      50: "#fff5f5",
      100: "#fed7d7",
      200: "#feb2b2",
      300: "#fc8181",
      400: "#f56565",
      500: "#e53e3e",
      600: "#c53030",
      700: "#9b2c2c",
      800: "#822727",
      900: "#63171b"
    },
    orange: {
      50: "#FFFAF0",
      100: "#FEEBC8",
      200: "#FBD38D",
      300: "#F6AD55",
      400: "#ED8936",
      500: "#DD6B20",
      600: "#C05621",
      700: "#9C4221",
      800: "#7B341E",
      900: "#652B19"
    },
    yellow: {
      50: "#fffff0",
      100: "#fefcbf",
      200: "#faf089",
      300: "#f6e05e",
      400: "#ecc94b",
      500: "#d69e2e",
      600: "#b7791f",
      700: "#975a16",
      800: "#744210",
      900: "#5F370E"
    },
    green: {
      50: "#f0fff4",
      100: "#c6f6d5",
      200: "#9ae6b4",
      300: "#68d391",
      400: "#48bb78",
      500: "#38a169",
      600: "#2f855a",
      700: "#276749",
      800: "#22543d",
      900: "#1C4532"
    },
    teal: {
      50: "#E6FFFA",
      100: "#B2F5EA",
      200: "#81E6D9",
      300: "#4FD1C5",
      400: "#38B2AC",
      500: "#319795",
      600: "#2C7A7B",
      700: "#285E61",
      800: "#234E52",
      900: "#1D4044"
    },
    blue: {
      50: "#ebf8ff",
      100: "#ceedff",
      200: "#90cdf4",
      300: "#63b3ed",
      400: "#4299e1",
      500: "#3182ce",
      600: "#2a69ac",
      700: "#1e4e8c",
      800: "#153e75",
      900: "#1a365d"
    },
    cyan: {
      50: "#EDFDFD",
      100: "#C4F1F9",
      200: "#9DECF9",
      300: "#76E4F7",
      400: "#0BC5EA",
      500: "#00B5D8",
      600: "#00A3C4",
      700: "#0987A0",
      800: "#086F83",
      900: "#065666"
    },
    purple: {
      50: "#faf5ff",
      100: "#e9d8fd",
      200: "#d6bcfa",
      300: "#b794f4",
      400: "#9f7aea",
      500: "#805ad5",
      600: "#6b46c1",
      700: "#553c9a",
      800: "#44337a",
      900: "#322659"
    },
    pink: {
      50: "#fff5f7",
      100: "#fed7e2",
      200: "#fbb6ce",
      300: "#f687b3",
      400: "#ed64a6",
      500: "#d53f8c",
      600: "#b83280",
      700: "#97266d",
      800: "#702459",
      900: "#521B41"
    },
    linkedin: {
      50: "#E8F4F9",
      100: "#CFEDFB",
      200: "#9BDAF3",
      300: "#68C7EC",
      400: "#34B3E4",
      500: "#00A0DC",
      600: "#008CC9",
      700: "#0077B5",
      800: "#005E93",
      900: "#004471"
    },
    facebook: {
      50: "#E8F4F9",
      100: "#D9DEE9",
      200: "#B7C2DA",
      300: "#6482C0",
      400: "#4267B2",
      500: "#385898",
      600: "#314E89",
      700: "#29487D",
      800: "#223B67",
      900: "#1E355B"
    },
    messenger: {
      50: "#D0E6FF",
      100: "#B9DAFF",
      200: "#A2CDFF",
      300: "#7AB8FF",
      400: "#2E90FF",
      500: "#0078FF",
      600: "#0063D1",
      700: "#0052AC",
      800: "#003C7E",
      900: "#002C5C"
    },
    whatsapp: {
      50: "#e2f7f4",
      100: "#c3f0e9",
      200: "#a0e7dc",
      300: "#76dccd",
      400: "#43cfba",
      500: "#00BFA5",
      600: "#00ac92",
      700: "#009780",
      800: "#007d6a",
      900: "#005a4c"
    },
    twitter: {
      50: "#e5f4fd",
      100: "#c8e9fb",
      200: "#a8dcfa",
      300: "#83cdf7",
      400: "#57bbf5",
      500: "#1DA1F2",
      600: "#1a94da",
      700: "#1681bf",
      800: "#136b9e",
      900: "#0d4d71"
    },
    telegram: {
      50: "#e3f2f9",
      100: "#c5e4f3",
      200: "#a2d4ec",
      300: "#7ac1e4",
      400: "#47a9da",
      500: "#0088CC",
      600: "#007ab8",
      700: "#006ba1",
      800: "#005885",
      900: "#003f5e"
    }
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeights: {
    none: "1",
    shorter: "1.25",
    short: "1.375",
    normal: "1.5",
    tall: "1.625",
    taller: "2"
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  fonts: {
    display: "Graphik",
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem"
  },
  sizes: {
    "0": "0",
    auto: "auto",
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
    full: "100%",
    screenWidth: "100vw",
    screenHeight: "100vh",
    container: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
    button: {
      lg: {
        height: 40,
        fontSize: 16,
        paddingLeft: 16,
        paddingRight: 16,
        minWidth: 40
      },
      md: {
        height: 32,
        fontSize: 14,
        paddingLeft: 12,
        paddingRight: 12,
        minWidth: 32
      },
      sm: {
        height: 24,
        fontSize: 14,
        paddingLeft: 8,
        paddingRight: 8,
        minWidth: 24
      }
    },
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
    avatar: {
      xs: "1.25rem",
      sm: "2rem",
      md: "3.25rem",
      lg: "4.5rem",
      xl: "5.25rem"
    },
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
        thumb: 16,
        trackHeight: 4
      },
      md: {
        thumb: 14,
        trackHeight: 4
      },
      sm: {
        thumb: 10,
        trackHeight: 2
      }
    },
    closeButton: {
      sm: "0.5rem",
      md: "0.8rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2.25rem"
    }
  },
  borders: { none: 0, "1px": "1px solid", "2px": "2px solid" },
  shadows: {
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    focusring: "0 0 0 3px rgba(66, 153, 225, 0.5)",
    modal: {
      dark:
        "0 7px 14px 0 rgba(60, 66, 87, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07)",
      light:
        "rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 5px 10px, rgba(15, 15, 15, 0.2) 0px 15px 40px"
    },
    none: "none"
  },
  space: [
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
  ]
};

export default theme;
