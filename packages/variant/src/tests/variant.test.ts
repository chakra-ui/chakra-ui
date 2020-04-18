import { createVariant, textStyle, layerStyle } from ".."

test("variant returns style objects from theme", () => {
  const parser = createVariant({
    themeKey: "buttons",
    prop: "variant",
  })

  const a = parser({
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
  expect(a).toEqual({
    padding: "32px",
    background: "papayawhip",
  })
})

test("variant - merge values", () => {
  const parser = createVariant({
    prop: "variant",
    themeKey: "typography",
    defaultValue: "primary",
    values: {
      secondary: {
        fontSize: "40px",
        color: "yellow",
      },
    },
  })

  const result = parser({
    theme: {
      typography: {
        primary: {
          fontSize: "32px",
          color: "#fff",
        },
      },
    },
  })

  expect(result).toEqual({
    fontSize: "32px",
    color: "#fff",
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
    style = comp({ variant: "beep" })
  }).not.toThrow()

  expect(style).toEqual({})
})
