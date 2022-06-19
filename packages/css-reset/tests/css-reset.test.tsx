import {
  elementResets,
  getCssResetForElement,
  cssResetForEveryElement,
} from "../src"

describe("Element specific CSS reset", () => {
  it.each(Object.keys(elementResets))(
    "should apply the CSS reset for DOM element %s",
    (element) => {
      const resetDeclaration = getCssResetForElement(element)
      const declarationCount = Object.keys(resetDeclaration).length
      const minCount = Object.keys(cssResetForEveryElement).length
      expect(declarationCount).toBeGreaterThan(minCount)
    },
  )
})
