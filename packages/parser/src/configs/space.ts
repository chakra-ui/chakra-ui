import { createParser } from "../create-parser"
import { ConfigObject, positiveOrNegative } from "../utils"

const defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
}

const shared = {
  scale: "space",
  fallbackScale: defaults.space,
}

const configs: ConfigObject = {
  margin: {
    property: "margin",
    transform: positiveOrNegative,
    ...shared,
  },
  m: {
    property: "margin",
    transform: positiveOrNegative,
    ...shared,
  },
  marginTop: {
    property: "marginTop",
    transform: positiveOrNegative,
    ...shared,
  },
  mt: {
    property: "marginTop",
    transform: positiveOrNegative,
    ...shared,
  },
  marginRight: {
    property: "marginRight",
    transform: positiveOrNegative,
    ...shared,
  },
  mr: {
    property: "marginRight",
    transform: positiveOrNegative,
    ...shared,
  },
  marginBottom: {
    property: "marginBottom",
    transform: positiveOrNegative,
    ...shared,
  },
  mb: {
    property: "marginBottom",
    transform: positiveOrNegative,
    ...shared,
  },
  marginLeft: {
    property: "marginLeft",
    transform: positiveOrNegative,
    ...shared,
  },
  ml: {
    property: "marginLeft",
    transform: positiveOrNegative,
    ...shared,
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative,
    ...shared,
  },
  mx: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative,
    ...shared,
  },
  marginY: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative,
    ...shared,
  },
  my: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative,
    ...shared,
  },
  padding: {
    property: "padding",
    ...shared,
  },
  p: {
    property: "padding",
    ...shared,
  },
  paddingTop: {
    property: "paddingTop",
    ...shared,
  },
  pt: {
    property: "paddingTop",
    ...shared,
  },
  paddingRight: {
    property: "paddingRight",
    ...shared,
  },
  pr: {
    property: "paddingRight",
    ...shared,
  },
  paddingBottom: {
    property: "paddingBottom",
    ...shared,
  },
  pb: {
    property: "paddingBottom",
    ...shared,
  },
  paddingLeft: {
    property: "paddingLeft",
    ...shared,
  },
  pl: {
    property: "paddingLeft",
    ...shared,
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    ...shared,
  },
  px: {
    properties: ["paddingLeft", "paddingRight"],
    ...shared,
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    ...shared,
  },
  py: {
    properties: ["paddingTop", "paddingBottom"],
    ...shared,
  },
}

/**
 * Converts shorthand or longhand margin and padding props to margin and padding CSS declarations
 *
 * - Numbers from 0-4 (or the length of theme.space) are converted to values on the spacing scale.
 * - Negative values can be used for negative margins.
 * - Numbers greater than the length of the theme.space array are converted to raw pixel values.
 * - String values are passed as raw CSS values.
 * - Array values are converted into responsive values.
 */
export const space = createParser(configs)
