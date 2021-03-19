import { toCSSVar } from "../src/css-var"

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
    Object {
      "__breakpoints": null,
      "__cssMap": Object {
        "space.-lg": Object {
          "value": "-24px",
          "var": "--space-lg",
          "varRef": "calc(var(--space-lg) * -1)",
        },
        "space.-md": Object {
          "value": "-16px",
          "var": "--space-md",
          "varRef": "calc(var(--space-md) * -1)",
        },
        "space.-sm": Object {
          "value": "-8px",
          "var": "--space-sm",
          "varRef": "calc(var(--space-sm) * -1)",
        },
        "space.lg": Object {
          "value": "24px",
          "var": "--space-lg",
          "varRef": "var(--space-lg)",
        },
        "space.md": Object {
          "value": "16px",
          "var": "--space-md",
          "varRef": "var(--space-md)",
        },
        "space.sm": Object {
          "value": "8px",
          "var": "--space-sm",
          "varRef": "var(--space-sm)",
        },
      },
      "__cssVars": Object {
        "--chakra-ring": "var(--chakra-ring-offset-shadow), var(--chakra-ring-shadow), 0 0 transparent",
        "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
        "--chakra-ring-inset": "var(--chakra-empty, /*!*/ /*!*/)",
        "--chakra-ring-offset": "0px",
        "--chakra-ring-offset-shadow": "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset) var(--chakra-ring-offset-color, transparent)",
        "--chakra-ring-shadow": "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset)) var(--chakra-ring-color)",
        "--chakra-ring-width": "3px",
        "--chakra-space-x-reverse": "0",
        "--chakra-space-y-reverse": "0",
        "--chakra-transform": "translateX(var(--chakra-translate-x, 0)) translateY(var(--chakra-translate-y, 0)) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--chakra-transform-gpu": "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--space-lg": "24px",
        "--space-md": "16px",
        "--space-sm": "8px",
      },
      "space": Object {
        "lg": "24px",
        "md": "16px",
        "sm": "8px",
      },
    }
  `)
})

test("should convert to css variables", () => {
  expect(
    toCSSVar({
      space: [8, 12, 16, 33],
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "__breakpoints": null,
      "__cssMap": Object {
        "space.-0": Object {
          "value": "-8",
          "var": "--space-0",
          "varRef": "calc(var(--space-0) * -1)",
        },
        "space.-1": Object {
          "value": "-12",
          "var": "--space-1",
          "varRef": "calc(var(--space-1) * -1)",
        },
        "space.-2": Object {
          "value": "-16",
          "var": "--space-2",
          "varRef": "calc(var(--space-2) * -1)",
        },
        "space.-3": Object {
          "value": "-33",
          "var": "--space-3",
          "varRef": "calc(var(--space-3) * -1)",
        },
        "space.0": Object {
          "value": 8,
          "var": "--space-0",
          "varRef": "var(--space-0)",
        },
        "space.1": Object {
          "value": 12,
          "var": "--space-1",
          "varRef": "var(--space-1)",
        },
        "space.2": Object {
          "value": 16,
          "var": "--space-2",
          "varRef": "var(--space-2)",
        },
        "space.3": Object {
          "value": 33,
          "var": "--space-3",
          "varRef": "var(--space-3)",
        },
      },
      "__cssVars": Object {
        "--chakra-ring": "var(--chakra-ring-offset-shadow), var(--chakra-ring-shadow), 0 0 transparent",
        "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
        "--chakra-ring-inset": "var(--chakra-empty, /*!*/ /*!*/)",
        "--chakra-ring-offset": "0px",
        "--chakra-ring-offset-shadow": "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset) var(--chakra-ring-offset-color, transparent)",
        "--chakra-ring-shadow": "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset)) var(--chakra-ring-color)",
        "--chakra-ring-width": "3px",
        "--chakra-space-x-reverse": "0",
        "--chakra-space-y-reverse": "0",
        "--chakra-transform": "translateX(var(--chakra-translate-x, 0)) translateY(var(--chakra-translate-y, 0)) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--chakra-transform-gpu": "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--space-0": 8,
        "--space-1": 12,
        "--space-2": 16,
        "--space-3": 33,
      },
      "space": Array [
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
    Object {
      "__breakpoints": null,
      "__cssMap": Object {
        "colors.red.100": Object {
          "value": "#100",
          "var": "--colors-red-100",
          "varRef": "var(--colors-red-100)",
        },
        "colors.red.200": Object {
          "value": "#200",
          "var": "--colors-red-200",
          "varRef": "var(--colors-red-200)",
        },
        "space.-0": Object {
          "value": "-2",
          "var": "--space-0",
          "varRef": "calc(var(--space-0) * -1)",
        },
        "space.-1": Object {
          "value": "-3",
          "var": "--space-1",
          "varRef": "calc(var(--space-1) * -1)",
        },
        "space.-2": Object {
          "value": "-4",
          "var": "--space-2",
          "varRef": "calc(var(--space-2) * -1)",
        },
        "space.0": Object {
          "value": 2,
          "var": "--space-0",
          "varRef": "var(--space-0)",
        },
        "space.1": Object {
          "value": 3,
          "var": "--space-1",
          "varRef": "var(--space-1)",
        },
        "space.2": Object {
          "value": 4,
          "var": "--space-2",
          "varRef": "var(--space-2)",
        },
      },
      "__cssVars": Object {
        "--chakra-ring": "var(--chakra-ring-offset-shadow), var(--chakra-ring-shadow), 0 0 transparent",
        "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
        "--chakra-ring-inset": "var(--chakra-empty, /*!*/ /*!*/)",
        "--chakra-ring-offset": "0px",
        "--chakra-ring-offset-shadow": "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset) var(--chakra-ring-offset-color, transparent)",
        "--chakra-ring-shadow": "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset)) var(--chakra-ring-color)",
        "--chakra-ring-width": "3px",
        "--chakra-space-x-reverse": "0",
        "--chakra-space-y-reverse": "0",
        "--chakra-transform": "translateX(var(--chakra-translate-x, 0)) translateY(var(--chakra-translate-y, 0)) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--chakra-transform-gpu": "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--colors-red-100": "#100",
        "--colors-red-200": "#200",
        "--space-0": 2,
        "--space-1": 3,
        "--space-2": 4,
      },
      "colors": Object {
        "red": Object {
          "100": "#100",
          "200": "#200",
        },
      },
      "space": Array [
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
    Object {
      "__breakpoints": null,
      "__cssMap": Object {
        "colors.red.50": Object {
          "value": "var(--CUSTOM-red-50)",
          "var": "--colors-red-50",
          "varRef": "var(--colors-red-50)",
        },
        "space.-sm": Object {
          "value": "calc(var(--CUSTOM-sm) * -1)",
          "var": "--space-sm",
          "varRef": "calc(var(--space-sm) * -1)",
        },
        "space.sm": Object {
          "value": "var(--CUSTOM-sm)",
          "var": "--space-sm",
          "varRef": "var(--space-sm)",
        },
      },
      "__cssVars": Object {
        "--chakra-ring": "var(--chakra-ring-offset-shadow), var(--chakra-ring-shadow), 0 0 transparent",
        "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
        "--chakra-ring-inset": "var(--chakra-empty, /*!*/ /*!*/)",
        "--chakra-ring-offset": "0px",
        "--chakra-ring-offset-shadow": "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset) var(--chakra-ring-offset-color, transparent)",
        "--chakra-ring-shadow": "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset)) var(--chakra-ring-color)",
        "--chakra-ring-width": "3px",
        "--chakra-space-x-reverse": "0",
        "--chakra-space-y-reverse": "0",
        "--chakra-transform": "translateX(var(--chakra-translate-x, 0)) translateY(var(--chakra-translate-y, 0)) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--chakra-transform-gpu": "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--colors-red-50": "var(--CUSTOM-red-50)",
        "--space-sm": "var(--CUSTOM-sm)",
      },
      "colors": Object {
        "red": Object {
          "50": "var(--CUSTOM-red-50)",
        },
      },
      "space": Object {
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
    Object {
      "__breakpoints": null,
      "__cssMap": Object {
        "colors.i have spaces": Object {
          "value": "#b4d455",
          "var": "--colors-i-have-spaces",
          "varRef": "var(--colors-i-have-spaces)",
        },
      },
      "__cssVars": Object {
        "--chakra-ring": "var(--chakra-ring-offset-shadow), var(--chakra-ring-shadow), 0 0 transparent",
        "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
        "--chakra-ring-inset": "var(--chakra-empty, /*!*/ /*!*/)",
        "--chakra-ring-offset": "0px",
        "--chakra-ring-offset-shadow": "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset) var(--chakra-ring-offset-color, transparent)",
        "--chakra-ring-shadow": "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset)) var(--chakra-ring-color)",
        "--chakra-ring-width": "3px",
        "--chakra-space-x-reverse": "0",
        "--chakra-space-y-reverse": "0",
        "--chakra-transform": "translateX(var(--chakra-translate-x, 0)) translateY(var(--chakra-translate-y, 0)) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--chakra-transform-gpu": "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--colors-i-have-spaces": "#b4d455",
      },
      "colors": Object {
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
    Object {
      "__breakpoints": null,
      "__cssMap": Object {
        "colors.red": Object {
          "value": "#ec0016",
          "var": "--ck-colors-red",
          "varRef": "var(--ck-colors-red)",
        },
      },
      "__cssVars": Object {
        "--chakra-ring": "var(--chakra-ring-offset-shadow), var(--chakra-ring-shadow), 0 0 transparent",
        "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
        "--chakra-ring-inset": "var(--chakra-empty, /*!*/ /*!*/)",
        "--chakra-ring-offset": "0px",
        "--chakra-ring-offset-shadow": "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset) var(--chakra-ring-offset-color, transparent)",
        "--chakra-ring-shadow": "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset)) var(--chakra-ring-color)",
        "--chakra-ring-width": "3px",
        "--chakra-space-x-reverse": "0",
        "--chakra-space-y-reverse": "0",
        "--chakra-transform": "translateX(var(--chakra-translate-x, 0)) translateY(var(--chakra-translate-y, 0)) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--chakra-transform-gpu": "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--ck-colors-red": "#ec0016",
      },
      "colors": Object {
        "red": "#ec0016",
      },
      "config": Object {
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
    Object {
      "__breakpoints": null,
      "__cssMap": Object {
        "transition.property.colors": Object {
          "value": "background-color, background",
          "var": "--transition-property-colors",
          "varRef": "var(--transition-property-colors)",
        },
      },
      "__cssVars": Object {
        "--chakra-ring": "var(--chakra-ring-offset-shadow), var(--chakra-ring-shadow), 0 0 transparent",
        "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
        "--chakra-ring-inset": "var(--chakra-empty, /*!*/ /*!*/)",
        "--chakra-ring-offset": "0px",
        "--chakra-ring-offset-shadow": "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset) var(--chakra-ring-offset-color, transparent)",
        "--chakra-ring-shadow": "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset)) var(--chakra-ring-color)",
        "--chakra-ring-width": "3px",
        "--chakra-space-x-reverse": "0",
        "--chakra-space-y-reverse": "0",
        "--chakra-transform": "translateX(var(--chakra-translate-x, 0)) translateY(var(--chakra-translate-y, 0)) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--chakra-transform-gpu": "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))",
        "--transition-property-colors": "background-color, background",
      },
      "transition": Object {
        "property": Object {
          "colors": "background-color, background",
        },
      },
    }
  `)
})
