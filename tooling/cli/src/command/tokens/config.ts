import { ThemeKeyOptions } from "./create-theme-typings-interface"

export const themeKeyConfiguration: ThemeKeyOptions[] = [
  { key: "borders" },
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
  { key: "textStyles" },
  { key: "transition" },
  { key: "zIndices" },
]
