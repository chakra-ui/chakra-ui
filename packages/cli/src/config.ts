import { ThemeKeyOptions } from "./create-theme-typings-interface.js"

export const themeKeyConfiguration: ThemeKeyOptions[] = [
  { key: "blur" },
  { key: "borders" },
  { key: "borderStyles" },
  { key: "borderWidths" },
  { key: "breakpoints", filter: (value) => Number.isNaN(Number(value)) },
  { key: "colors", maxScanDepth: 3 },
  { key: "fonts" },
  { key: "fontSizes" },
  { key: "fontWeights" },
  { key: "letterSpacings" },
  { key: "lineHeights" },
  { key: "radii" },
  { key: "shadows" },
  { key: "sizes", maxScanDepth: 2 },
  { key: "space", flatMap: (value) => [value, `-${value}`] },
  { key: "transition" },
  { key: "zIndices" },
  { key: "conditions", flatMap: (value) => [`_${value}`] },
]
