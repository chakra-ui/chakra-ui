import { __DEV__, get as getFromTheme } from "@chakra-ui/utils"
import { convertToArray } from "./baselineCrop/breakpoint.utils"

export type Breakpoints = { [key: string]: string }

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

// If baselineCrop is enabled, and the user does not explicitly pass a line height or font family, we will use these values
const DEFAULT_LINE_HEIGHT = 1.2
const DEFAULT_FONT_FAMILY = "body"

// Used for measuring the baseline crop settings
const DEFAULT_CROP_FONT_SIZE = 48
const DEFAULT_CROP_LINE_HEIGHT = 1.2

function preprocessLineHeight(
  theme: object,
  rawLineHeight: number | string | null | undefined = DEFAULT_LINE_HEIGHT,
): number | null {
  const handleInvalidLineHeight = () => {
    if (__DEV__) {
      throw new Error(
        `When using the "isBaselineCropped" prop, you must only use numeric values for line-height or the string "normal".`,
      )
    }
  }

  if (typeof rawLineHeight === "undefined") {
    return DEFAULT_LINE_HEIGHT
  }

  if (rawLineHeight === null) {
    return null
  }

  // Perform a theme lookup if the value is a string
  const lineHeight =
    typeof rawLineHeight === "string"
      ? getFromTheme(theme, `lineHeights.${rawLineHeight}`)
      : rawLineHeight

  if (typeof lineHeight === "undefined") {
    handleInvalidLineHeight()
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
      handleInvalidLineHeight()
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

function getBaselineCropSettings(theme: object, fontFamily: string) {
  const baselineCropSettings = getFromTheme(theme, `baselineCrop.${fontFamily}`)

  if (!baselineCropSettings) {
    if (__DEV__) {
      throw new Error(`
      In order to use the baselineCrop prop, you must manually add baselineCrop measurements into your theme file.
      See the Text docs on the Chakra-ui website for instructions on how to measure a font: https://chakra-ui.com/text
      `)
    }
  }

  return {
    ...baselineCropSettings,
    cropFontSize: DEFAULT_CROP_FONT_SIZE,
    cropLineHeight: DEFAULT_CROP_LINE_HEIGHT,
  }
}

function calculateTextCrop(
  theme: object,
  { lineHeight, fontFamily }: { lineHeight: number | null; fontFamily: string },
): TextCropValues | null {
  if (lineHeight === null) return null

  const {
    topCrop,
    bottomCrop,
    cropFontSize,
    cropLineHeight,
  } = getBaselineCropSettings(theme, fontFamily)

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

/**
 * Takes a responsive style array and fills in implicit nulls with explicit values.
 *
 * @param values - array of any values, may contain nulls
 * @param length - the desired length of the resulting array
 *
 * @example fillResponsiveArray([1, null]) // [1, 1]
 * @example fillResponsiveArray([1, null, 2]) // [1, 1, 2]
 * @example fillResponsiveArray([null, 2]) // [null, 2]
 * @example fillResponsiveArray([1, null, null, 2, null]) // [1, 1, 1, 2, 2]
 */
export function fillResponsiveArray<T>(values: T[], length: number): T[] {
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
  // Normalize lineHeight and fontFamily props into comparable structures
  let lineHeightResponsiveArray = convertToArray(
    theme,
    props.lineHeight ?? DEFAULT_LINE_HEIGHT,
  ).map(rawLineHeight => preprocessLineHeight(theme, rawLineHeight))
  const fontFamilyResponsiveArray = convertToArray(theme, props.fontFamily)

  const longestStyleArray = Math.max(
    fontFamilyResponsiveArray.length,
    lineHeightResponsiveArray.length,
  )

  // fill in all nulls into the font-family array such that we have the same number of line-heights and font-families
  const processedFontFamilies = fillResponsiveArray(
    fontFamilyResponsiveArray,
    longestStyleArray,
  ).map(family => family ?? DEFAULT_FONT_FAMILY)

  // fill in all nulls into the line-height array such that we have the same number of line-heights and font-families
  lineHeightResponsiveArray = fillResponsiveArray(
    lineHeightResponsiveArray,
    longestStyleArray,
  ).map(lineHeight => lineHeight ?? DEFAULT_LINE_HEIGHT)

  // Calculate the number of pixels needed to crop from the top/bottom of the text
  const textCropValues = lineHeightResponsiveArray.map((lineHeight, index) => {
    const fontFamily =
      processedFontFamilies[Math.min(processedFontFamilies.length - 1, index)]

    return calculateTextCrop(theme, {
      lineHeight,
      fontFamily: fontFamily,
    })
  })

  return {
    lineHeight: lineHeightResponsiveArray,
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
