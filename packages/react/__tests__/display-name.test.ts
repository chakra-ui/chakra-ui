import { describe, expect, it } from "vitest"
import {
  getElementTypeDisplayName,
  inferRootProviderDisplayName,
  inferSlotRecipeComponentDisplayName,
  upperFirst,
} from "../src/styled-system/display-name"

describe("display-name", () => {
  it("getElementTypeDisplayName", () => {
    expect(getElementTypeDisplayName("div")).toBeUndefined()
    function Named() {
      return null
    }
    Named.displayName = "Custom"
    expect(getElementTypeDisplayName(Named)).toBe("Custom")
    function OnlyFnName() {
      return null
    }
    expect(getElementTypeDisplayName(OnlyFnName)).toBe("OnlyFnName")
  })

  it("upperFirst", () => {
    expect(upperFirst("root")).toBe("Root")
    expect(upperFirst("itemTrigger")).toBe("ItemTrigger")
    expect(upperFirst("")).toBe("")
  })

  it("inferSlotRecipeComponentDisplayName", () => {
    expect(inferSlotRecipeComponentDisplayName("Accordion", "root")).toBe(
      "AccordionRoot",
    )
    expect(inferSlotRecipeComponentDisplayName("Accordion", "itemBody")).toBe(
      "AccordionItemBody",
    )
    expect(inferSlotRecipeComponentDisplayName("Dialog", "content")).toBe(
      "DialogContent",
    )
  })

  it("inferRootProviderDisplayName", () => {
    expect(inferRootProviderDisplayName("Dialog", "Root")).toBe("DialogRoot")
    expect(inferRootProviderDisplayName("Dialog", "RootProvider")).toBe(
      "DialogRootProvider",
    )
    expect(inferRootProviderDisplayName("Dialog", undefined)).toBeUndefined()
  })
})
