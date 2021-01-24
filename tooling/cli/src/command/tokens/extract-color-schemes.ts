import { isObject } from "@chakra-ui/utils"

const colorHueKeys = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
]

function isColorHue(value: unknown): boolean {
  if (!isObject(value)) {
    return false
  }
  const keys = Object.keys(value)
  return colorHueKeys.every((key) => keys.includes(key))
}

export function extractColorSchemeTypes(theme: Record<string, unknown>) {
  const { colors } = theme
  if (!isObject(colors)) {
    return []
  }

  return Object.entries(colors).reduce((allDefs, [colorName, definition]) => {
    if (isColorHue(definition)) {
      allDefs.push(colorName)
    }

    return allDefs
  }, [] as string[])
}
