export const typography = {
  fontWeights: { regular: 400, medium: 500, bold: 700 },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `-apple-system , BlinkMacSystemFont , "Segoe UI" , "Roboto" , "Helvetica Neue" , "Ubuntu" , sans-serif`,
    mono: `"Menlo" , "Consolas" , monospace`,
  },
  fontSizes: [
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
  ],
  lineHeights: ["16px", "20px", "24px", "28px", "32px", "40px", "56px", "64px"],
}

const numericSpacing = {
  proportional: {
    fontFeatureSettings: "pnum",
    fontVariant: "proportional-nums",
  },
  tabular: {
    fontFeatureSettings: "tnum",
    fontVariant: "tabular-nums",
  },
}

export type Typography = typeof typography

export default typography
