import { renderHook } from "@testing-library/react"
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defaultSystem,
  useRecipe,
  useSlotRecipe,
} from "../src"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
)

describe("recipe caching", () => {
  test("reuses compiled recipes for the same system and key", () => {
    const first = renderHook(() => useRecipe({ key: "button" }), { wrapper })
    const second = renderHook(() => useRecipe({ key: "button" }), { wrapper })

    expect(first.result.current).toBe(second.result.current)
  })

  test("reuses compiled slot recipes for the same system and key", () => {
    const first = renderHook(() => useSlotRecipe({ key: "tag" }), { wrapper })
    const second = renderHook(() => useSlotRecipe({ key: "tag" }), { wrapper })

    expect(first.result.current).toBe(second.result.current)
  })

  test("does not share custom recipe props through the keyed recipe cache", () => {
    const recipe = {
      variants: {
        size: {
          sm: { fontSize: "12px" },
        },
      },
    }

    const first = renderHook(() => useRecipe({ recipe }), { wrapper })
    const second = renderHook(() => useRecipe({ recipe }), { wrapper })

    expect(first.result.current).not.toBe(second.result.current)
  })

  test("memoizes recipe style resolution by variant selection", () => {
    const system = createSystem(defaultConfig)
    const recipe = system.cva({
      base: {
        borderRadius: "4px",
      },
      variants: {
        size: {
          sm: { fontSize: "12px" },
          md: { fontSize: "16px" },
        },
      },
    })

    const first = recipe({ size: "sm" })
    const second = recipe({ size: "sm" })
    const third = recipe({ size: "md" })

    expect(second).toBe(first)
    expect(third).not.toBe(first)
    expect(third).toMatchObject({
      "@layer recipes": {
        fontSize: "16px",
      },
    })
  })

  test("memoizes slot recipe style resolution by variant selection", () => {
    const system = createSystem(defaultConfig)
    const recipe = system.sva({
      slots: ["root", "label"],
      base: {
        root: { display: "flex" },
        label: { fontWeight: "medium" },
      },
      variants: {
        size: {
          sm: {
            root: { gap: "4px" },
            label: { fontSize: "12px" },
          },
          md: {
            root: { gap: "8px" },
            label: { fontSize: "16px" },
          },
        },
      },
    })

    const first = recipe({ size: "sm" })
    const second = recipe({ size: "sm" })
    const third = recipe({ size: "md" })

    expect(second).toBe(first)
    expect(second.root).toBe(first.root)
    expect(third).not.toBe(first)
    expect(third.label).toMatchObject({
      "@layer recipes": {
        fontSize: "16px",
      },
    })
  })
})
