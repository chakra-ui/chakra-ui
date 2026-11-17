import { numberInputSlotRecipe as pandaSlotRecipe } from "../../panda-preset/src/slot-recipes/number-input"
import { numberInputSlotRecipe } from "../src/theme/recipes/number-input"

describe.each([
  { name: "react recipe", recipe: numberInputSlotRecipe },
  { name: "panda-preset recipe", recipe: pandaSlotRecipe },
])("$name NumberInput stepper padding", ({ recipe }) => {
  test.each([
    ["xs", "sizes.4"],
    ["sm", "sizes.5"],
    ["md", "sizes.6"],
    ["lg", "sizes.6"],
  ] as const)("shares the %s stepper width through the root", (size, width) => {
    const styles = recipe.variants?.size?.[size]
    expect(styles?.root).toMatchObject({ "--stepper-width": width })
    expect(styles?.control).not.toHaveProperty("--stepper-width")
  })

  test("adds end padding only when a visible control is rendered", () => {
    const input = recipe.base?.input
    const withControl =
      "&:where([data-scope=number-input][data-part=root]:has(> [data-scope=number-input][data-part=control]:not([hidden])) *)"

    expect(input).not.toHaveProperty("pe")
    expect(input?.[withControl]).toEqual({
      pe: "calc(var(--stepper-width) + 0.5rem)",
    })
  })
})
