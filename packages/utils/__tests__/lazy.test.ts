import { lazyDisclosure } from "../src/lazy"

test("lazyDisclosure", () => {
  // when not lazy, tab panels are always rendered
  expect(lazyDisclosure({ enabled: false })).toBe(true)

  expect(lazyDisclosure({ enabled: false, isSelected: false })).toBe(true)

  expect(lazyDisclosure({ enabled: false, wasSelected: false })).toBe(true)
  expect(
    lazyDisclosure({
      enabled: false,
      mode: "unmount",
    }),
  ).toBe(true)

  // when lazy and unmounting hidden panels, tab panels are only
  // rendered when selected
  expect(lazyDisclosure({ enabled: true, mode: "unmount" })).toBe(false)

  expect(
    lazyDisclosure({
      enabled: true,
      mode: "keepMounted",
      wasSelected: true,
      isSelected: false,
    }),
  ).toBe(true)

  expect(
    lazyDisclosure({
      enabled: true,
      mode: "unmount",
      isSelected: true,
    }),
  ).toBe(true)

  expect(
    lazyDisclosure({
      enabled: true,
      mode: "unmount",
      isSelected: false,
      wasSelected: true,
    }),
  ).toBe(false)

  // when lazy and leaving hidden panels mounted, tab panels are only rendered
  // when selected or if they were previously selected
  expect(lazyDisclosure({ enabled: true, isSelected: true })).toBe(true)

  expect(
    lazyDisclosure({
      enabled: true,
      isSelected: false,
      wasSelected: true,
      mode: "keepMounted",
    }),
  ).toBe(true)

  expect(lazyDisclosure({ enabled: true })).toBe(false)
})
