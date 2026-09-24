import { scrollAreaSlotRecipe as pandaSlotRecipe } from "../../panda-preset/src/slot-recipes/scroll-area"
import { scrollAreaSlotRecipe } from "../src/theme/recipes/scroll-area"

const scrollbarVisibility = (base: Record<string, any>) => {
  const { scrollbar } = base
  return {
    vertical: scrollbar._vertical?.["&:not([data-overflow-y])"],
    horizontal: scrollbar._horizontal?.["&:not([data-overflow-x])"],
    neitherAxis: scrollbar["&:not([data-overflow-x], [data-overflow-y])"],
  }
}

describe("scroll-area scrollbar visibility", () => {
  test.each([
    ["react recipe", scrollAreaSlotRecipe.base as Record<string, any>],
    ["panda-preset recipe", pandaSlotRecipe.base as Record<string, any>],
  ])("%s hides each bar from its own axis", (_name, base) => {
    expect(scrollbarVisibility(base)).toEqual({
      vertical: { display: "none" },
      horizontal: { display: "none" },
      neitherAxis: undefined,
    })
  })
})
