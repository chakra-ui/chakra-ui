import { createSystem } from "../src"

describe("Recipe bracket syntax fix", () => {
  const system = createSystem({
    theme: {
      breakpoints: {
        sm: "640px",
        md: "768px",
      },
    },
  })

  it("should handle bracket syntax in recipe variants (user's issue)", () => {
    const recipe = system.cva({
      base: {},
      variants: {
        variant: {
          primary: {
            color: ["red", "green"],
          },
        },
      },
      defaultVariants: {
        variant: "primary",
      },
    })

    const result = recipe({ variant: "primary" })

    expect(result).toMatchObject({
      "@layer recipes": {
        color: "red",
        "@media screen and (min-width: 40rem)": {
          color: "green",
        },
      },
    })
  })

  it("should work with base styles", () => {
    const recipe = system.cva({
      base: {
        color: ["red", "green"],
      },
    })

    const result = recipe()

    expect(result).toMatchObject({
      "@layer recipes": {
        color: "red",
        "@media screen and (min-width: 40rem)": {
          color: "green",
        },
      },
    })
  })

  it("should work with object syntax (as control)", () => {
    const recipe = system.cva({
      base: {},
      variants: {
        variant: {
          primary: {
            color: {
              base: "red",
              sm: "green",
            },
          },
        },
      },
      defaultVariants: {
        variant: "primary",
      },
    })

    const result = recipe({ variant: "primary" })

    expect(result).toMatchObject({
      "@layer recipes": {
        color: "red",
        "@media screen and (min-width: 40rem)": {
          color: "green",
        },
      },
    })
  })

  it("should handle multiple properties with bracket syntax", () => {
    const recipe = system.cva({
      base: {
        color: ["red", "blue"],
        fontSize: ["12px", "16px"],
        padding: ["8px", "16px"],
      },
    })

    const result = recipe()

    expect(result).toMatchObject({
      "@layer recipes": {
        color: "red",
        fontSize: "12px",
        padding: "8px",
        "@media screen and (min-width: 40rem)": {
          color: "blue",
          fontSize: "16px",
          padding: "16px",
        },
      },
    })
  })

  it("should handle bracket syntax with multiple breakpoints", () => {
    const recipe = system.cva({
      base: {
        color: ["red", "green", "blue"],
      },
    })

    const result = recipe()

    expect(result).toMatchObject({
      "@layer recipes": {
        color: "red",
        "@media screen and (min-width: 40rem)": {
          color: "green",
        },
        "@media screen and (min-width: 48rem)": {
          color: "blue",
        },
      },
    })
  })

  it("should handle bracket syntax in compound variants", () => {
    const recipe = system.cva({
      base: {},
      variants: {
        size: {
          small: {},
          large: {},
        },
        variant: {
          primary: {},
          secondary: {},
        },
      },
      compoundVariants: [
        {
          size: "small",
          variant: "primary",
          css: {
            padding: ["4px", "8px"],
          },
        },
      ],
    })

    const result = recipe({ size: "small", variant: "primary" })

    expect(result).toMatchObject({
      "@layer recipes": {
        padding: "4px",
        "@media screen and (min-width: 40rem)": {
          padding: "8px",
        },
      },
    })
  })

  it("should handle mixed bracket and object syntax", () => {
    const recipe = system.cva({
      base: {
        color: ["red", "green"],
        fontSize: {
          base: "12px",
          sm: "16px",
        },
      },
    })

    const result = recipe()

    expect(result).toMatchObject({
      "@layer recipes": {
        color: "red",
        fontSize: "12px",
        "@media screen and (min-width: 40rem)": {
          color: "green",
          fontSize: "16px",
        },
      },
    })
  })

  it("should handle bracket syntax with partial breakpoint values", () => {
    const recipe = system.cva({
      base: {
        color: ["red"],
        fontSize: ["12px", "16px"],
      },
    })

    const result = recipe()

    expect(result).toMatchObject({
      "@layer recipes": {
        color: "red",
        fontSize: "12px",
        "@media screen and (min-width: 40rem)": {
          fontSize: "16px",
        },
      },
    })
  })

  it("should handle bracket syntax in multiple variant options", () => {
    const recipe = system.cva({
      base: {},
      variants: {
        variant: {
          primary: {
            color: ["red", "darkred"],
          },
          secondary: {
            color: ["blue", "darkblue"],
          },
        },
      },
    })

    const primary = recipe({ variant: "primary" })
    const secondary = recipe({ variant: "secondary" })

    expect(primary).toMatchObject({
      "@layer recipes": {
        color: "red",
        "@media screen and (min-width: 40rem)": {
          color: "darkred",
        },
      },
    })

    expect(secondary).toMatchObject({
      "@layer recipes": {
        color: "blue",
        "@media screen and (min-width: 40rem)": {
          color: "darkblue",
        },
      },
    })
  })
})
