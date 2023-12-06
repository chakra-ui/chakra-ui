import { toCSSVar } from "../src"

test("should convert to css variables", () => {
  expect(
    toCSSVar({
      space: {
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
    }),
  ).toMatchInlineSnapshot(`
{
  "__breakpoints": null,
  "__cssMap": {
    "space.-lg": {
      "value": "-24px",
      "var": "--space-lg",
      "varRef": "calc(var(--space-lg) * -1)",
    },
    "space.-md": {
      "value": "-16px",
      "var": "--space-md",
      "varRef": "calc(var(--space-md) * -1)",
    },
    "space.-sm": {
      "value": "-8px",
      "var": "--space-sm",
      "varRef": "calc(var(--space-sm) * -1)",
    },
    "space.lg": {
      "value": "24px",
      "var": "--space-lg",
      "varRef": "var(--space-lg)",
    },
    "space.md": {
      "value": "16px",
      "var": "--space-md",
      "varRef": "var(--space-md)",
    },
    "space.sm": {
      "value": "8px",
      "var": "--space-sm",
      "varRef": "var(--space-sm)",
    },
  },
  "__cssVars": {
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0",
    "--space-lg": "24px",
    "--space-md": "16px",
    "--space-sm": "8px",
  },
  "space": {
    "lg": "24px",
    "md": "16px",
    "sm": "8px",
  },
}
`)
})

test("should convert to css variables - 2", () => {
  expect(
    toCSSVar({
      space: [8, 12, 16, 33],
    }),
  ).toMatchInlineSnapshot(`
{
  "__breakpoints": null,
  "__cssMap": {
    "space.-0": {
      "value": "-8",
      "var": "--space-0",
      "varRef": "calc(var(--space-0) * -1)",
    },
    "space.-1": {
      "value": "-12",
      "var": "--space-1",
      "varRef": "calc(var(--space-1) * -1)",
    },
    "space.-2": {
      "value": "-16",
      "var": "--space-2",
      "varRef": "calc(var(--space-2) * -1)",
    },
    "space.-3": {
      "value": "-33",
      "var": "--space-3",
      "varRef": "calc(var(--space-3) * -1)",
    },
    "space.0": {
      "value": 8,
      "var": "--space-0",
      "varRef": "var(--space-0)",
    },
    "space.1": {
      "value": 12,
      "var": "--space-1",
      "varRef": "var(--space-1)",
    },
    "space.2": {
      "value": 16,
      "var": "--space-2",
      "varRef": "var(--space-2)",
    },
    "space.3": {
      "value": 33,
      "var": "--space-3",
      "varRef": "var(--space-3)",
    },
  },
  "__cssVars": {
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0",
    "--space-0": 8,
    "--space-1": 12,
    "--space-2": 16,
    "--space-3": 33,
  },
  "space": [
    8,
    12,
    16,
    33,
  ],
}
`)
})

test("should handle nested theme with css-var", () => {
  const baseTheme = toCSSVar({ space: [2, 3, 4] })
  const theme = { ...baseTheme, colors: { red: { 100: "#100", 200: "#200" } } }
  expect(toCSSVar(theme)).toMatchInlineSnapshot(`
{
  "__breakpoints": null,
  "__cssMap": {
    "colors.red.100": {
      "value": "#100",
      "var": "--colors-red-100",
      "varRef": "var(--colors-red-100)",
    },
    "colors.red.200": {
      "value": "#200",
      "var": "--colors-red-200",
      "varRef": "var(--colors-red-200)",
    },
    "space.-0": {
      "value": "-2",
      "var": "--space-0",
      "varRef": "calc(var(--space-0) * -1)",
    },
    "space.-1": {
      "value": "-3",
      "var": "--space-1",
      "varRef": "calc(var(--space-1) * -1)",
    },
    "space.-2": {
      "value": "-4",
      "var": "--space-2",
      "varRef": "calc(var(--space-2) * -1)",
    },
    "space.0": {
      "value": 2,
      "var": "--space-0",
      "varRef": "var(--space-0)",
    },
    "space.1": {
      "value": 3,
      "var": "--space-1",
      "varRef": "var(--space-1)",
    },
    "space.2": {
      "value": 4,
      "var": "--space-2",
      "varRef": "var(--space-2)",
    },
  },
  "__cssVars": {
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0",
    "--colors-red-100": "#100",
    "--colors-red-200": "#200",
    "--space-0": 2,
    "--space-1": 3,
    "--space-2": 4,
  },
  "colors": {
    "red": {
      "100": "#100",
      "200": "#200",
    },
  },
  "space": [
    2,
    3,
    4,
  ],
}
`)
})

test("should handle values provided as CSS variables", () => {
  const theme = toCSSVar({
    colors: {
      red: {
        50: "var(--CUSTOM-red-50)",
      },
    },
    space: {
      sm: "var(--CUSTOM-sm)",
    },
  })
  expect(toCSSVar(theme)).toMatchInlineSnapshot(`
{
  "__breakpoints": null,
  "__cssMap": {
    "colors.red.50": {
      "value": "var(--CUSTOM-red-50)",
      "var": "--colors-red-50",
      "varRef": "var(--colors-red-50)",
    },
    "space.-sm": {
      "value": "calc(var(--CUSTOM-sm) * -1)",
      "var": "--space-sm",
      "varRef": "calc(var(--space-sm) * -1)",
    },
    "space.sm": {
      "value": "var(--CUSTOM-sm)",
      "var": "--space-sm",
      "varRef": "var(--space-sm)",
    },
  },
  "__cssVars": {
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0",
    "--colors-red-50": "var(--CUSTOM-red-50)",
    "--space-sm": "var(--CUSTOM-sm)",
  },
  "colors": {
    "red": {
      "50": "var(--CUSTOM-red-50)",
    },
  },
  "space": {
    "sm": "var(--CUSTOM-sm)",
  },
}
`)
})

test("should handle spaces in keys", () => {
  const theme = toCSSVar({
    colors: {
      "i have spaces": "#b4d455",
    },
  })

  expect(toCSSVar(theme)).toMatchInlineSnapshot(`
{
  "__breakpoints": null,
  "__cssMap": {
    "colors.i have spaces": {
      "value": "#b4d455",
      "var": "--colors-i-have-spaces",
      "varRef": "var(--colors-i-have-spaces)",
    },
  },
  "__cssVars": {
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0",
    "--colors-i-have-spaces": "#b4d455",
  },
  "colors": {
    "i have spaces": "#b4d455",
  },
}
`)
})

test("should add a css var prefix if provided", () => {
  const theme = toCSSVar({
    colors: {
      red: "#ec0016",
    },
    config: {
      cssVarPrefix: "ck",
    },
  })

  expect(toCSSVar(theme)).toMatchInlineSnapshot(`
{
  "__breakpoints": null,
  "__cssMap": {
    "colors.red": {
      "value": "#ec0016",
      "var": "--ck-colors-red",
      "varRef": "var(--ck-colors-red)",
    },
  },
  "__cssVars": {
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0",
    "--ck-colors-red": "#ec0016",
  },
  "colors": {
    "red": "#ec0016",
  },
  "config": {
    "cssVarPrefix": "ck",
  },
}
`)
})

test("should convert transition tokens", () => {
  const theme = {
    transition: {
      property: {
        colors: "background-color, background",
      },
    },
  }
  expect(toCSSVar(theme)).toMatchInlineSnapshot(`
{
  "__breakpoints": null,
  "__cssMap": {
    "transition.property.colors": {
      "value": "background-color, background",
      "var": "--transition-property-colors",
      "varRef": "var(--transition-property-colors)",
    },
  },
  "__cssVars": {
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0",
    "--transition-property-colors": "background-color, background",
  },
  "transition": {
    "property": {
      "colors": "background-color, background",
    },
  },
}
`)
})

test("should convert semantic tokens", () => {
  const theme = {
    colors: {
      green: {
        500: "#38A169",
      },
      red: {
        100: "#ff0010",
        400: "#ff0040",
        500: "#ff0050",
        700: "#ff0070",
        800: "#ff0080",
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          default: "red.500",
          _dark: "red.400",
        },
        secondary: {
          default: "red.800",
          _dark: "red.700",
        },
        error: "red.500",
        success: "green.500",
        background: {
          green: {
            normal: "green.500",
          },
        },
        text: {
          green: {
            default: "green.500",
          },
          red: {
            bold: {
              default: "red.800",
              _dark: "red.700",
            },
            subtle: {
              default: "red.500",
              _dark: "red.400",
            },
          },
        },
      },
    },
  }

  expect(toCSSVar(theme)).toMatchInlineSnapshot(`
{
  "__breakpoints": null,
  "__cssMap": {
    "colors.background.green.normal": {
      "value": "var(--colors-background-green-normal)",
      "var": "--colors-background-green-normal",
      "varRef": "var(--colors-background-green-normal)",
    },
    "colors.error": {
      "value": "var(--colors-error)",
      "var": "--colors-error",
      "varRef": "var(--colors-error)",
    },
    "colors.green.500": {
      "value": "#38A169",
      "var": "--colors-green-500",
      "varRef": "var(--colors-green-500)",
    },
    "colors.primary": {
      "value": "var(--colors-primary)",
      "var": "--colors-primary",
      "varRef": "var(--colors-primary)",
    },
    "colors.red.100": {
      "value": "#ff0010",
      "var": "--colors-red-100",
      "varRef": "var(--colors-red-100)",
    },
    "colors.red.400": {
      "value": "#ff0040",
      "var": "--colors-red-400",
      "varRef": "var(--colors-red-400)",
    },
    "colors.red.500": {
      "value": "#ff0050",
      "var": "--colors-red-500",
      "varRef": "var(--colors-red-500)",
    },
    "colors.red.700": {
      "value": "#ff0070",
      "var": "--colors-red-700",
      "varRef": "var(--colors-red-700)",
    },
    "colors.red.800": {
      "value": "#ff0080",
      "var": "--colors-red-800",
      "varRef": "var(--colors-red-800)",
    },
    "colors.secondary": {
      "value": "var(--colors-secondary)",
      "var": "--colors-secondary",
      "varRef": "var(--colors-secondary)",
    },
    "colors.success": {
      "value": "var(--colors-success)",
      "var": "--colors-success",
      "varRef": "var(--colors-success)",
    },
    "colors.text.green": {
      "value": "var(--colors-text-green)",
      "var": "--colors-text-green",
      "varRef": "var(--colors-text-green)",
    },
    "colors.text.red.bold": {
      "value": "var(--colors-text-red-bold)",
      "var": "--colors-text-red-bold",
      "varRef": "var(--colors-text-red-bold)",
    },
    "colors.text.red.subtle": {
      "value": "var(--colors-text-red-subtle)",
      "var": "--colors-text-red-subtle",
      "varRef": "var(--colors-text-red-subtle)",
    },
  },
  "__cssVars": {
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0",
    "--colors-background-green-normal": "var(--colors-green-500)",
    "--colors-error": "var(--colors-red-500)",
    "--colors-green-500": "#38A169",
    "--colors-primary": "var(--colors-red-500)",
    "--colors-red-100": "#ff0010",
    "--colors-red-400": "#ff0040",
    "--colors-red-500": "#ff0050",
    "--colors-red-700": "#ff0070",
    "--colors-red-800": "#ff0080",
    "--colors-secondary": "var(--colors-red-800)",
    "--colors-success": "var(--colors-green-500)",
    "--colors-text-green": "var(--colors-green-500)",
    "--colors-text-red-bold": "var(--colors-red-800)",
    "--colors-text-red-subtle": "var(--colors-red-500)",
    ".chakra-ui-dark &:not([data-theme]),[data-theme=dark] &:not([data-theme]),&[data-theme=dark]": {
      "--colors-primary": "var(--colors-red-400)",
      "--colors-secondary": "var(--colors-red-700)",
      "--colors-text-red-bold": "var(--colors-red-700)",
      "--colors-text-red-subtle": "var(--colors-red-400)",
    },
  },
  "colors": {
    "green": {
      "500": "#38A169",
    },
    "red": {
      "100": "#ff0010",
      "400": "#ff0040",
      "500": "#ff0050",
      "700": "#ff0070",
      "800": "#ff0080",
    },
  },
  "semanticTokens": {
    "colors": {
      "background": {
        "green": {
          "normal": "green.500",
        },
      },
      "error": "red.500",
      "primary": {
        "_dark": "red.400",
        "default": "red.500",
      },
      "secondary": {
        "_dark": "red.700",
        "default": "red.800",
      },
      "success": "green.500",
      "text": {
        "green": {
          "default": "green.500",
        },
        "red": {
          "bold": {
            "_dark": "red.700",
            "default": "red.800",
          },
          "subtle": {
            "_dark": "red.400",
            "default": "red.500",
          },
        },
      },
    },
  },
}
`)
})

test("should escape symbols in css var", () => {
  const theme = {
    colors: {
      $red: "#ec0016",
    },
  }

  expect(toCSSVar(theme)).toMatchInlineSnapshot(`
{
  "__breakpoints": null,
  "__cssMap": {
    "colors.$red": {
      "value": "#ec0016",
      "var": "--colors-\\$red",
      "varRef": "var(--colors-\\$red)",
    },
  },
  "__cssVars": {
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0",
    "--colors-\\$red": "#ec0016",
  },
  "colors": {
    "$red": "#ec0016",
  },
}
`)
})
