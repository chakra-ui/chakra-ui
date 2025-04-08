import { defaultSystem } from "@chakra-ui/react/preset"
import { markdownTable } from "markdown-table"

const { _config: config, tokens } = defaultSystem

export function getKeyframesDoc() {
  const allKeyframes = Object.keys(config.theme?.keyframes || {})
  return markdownTable([
    ["Animation Key", "Example"],
    ...allKeyframes.map((name) => [
      `\`${name}\``,
      `<Box animation="${name} 1s" />`,
    ]),
  ])
}

export function getDurationsDoc() {
  const allDurations = Array.from(
    tokens.categoryMap.get("durations")!.values(),
  ).sort((a, b) => parseFloat(b.originalValue) - parseFloat(a.originalValue))

  return markdownTable([
    ["Duration Token", "Value", "Example"],
    ...allDurations.map((token) => [
      `\`${token.extensions.prop}\``,
      `\`${token.originalValue}\``,
      `<Box animationName="spin" animationDuration="${token.extensions.prop}" />`,
    ]),
  ])
}

export function getAspectRatiosDoc() {
  const aspectRatios = tokens.categoryMap.get("aspectRatios")!
  const allAspectRatios = Array.from(aspectRatios.values())
  return markdownTable([
    ["Aspect Ratio Token", "Value", "Example"],
    ...allAspectRatios.map((token) => [
      `\`${token.extensions.prop}\``,
      `\`${token.value}\``,
      `<Box aspectRatio="${token.extensions.prop}" />`,
    ]),
  ])
}

export function getCursorDoc() {
  const cursor = tokens.categoryMap.get("cursor")!
  const allCursorTokens = Array.from(cursor.values())
  return markdownTable([
    ["Cursor Token", "Value", "Example"],
    ...allCursorTokens.map((token) => [
      `\`${token.extensions.prop}\``,
      `\`${token.value}\``,
      `<Box cursor="${token.extensions.prop}" />`,
    ]),
  ])
}

export function getBreakpointsDoc() {
  const breakpoints = config.theme?.breakpoints || {}
  const allBreakpoints = Object.entries(breakpoints)
    .sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
    .map(([key]) => key)

  return markdownTable([
    ["Breakpoint Token", "Example"],
    ...allBreakpoints.map((key) => [
      `\`${key}\``,
      `<Box ${key}={{ display: "none" }} />`,
    ]),
  ])
}

const colorKeys = [
  "gray",
  "red",
  "pink",
  "purple",
  "cyan",
  "blue",
  "teal",
  "green",
  "yellow",
  "orange",
]

export function getColorTokenDoc() {
  const colors = tokens.categoryMap.get("colors")!
  const allColors = Array.from(colors.values()).filter(
    (token) =>
      colorKeys.some((key) => token.name.startsWith(`colors.${key}`)) &&
      !token.extensions.conditions,
  )
  return markdownTable([
    ["Color Token", "Value", "Example"],
    ...allColors.map((token) => {
      const name = token.name.replace("colors.", "")
      return [
        `\`${name}\``,
        `\`${token.value}\``,
        `<Box color="${name}" bg="${name}" />`,
      ]
    }),
  ])
}

export function getColorSemanticTokenDoc() {
  const colors = tokens.categoryMap.get("colors")!
  const allColors = Array.from(colors.values())
  const bgTokens = markdownTable([
    ["Background Token", "Example"],
    ...allColors
      .filter((token) => token.name.startsWith("colors.bg"))
      .map((token) => [
        `\`${token.extensions.prop}\``,
        `<Box bg="${token.extensions.prop}" />`,
      ]),
  ])
  const textTokens = markdownTable([
    ["Text Token", "Example"],
    ...allColors
      .filter((token) => token.name.startsWith("colors.fg"))
      .map((token) => [
        `\`${token.extensions.prop}\``,
        `<Box color="${token.extensions.prop}" />`,
      ]),
  ])
  const borderTokens = markdownTable([
    ["Border Token", "Example"],
    ...allColors
      .filter((token) => token.name.startsWith("colors.border"))
      .map((token) => [
        `\`${token.extensions.prop}\``,
        `<Box borderColor="${token.extensions.prop}" />`,
      ]),
  ])

  const docs = [
    `### Background`,
    bgTokens,
    `### Text`,
    textTokens,
    `### Border`,
    borderTokens,
  ]
  return docs.join("\n\n")
}

export function getFontTokenDoc() {
  const fonts = tokens.categoryMap.get("fonts")!
  const allFonts = Array.from(fonts.values())
  return markdownTable([
    ["Font Token", "Example"],
    ...allFonts.map((token) => [
      `\`${token.extensions.prop}\``,
      `<Text fontFamily="${token.extensions.prop}" />`,
    ]),
  ])
}

export function getFontSizeTokenDoc() {
  const fontSizes = tokens.categoryMap.get("fontSizes")!
  const allFontSizes = Array.from(fontSizes.values())
  return markdownTable([
    ["Font Size Token", "Value", "Example"],
    ...allFontSizes.map((token) => [
      `\`${token.extensions.prop}\``,
      `\`${token.value}\``,
      `<Text fontSize="${token.extensions.prop}" />`,
    ]),
  ])
}

export function getFontWeightTokenDoc() {
  const fontWeights = tokens.categoryMap.get("fontWeights")!
  const allFontWeights = Array.from(fontWeights.values())
  return markdownTable([
    ["Font Weight Token", "Value", "Example"],
    ...allFontWeights.map((token) => [
      `\`${token.extensions.prop}\``,
      `\`${token.value}\``,
      `<Text fontWeight="${token.extensions.prop}" />`,
    ]),
  ])
}

export function getLineHeightTokenDoc() {
  const lineHeights = tokens.categoryMap.get("lineHeights")!
  const allLineHeights = Array.from(lineHeights.values())
  return markdownTable([
    ["Line Height Token", "Value", "Example"],
    ...allLineHeights.map((token) => [
      `\`${token.extensions.prop}\``,
      `\`${token.value}\``,
      `<Text lineHeight="${token.extensions.prop}" />`,
    ]),
  ])
}

export function getLetterSpacingTokenDoc() {
  const letterSpacings = tokens.categoryMap.get("letterSpacings")!
  const allLetterSpacings = Array.from(letterSpacings.values())
  return markdownTable([
    ["Letter Spacing Token", "Value", "Example"],
    ...allLetterSpacings.map((token) => [
      `\`${token.extensions.prop}\``,
      `\`${token.value}\``,
      `<Text letterSpacing="${token.extensions.prop}" />`,
    ]),
  ])
}

export function getZIndexTokenDoc() {
  const zIndices = tokens.categoryMap.get("zIndex")!
  const allZIndex = Array.from(zIndices.values()).sort(
    (a, b) => parseFloat(a.originalValue) - parseFloat(b.originalValue),
  )
  return markdownTable([
    ["Z Index Token", "Value", "Example"],
    ...allZIndex.map((token) => [
      `\`${token.extensions.prop}\``,
      `\`${token.originalValue}\``,
      `<Box zIndex="${token.extensions.prop}" />`,
    ]),
  ])
}

export function getBorderRadiusTokenDoc() {
  const borderRadius = tokens.categoryMap.get("radii")!
  const allBorderRadius = Array.from(borderRadius.values())
  return markdownTable([
    ["Border Radius Token", "Value", "Example"],
    ...allBorderRadius.map((token) => [
      `\`${token.extensions.prop}\``,
      `\`${token.originalValue}\``,
      `<Box borderRadius="${token.extensions.prop}" />`,
    ]),
  ])
}

export function getShadowTokenDoc() {
  const shadows = tokens.categoryMap.get("shadows")!
  const allShadows = Array.from(shadows.values())
  return markdownTable([
    ["Shadow Token", "Example"],
    ...allShadows.map((token) => [
      `\`${token.extensions.prop}\``,
      `<Box shadow="${token.extensions.prop}" />`,
    ]),
  ])
}

export function getSpacingTokenDoc() {
  const spacings = tokens.categoryMap.get("spacing")!
  const allSpacings = Array.from(spacings.values())
    .filter(
      (token) =>
        token.extensions.category === "spacing" && !token.extensions.negative,
    )
    .sort((a, b) => parseFloat(a.value) - parseFloat(b.value))

  return markdownTable([
    ["Spacing Token", "Value", "Example"],
    ...allSpacings.map((token) => [
      `\`${token.extensions.prop}\``,
      `\`${token.value}\``,
      `<Box spacing="${token.extensions.prop}" />`,
    ]),
  ])
}

export function replaceTokenDoc(text: string) {
  return text
    .replace("<KeyframeDoc />", getKeyframesDoc())
    .replace("<DurationTokenDoc />", getDurationsDoc())
    .replace("<AspectRatioTokenDoc />", getAspectRatiosDoc())
    .replace("<BreakpointDoc />", getBreakpointsDoc())
    .replace("<ColorTokenDoc />", getColorTokenDoc())
    .replace("<ColorSemanticTokenDoc />", getColorSemanticTokenDoc())
    .replace("<CursorTokenDoc />", getCursorDoc())
    .replace("<FontTokenDoc />", getFontTokenDoc())
    .replace("<FontSizeTokenDoc />", getFontSizeTokenDoc())
    .replace("<FontWeightTokenDoc />", getFontWeightTokenDoc())
    .replace("<LineHeightTokenDoc />", getLineHeightTokenDoc())
    .replace("<LetterSpacingTokenDoc />", getLetterSpacingTokenDoc())
    .replace("<ZIndexTokenDoc />", getZIndexTokenDoc())
    .replace("<BorderRadiusTokenDoc />", getBorderRadiusTokenDoc())
    .replace("<ShadowTokenDoc />", getShadowTokenDoc())
    .replace("<SpacingTokenDoc />", getSpacingTokenDoc())
}
