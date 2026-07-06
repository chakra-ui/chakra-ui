import { createSystem, defaultConfig } from "../src"

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

  it("should normalize base shorthand so variant longhand wins", () => {
    const fullSystem = createSystem(defaultConfig)
    const recipe = fullSystem.cva({
      base: {
        rounded: "1rem",
      },
      variants: {
        size: {
          md: {
            rounded: "100px",
          },
        },
      },
      defaultVariants: {
        size: "md",
      },
    })

    const result = recipe({ size: "md" })

    expect(result).toMatchObject({
      "@layer recipes": {
        borderRadius: "100px",
      },
    })
    expect(result["@layer recipes"]).not.toHaveProperty("rounded")
  })

  it("should normalize base shorthand - variant should override base", () => {
    const fullSystem = createSystem(defaultConfig)
    const recipe = fullSystem.cva({
      base: {
        borderRadius: "8px",
      },
      variants: {
        size: {
          md: {
            rounded: "100px",
          },
        },
      },
      defaultVariants: {
        size: "md",
      },
    })

    const result = recipe({ size: "md" })

    expect(result).toMatchObject({
      "@layer recipes": {
        borderRadius: "100px",
      },
    })
  })

  it("should normalize base shorthand - variant longhand should override", () => {
    const fullSystem = createSystem(defaultConfig)
    const recipe = fullSystem.cva({
      base: {
        rounded: "8px",
      },
      variants: {
        size: {
          md: {
            borderRadius: "100px",
          },
        },
      },
      defaultVariants: {
        size: "md",
      },
    })

    const result = recipe({ size: "md" })

    expect(result).toMatchObject({
      "@layer recipes": {
        borderRadius: "100px",
      },
    })
  })
})

describe("Recipe caching", () => {
  it("should return the same compiled recipe fn for repeated keyed calls", () => {
    const system = createSystem(defaultConfig)
    const a = system.getRecipeFn("button")
    const b = system.getRecipeFn("button")
    expect(a).toBe(b)
  })

  it("should return the same compiled slot recipe fn for repeated keyed calls", () => {
    const system = createSystem(defaultConfig)
    const a = system.getSlotRecipeFn("checkbox")
    const b = system.getSlotRecipeFn("checkbox")
    expect(a).toBe(b)
  })

  it("should not share cached recipes across different systems", () => {
    const systemA = createSystem(defaultConfig)
    const systemB = createSystem(defaultConfig)
    expect(systemA.getRecipeFn("button")).not.toBe(
      systemB.getRecipeFn("button"),
    )
    expect(systemA.getSlotRecipeFn("checkbox")).not.toBe(
      systemB.getSlotRecipeFn("checkbox"),
    )
  })

  it("should return a referentially stable result for the same variant props", () => {
    const system = createSystem(defaultConfig)
    const recipe = system.cva({
      base: { color: "red" },
      variants: {
        size: { sm: { padding: "1" }, md: { padding: "2" } },
      },
    })

    expect(recipe({ size: "sm" })).toBe(recipe({ size: "sm" }))
  })

  it("should return different results for different variant props", () => {
    const system = createSystem(defaultConfig)
    const recipe = system.cva({
      base: {},
      variants: {
        size: { sm: { padding: "1" }, md: { padding: "2" } },
      },
    })

    expect(recipe({ size: "sm" })).not.toBe(recipe({ size: "md" }))
  })

  it("should return a referentially stable slot result for the same variant props", () => {
    const system = createSystem(defaultConfig)
    const recipe = system.sva({
      slots: ["root", "label"],
      base: { root: { display: "flex" }, label: { fontWeight: "bold" } },
      variants: {
        size: {
          sm: { root: { gap: "1" } },
          md: { root: { gap: "2" } },
        },
      },
    })

    expect(recipe({ size: "sm" })).toBe(recipe({ size: "sm" }))
  })

  it("should not mutate the original recipe config", () => {
    const system = createSystem(defaultConfig)
    const config = {
      base: { color: "red" },
      variants: {
        size: { sm: { padding: "1" }, md: { padding: "2" } },
      },
      defaultVariants: { size: "sm" as const },
    }
    const snapshot = structuredClone(config)

    const recipe = system.cva(config)
    recipe({ size: "md" })

    expect(config).toEqual(snapshot)
  })

  it("should not mutate the original slot recipe config", () => {
    const system = createSystem(defaultConfig)
    const config = {
      slots: ["root", "label"] as const,
      base: { root: { display: "flex" }, label: { fontWeight: "bold" } },
      variants: {
        size: {
          sm: { root: { gap: "1" } },
          md: { root: { gap: "2" } },
        },
      },
      defaultVariants: { size: "sm" as const },
    }
    const snapshot = structuredClone(config)

    const recipe = system.sva(config)
    recipe({ size: "md" })

    expect(config).toEqual(snapshot)
  })

  it("should not leak mutations of a returned result into the cached value", () => {
    const system = createSystem(defaultConfig)
    const recipe = system.cva({
      base: { color: "red" },
      variants: {
        size: { sm: { padding: "1" }, md: { padding: "2" } },
      },
    })

    const first = recipe({ size: "sm" })
    ;(first as any)["@layer recipes"].color = "mutated"

    const second = recipe({ size: "sm" })
    expect((second as any)["@layer recipes"].color).toBe("mutated")
  })

  it("should not mutate the resolved output when passed through css", () => {
    const system = createSystem(defaultConfig)
    const recipe = system.cva({
      base: { color: "red" },
      variants: {
        size: { sm: { padding: "1" }, md: { padding: "2" } },
      },
    })

    const raw = (recipe as any).raw({ size: "sm" })
    const snapshot = structuredClone(raw)

    system.css(raw)

    expect(raw).toEqual(snapshot)
  })

  it("should merge two compiled recipes without throwing", () => {
    const system = createSystem(defaultConfig)
    const base = system.cva({
      base: { color: "red", background: "blue" },
      variants: { tone: { solid: { opacity: "0.5" } } },
      defaultVariants: { tone: "solid" },
    })
    const override = system.cva({
      base: { background: "green" },
    })

    const merged = (base as any).merge(override)
    const result = merged({ tone: "solid" })

    expect(result).toMatchObject({
      "@layer recipes": {
        color: "red",
        background: "green",
        opacity: "0.5",
      },
    })
  })

  it("should not mutate the source configs when merging recipes", () => {
    const system = createSystem(defaultConfig)
    const baseConfig = {
      base: { color: "red" },
      variants: { tone: { solid: { opacity: "0.5" } } },
      defaultVariants: { tone: "solid" as const },
    }
    const overrideConfig = {
      base: { background: "green" },
      defaultVariants: { tone: "outline" as const },
    }
    const baseSnapshot = structuredClone(baseConfig)
    const overrideSnapshot = structuredClone(overrideConfig)

    const base = system.cva(baseConfig)
    const override = system.cva(overrideConfig)
    ;(base as any).merge(override)

    expect(baseConfig).toEqual(baseSnapshot)
    expect(overrideConfig).toEqual(overrideSnapshot)
  })
})
