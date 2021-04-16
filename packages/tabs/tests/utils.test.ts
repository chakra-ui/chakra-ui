import { shouldTabPanelRenderChildren } from "../src/utils"

test("shouldTabPanelRenderChildren", () => {
  // when not lazy, tab panels are always rendered
  expect(shouldTabPanelRenderChildren({ isLazy: false })).toBe(true)
  expect(
    shouldTabPanelRenderChildren({ isLazy: false, isSelected: false }),
  ).toBe(true)
  expect(
    shouldTabPanelRenderChildren({ isLazy: false, hasBeenSelected: false }),
  ).toBe(true)
  expect(
    shouldTabPanelRenderChildren({
      isLazy: false,
      unmountHiddenPanels: true,
    }),
  ).toBe(true)

  // when lazy and unmounting hidden panels, tab panels are only
  // rendered when selected
  expect(
    shouldTabPanelRenderChildren({ isLazy: true, unmountHiddenPanels: true }),
  ).toBe(false)
  expect(
    shouldTabPanelRenderChildren({
      isLazy: true,
      unmountHiddenPanels: true,
      isSelected: true,
    }),
  ).toBe(true)
  expect(
    shouldTabPanelRenderChildren({
      isLazy: true,
      unmountHiddenPanels: true,
      isSelected: false,
      hasBeenSelected: true,
    }),
  ).toBe(false)

  // when lazy and leaving hidden panels mounted, tab panels are only rendered
  // when selected or if they were previously selected
  expect(shouldTabPanelRenderChildren({ isLazy: true, isSelected: true })).toBe(
    true,
  )
  expect(
    shouldTabPanelRenderChildren({
      isLazy: true,
      isSelected: false,
      hasBeenSelected: true,
    }),
  ).toBe(true)
  expect(shouldTabPanelRenderChildren({ isLazy: true })).toBe(false)
})
