import type { PropertyTransform, TransformArgs } from "./types"

export const colorMix = (value: string, token: TransformArgs["token"]) => {
  if (!value || typeof value !== "string") {
    return { invalid: true, value }
  }

  const [rawColor, rawOpacity] = value.split("/")

  if (!rawColor || !rawOpacity || rawColor === "currentBg") {
    return { invalid: true, value: rawColor }
  }

  const colorToken = token(`colors.${rawColor}`)
  const opacityToken = token.raw(`opacity.${rawOpacity}`)?.value

  if (!opacityToken && isNaN(Number(rawOpacity))) {
    return { invalid: true, value: rawColor }
  }

  const percent = opacityToken
    ? Number(opacityToken) * 100 + "%"
    : `${rawOpacity}%`

  const color = colorToken ?? rawColor

  return {
    invalid: false,
    color,
    value: `color-mix(in srgb, ${color} ${percent}, transparent)`,
  }
}

export const createColorMixTransform =
  (prop: string): PropertyTransform =>
  (value, args) => {
    const mix = args.utils.colorMix(value)
    if (mix.invalid) return { [prop]: value }
    const cssVar = "--mix-" + prop
    return {
      [cssVar]: mix.value,
      [prop]: `var(${cssVar}, ${mix.color})`,
    }
  }
