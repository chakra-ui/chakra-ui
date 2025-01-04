import { defineTokens } from "../def"

export const zIndex = defineTokens.zIndex({
  hide: {
    value: -1,
  },
  base: {
    value: 0,
  },
  docked: {
    value: 10,
  },
  dropdown: {
    value: 1000,
  },
  sticky: {
    value: 1100,
  },
  banner: {
    value: 1200,
  },
  overlay: {
    value: 1300,
  },
  modal: {
    value: 1400,
  },
  popover: {
    value: 1500,
  },
  skipNav: {
    value: 1600,
  },
  toast: {
    value: 1700,
  },
  tooltip: {
    value: 1800,
  },
  max: {
    value: 2147483647,
  },
})
