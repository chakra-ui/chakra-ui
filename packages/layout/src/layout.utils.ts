import { __DEV__, isArray, get as getFromTheme } from "@chakra-ui/utils"

type Breakpoints = { [key: string]: string }

function convertBreakpointsIntoArray(breakpoints: Breakpoints): string[] {
  return Object.keys(breakpoints)
    .sort((a, b) => parseInt(breakpoints[a]) - parseInt(breakpoints[b]))
    .map(key => breakpoints[key])
}

/**
 * convertToArray takes a given style property, like `lineHeight`, and converts it into an
 * equivalent styled-system responsive array
 *
 * @param theme - the styled-system theme object
 * @param value - the style value to convert to an array
 *
 * @example Examples can be found in the associated test file
 */
export function convertToArray<T>(
  theme: object,
  value: T | T[] | { [key: string]: T },
): T[] {
  const breakpoints: Breakpoints = getFromTheme(theme, "breakpoints")

  if (isArray(value)) {
    return value
  } else if (value === undefined) {
    return []
  } else if (typeof value === "object") {
    if (__DEV__) {
      // Perform some extra checks in development mode
      if (isArray(breakpoints)) {
        throw new Error(
          "When using `isBaselineCropped`, you must define your breakpoints as an object.",
        )
      }
      const breakpointUnits = Object.keys(breakpoints).map(key =>
        breakpoints[key].replace(/^\d+/, ""),
      )
      if (!breakpointUnits.every(unit => unit === breakpointUnits[0])) {
        throw new Error(
          `
          When using isBaselineCropped, you must define every breakpoint using the same unit.

          You provided the following breakpoints: ${JSON.stringify(breakpoints)}
          We calculated these units "${breakpointUnits}" which are not all the same.
          `,
        )
      }
    }
    // In order for the text crop feature to work, we must know the _order_ of the breakpoints,
    // so we convert the object breakpoints into
    const breakpointArray = convertBreakpointsIntoArray(breakpoints)

    /* If we receive a styled-system responsive style object, we want to manually convert it into
     an equivalent styled-system responsive style array */
    const breakpointKeys = Object.keys(value)
    const breakpointIndices = breakpointKeys.map(breakpoint =>
      breakpointArray.indexOf(breakpoints[breakpoint]),
    )
    const highestBreakpointIndex = Math.max(...breakpointIndices)
    const result: T[] = new Array(highestBreakpointIndex + 1).fill(null)
    breakpointKeys.forEach(breakpoint => {
      const i = breakpointArray.indexOf(breakpoints[breakpoint])
      result[i] = (value as { [key: string]: T })[breakpoint]
    })
    return result
  } else {
    return [value]
  }
}

export type LineHeight =
  | number
  | string
  | (string | number | null)[]
  | { [key: string]: string | number }
  | undefined

export type FontFamily =
  | string
  | (string | null)[]
  | { [key: string]: string }
  | undefined

const DEFAULT_LINE_HEIGHT = 1.2
const DEFAULT_FONT_FAMILY = "body"

function preprocessLineHeight(
  theme: object,
  rawLineHeight: number | string | null | undefined = DEFAULT_LINE_HEIGHT,
): number | null {
  const invalidLineHeight = () => {
    if (__DEV__) {
      throw new Error(
        `When using the "isBaselineCropped" prop, you must only use numeric values for line-height or the string "normal".`,
      )
    }
  }

  if (typeof rawLineHeight === "undefined") {
    return DEFAULT_LINE_HEIGHT
  } else if (rawLineHeight === null) {
    return null
  }

  // Perform a theme lookup if the value is a string
  const lineHeight =
    typeof rawLineHeight === "string"
      ? getFromTheme(theme, `lineHeights.${rawLineHeight}`)
      : rawLineHeight

  if (typeof lineHeight === "undefined") {
    invalidLineHeight()
  }

  /*
  This is a compromise in order to make this feature function. Without performing this default for the "normal" value,
  we are unable to correctly calculate the necessary crop values.
   */
  if (lineHeight === "normal") {
    return DEFAULT_LINE_HEIGHT
  }

  /*
  We require all values to be numeric in order to perform the calculations. This is recommended practice anyways,
  so the sacrifice is small.
  */
  if (typeof lineHeight === "string") {
    const parsed = parseFloat(lineHeight)

    /*
    If we are unable to parse, we provide a reasonable default for production, and throw an error in development
    */

    if (isNaN(parsed)) {
      invalidLineHeight()
      return DEFAULT_LINE_HEIGHT
    }

    return parsed
  }

  return lineHeight
}

interface TextCropValues {
  topCrop: number
  bottomCrop: number
}

function calculateTextCrop(
  theme: object,
  { lineHeight, fontFamily }: { lineHeight: number | null; fontFamily: string },
): TextCropValues | null {
  if (lineHeight === null) return null

  const baselineCropSettings = getFromTheme(theme, `baselineCrop.${fontFamily}`)

  if (!baselineCropSettings) {
    // TODO link directly to the page where we can perform those measurements
    if (__DEV__) {
      throw new Error(`
      In order to use the baselineCrop prop, you must manually add baselineCrop settings into your theme file.
      See the Text docs on the Chakra-ui website for instructions on how to measure these settings.
      `)
    }
  }
  const { topCrop, bottomCrop } = baselineCropSettings
  const cropFontSize = 41
  const cropLineHeight = 1.2

  const dynamicTopCrop: number =
    Math.max(topCrop + (lineHeight - cropLineHeight) * (cropFontSize / 2), 0) /
    cropFontSize
  const dynamicBottomCrop: number =
    Math.max(
      bottomCrop + (lineHeight - cropLineHeight) * (cropFontSize / 2),
      0,
    ) / cropFontSize

  return {
    bottomCrop: dynamicBottomCrop,
    topCrop: dynamicTopCrop,
  }
}

export function fillArray<T>(values: T[], length: number): T[] {
  const result = []
  let mostRecentValue = values[0]

  if (values.length === 0) return new Array(length).fill(null)

  for (let i = 0; i < length; i++) {
    const current = values[i]

    if (mostRecentValue === null) {
      if (current !== null) {
        mostRecentValue = current
      }
      result.push(current)
      continue
    }
    if (current === null || typeof current === "undefined") {
      result.push(mostRecentValue)
    } else {
      mostRecentValue = current
      result.push(current)
    }
  }

  return result
}

/**
 * calculateBaselineCrop is a hook designed to remove the extra whitespace above a text node's cap height,
 * in addition to removing the space beneath the baseline.
 *
 * For more information about "cap height" and "baseline" see: https://en.wikipedia.org/wiki/Cap_height
 * and https://en.wikipedia.org/wiki/Baseline_(typography)
 *
 * See the `Text` component for an example implementation
 *
 * @param props.lineHeight - CSS line-height value with restricted types
 *
 * @returns textNodeProps - Apply these props directly to the text node you want to clip
 * @returns beforeElementStyles - Create a `<Box as="span" ... />` inside of the text node, as the first child, and spread these props
 */
export function calculateBaselineCrop(
  theme: object,
  props: {
    lineHeight?: LineHeight
    fontFamily?: FontFamily
  },
) {
  // Transform single values into singleton arrays
  const unprocessedLineHeights = convertToArray(
    theme,
    props.lineHeight ?? DEFAULT_LINE_HEIGHT,
  )
  const unprocessedFontFamilies = convertToArray(theme, props.fontFamily)

  // Turn all line heights into numbers (look up string values from the theme)
  let processedLineHeights = unprocessedLineHeights.map(rawLineHeight =>
    preprocessLineHeight(theme, rawLineHeight),
  )

  const longestStyleArray = Math.max(
    unprocessedFontFamilies.length,
    processedLineHeights.length,
  )

  // fill in all nulls into the font-family array such that we have the same number of line-heights and font-families
  const processedFontFamilies = fillArray(
    unprocessedFontFamilies,
    longestStyleArray,
  ).map(family => family ?? DEFAULT_FONT_FAMILY)

  // fill in all nulls into the line-height array such that we have the same number of line-heights and font-families
  processedLineHeights = fillArray(processedLineHeights, longestStyleArray).map(
    lineHeight => lineHeight ?? DEFAULT_LINE_HEIGHT,
  )

  // Calculate the number of pixels needed to crop from the top/bottom of the text
  const textCropValues = processedLineHeights.map((lineHeight, index) => {
    const fontFamily =
      processedFontFamilies[Math.min(processedFontFamilies.length - 1, index)]

    return calculateTextCrop(theme, {
      lineHeight,
      fontFamily: fontFamily,
    })
  })

  return {
    lineHeight: processedLineHeights,
    transform: textCropValues.map(values =>
      values ? `translateY(${values.bottomCrop.toFixed(5)}em)` : null,
    ),
    before: {
      content: '""',
      display: "block",
      marginBottom: textCropValues.map(values =>
        values ? `-${(values.topCrop + values.bottomCrop).toFixed(5)}em` : null,
      ),
    },
  }
}
