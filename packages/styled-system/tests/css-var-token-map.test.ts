import { toCSSVar } from "../src"

describe("Styled System: CSS variable token map", () => {
  it("should create css vars with condition selectors", () => {
    const theme = {
      fonts: {
        en: "Inter",
        ar: "Tajawal",
      },
      colors: {
        gray: {
          100: "lightgray",
          800: "darkgray",
        },
        red: {
          500: "crimson",
        },
      },
      tokensMap: {
        colors: {
          error: { DEFAULT: "red.500", _dark: "red.100" },
          errorText: { DEFAULT: "white", _dark: "black" },
          layerBg: "green.500",
        },
        fonts: {
          body: { _ltr: "en", _rtl: "ar" },
        },
      },
      config: {
        cssVarPrefix: "chakra",
      },
    }

    const result = toCSSVar(theme)

    expect(result.__cssVars).toMatchInlineSnapshot(`
      Object {
        "--chakra-colors-error": "var(--chakra-colors-error-DEFAULT, var(--chakra-empty,/*!*/ /*!*/))",
        "--chakra-colors-error-DEFAULT": "var(--chakra-colors-red-500)",
        "--chakra-colors-errorText": "var(--chakra-colors-errorText-DEFAULT, var(--chakra-empty,/*!*/ /*!*/))",
        "--chakra-colors-errorText-DEFAULT": "var(--chakra-colors-white)",
        "--chakra-colors-gray-100": "lightgray",
        "--chakra-colors-gray-800": "darkgray",
        "--chakra-colors-layerBg": "var(--chakra-colors-green-500)",
        "--chakra-colors-red-500": "crimson",
        "--chakra-fonts-ar": "Tajawal",
        "--chakra-fonts-body": "var(--chakra-fonts-body-DEFAULT, var(--chakra-empty,/*!*/ /*!*/))",
        "--chakra-fonts-en": "Inter",
        "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
        "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
        "--chakra-ring-offset-color": "#fff",
        "--chakra-ring-offset-shadow": "0 0 #0000",
        "--chakra-ring-offset-width": "0px",
        "--chakra-ring-shadow": "0 0 #0000",
        "--chakra-space-x-reverse": "0",
        "--chakra-space-y-reverse": "0",
        ".chakra-ui-dark &, [data-theme=dark] &, &[data-theme=dark]": Object {
          "--chakra-colors-errorText": "var(--chakra-colors-black)",
        },
        "[dir=ltr] &": Object {
          "--chakra-fonts-body": "var(--chakra-fonts-en)",
        },
        "[dir=rtl] &": Object {
          "--chakra-fonts-body": "var(--chakra-fonts-ar)",
        },
      }
    `)

    expect(result.__cssMap).toMatchInlineSnapshot(`
      Object {
        "colors.error": Object {
          "reference": "var(--chakra-colors-error)",
          "value": Object {
            "reference": "var(--chakra-colors-error-DEFAULT, var(--chakra-empty,/*!*/ /*!*/))",
            "variable": "--chakra-colors-error-DEFAULT",
          },
          "variable": "--chakra-colors-error",
        },
        "colors.error.DEFAULT": Object {
          "reference": "var(--chakra-colors-error-DEFAULT)",
          "value": "red.500",
          "variable": "--chakra-colors-error-DEFAULT",
        },
        "colors.errorText": Object {
          "reference": "var(--chakra-colors-errorText)",
          "value": Object {
            "reference": "var(--chakra-colors-errorText-DEFAULT, var(--chakra-empty,/*!*/ /*!*/))",
            "variable": "--chakra-colors-errorText-DEFAULT",
          },
          "variable": "--chakra-colors-errorText",
        },
        "colors.errorText.DEFAULT": Object {
          "reference": "var(--chakra-colors-errorText-DEFAULT)",
          "value": "white",
          "variable": "--chakra-colors-errorText-DEFAULT",
        },
        "colors.gray.100": Object {
          "value": "lightgray",
          "var": "--chakra-colors-gray-100",
          "varRef": "var(--chakra-colors-gray-100)",
        },
        "colors.gray.800": Object {
          "value": "darkgray",
          "var": "--chakra-colors-gray-800",
          "varRef": "var(--chakra-colors-gray-800)",
        },
        "colors.layerBg": Object {
          "reference": "var(--chakra-colors-layerBg)",
          "value": "green.500",
          "variable": "--chakra-colors-layerBg",
        },
        "colors.red.500": Object {
          "value": "crimson",
          "var": "--chakra-colors-red-500",
          "varRef": "var(--chakra-colors-red-500)",
        },
        "fonts.ar": Object {
          "value": "Tajawal",
          "var": "--chakra-fonts-ar",
          "varRef": "var(--chakra-fonts-ar)",
        },
        "fonts.body": Object {
          "reference": "var(--chakra-fonts-body)",
          "value": Object {
            "reference": "var(--chakra-fonts-body-DEFAULT, var(--chakra-empty,/*!*/ /*!*/))",
            "variable": "--chakra-fonts-body-DEFAULT",
          },
          "variable": "--chakra-fonts-body",
        },
        "fonts.en": Object {
          "value": "Inter",
          "var": "--chakra-fonts-en",
          "varRef": "var(--chakra-fonts-en)",
        },
      }
    `)
  })
})
