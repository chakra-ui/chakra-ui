import { createVariant, textStyle, layerStyle } from ".."
import { combineParsers, color } from "@chakra-ui/parser"

interface Props {
  /**
   * component variant
   */
  variant?: string
}

test("variant returns style objects from theme", () => {
  const parser = createVariant({
    themeKey: "buttons",
    prop: "variant",
  })

  const result = parser<Props>({
    theme: {
      colors: {
        brand: "papayawhip",
      },
      buttons: {
        primary: {
          padding: "32px",
          bg: "brand",
        },
      },
    },
    variant: "primary",
  })

  expect(result).toEqual({
    padding: "32px",
    background: "papayawhip",
  })
})

test("variant - merge values", () => {
  const variant = createVariant({
    prop: "variant",
    themeKey: "typography",
  })

  const parser = combineParsers(variant, color)

  const result = parser<Props>({
    theme: {
      typography: {
        primary: {
          fontSize: "32px",
          color: "#fff",
        },
      },
    },
    variant: "primary",
    color: "tomato",
  })

  expect(result).toEqual({
    fontSize: "32px",
    color: "tomato",
  })
})

test("textStyle prop returns theme.textStyles object", () => {
  const a = textStyle({
    theme: {
      textStyles: {
        heading: {
          fontWeight: "bold",
          lineHeight: 1.25,
        },
      },
    },
    textStyle: "heading",
  })
  expect(a).toEqual({
    fontWeight: "bold",
    lineHeight: 1.25,
  })
})

test("colors prop returns theme.colorStyles object", () => {
  const result = layerStyle({
    theme: {
      layerStyles: {
        error: {
          color: "#fff",
          backgroundColor: "#000",
        },
      },
    },
    layerStyle: "error",
  })

  expect(result).toEqual({
    color: "#fff",
    backgroundColor: "#000",
  })
})

test("does not throw when no variants are found", () => {
  const comp = createVariant({
    prop: "variant",
    values: {
      beep: {},
    },
  })

  let style: any
  expect(() => {
    style = comp<Props>({ variant: "beep", theme: {} })
  }).not.toThrow()

  expect(style).toEqual({})
})
