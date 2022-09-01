import { determineLazyBehavior } from "../src"

test("determineLazyBehavior", () => {
  // when not lazy, tab panels are always rendered
  expect(determineLazyBehavior({ isLazy: false })).toBe(true)

  expect(determineLazyBehavior({ isLazy: false, isSelected: false })).toBe(true)

  expect(determineLazyBehavior({ isLazy: false, hasBeenSelected: false })).toBe(
    true,
  )
  expect(
    determineLazyBehavior({
      isLazy: false,
      lazyBehavior: "unmount",
    }),
  ).toBe(true)

  // when lazy and unmounting hidden panels, tab panels are only
  // rendered when selected
  expect(determineLazyBehavior({ isLazy: true, lazyBehavior: "unmount" })).toBe(
    false,
  )

  expect(
    determineLazyBehavior({
      isLazy: true,
      lazyBehavior: "keepMounted",
      hasBeenSelected: true,
      isSelected: false,
    }),
  ).toBe(true)

  expect(
    determineLazyBehavior({
      isLazy: true,
      lazyBehavior: "unmount",
      isSelected: true,
    }),
  ).toBe(true)

  expect(
    determineLazyBehavior({
      isLazy: true,
      lazyBehavior: "unmount",
      isSelected: false,
      hasBeenSelected: true,
    }),
  ).toBe(false)

  // when lazy and leaving hidden panels mounted, tab panels are only rendered
  // when selected or if they were previously selected
  expect(determineLazyBehavior({ isLazy: true, isSelected: true })).toBe(true)

  expect(
    determineLazyBehavior({
      isLazy: true,
      isSelected: false,
      hasBeenSelected: true,
      lazyBehavior: "keepMounted",
    }),
  ).toBe(true)

  expect(determineLazyBehavior({ isLazy: true })).toBe(false)
})
