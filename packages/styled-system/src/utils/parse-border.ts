const matchString = (val: string, regex: RegExp) => val.match(regex)

const unitMatch = /(\d*\.?\d+)\s?(px|em|ex|%|in|rem|cn|mm|pt|pc+)/
const styleMatch = /none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset/

/**
 * Function to enable shorthand border values.
 * @example
 * border = "3px solid blue.300"
 *
 * This would parse the border values, and convert the "blue.300" token
 * to the equivalent color value. If value doesn't exist in theme, it'll use the
 * raw values.
 */
export function parseBorder(value: string, key = "border") {
  const css = {}

  const split = value.split(" ")
  const [style] = matchString(value, styleMatch) || [""]
  const [unit] = matchString(value, unitMatch) || [""]

  const borderStyleKey = `${key}Style`
  const borderWidthKey = `${key}Width`
  const borderColorKey = `${key}Color`

  if (style) {
    css[borderStyleKey] = style
  }

  if (unit) {
    css[borderWidthKey] = unit
  }

  const [color] = split.filter((i) => {
    const match = matchString(i, unitMatch) && matchString(i, styleMatch)
    return !match && i !== style && i !== unit
  })

  if (color) {
    css[borderColorKey] = color
  }

  return css
}
