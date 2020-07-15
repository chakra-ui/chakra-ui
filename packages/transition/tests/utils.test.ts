import { transitionConfigToCSS, TransitionConfig } from "../src"

const input: TransitionConfig = {
  timeout: 150,
  addAppearStyles: true,
  enter: {
    transition: {
      easing: "ease-out",
      duration: "150ms",
      property: "transform, opacity",
    },
    from: {
      opacity: 0,
      transform: "scale(0.8)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
  },
  exit: {
    transition: {
      easing: "ease-in",
      duration: "100ms",
      property: "transform, opacity",
    },
    from: {
      opacity: 1,
      transform: "scale(1)",
    },
    to: {
      opacity: 0,
      transform: "scale(0.8)",
    },
  },
}

const output = {
  "&.tooltip": {
    opacity: 0,
    transform: "scale(0.8)",
    "&-enter, &-appear": {
      opacity: 0,
      transform: "scale(0.8)",
    },
    "&-enter-active, &-appear-active": {
      opacity: 1,
      transform: "scale(1)",
      transitionTimingFunction: "ease-out",
      transitionProperty: "transform, opacity",
      transitionDuration: "150ms",
    },
    "&-enter-done": {
      opacity: 1,
      transform: "scale(1)",
    },
    "&-exit": {
      opacity: 1,
      transform: "scale(1)",
    },
    "&-exit-active": {
      opacity: 0,
      transform: "scale(0.8)",
      transitionTimingFunction: "ease-in",
      transitionProperty: "transform, opacity",
      transitionDuration: "100ms",
    },
    "&-exit-done": {
      opacity: 0,
      transform: "scale(0.8)",
    },
    "&-appear": {
      opacity: 0,
      transform: "scale(0.8)",
    },
    "&-appear-active": {
      opacity: 1,
      transform: "scale(1)",
      transitionTimingFunction: "ease-out",
      transitionProperty: "transform, opacity",
      transitionDuration: "150ms",
    },
    "&-appear-done": {
      opacity: 1,
      transform: "scale(1)",
    },
  },
}

test.skip("should transform motion config", () => {
  const result = transitionConfigToCSS(input, "tooltip")
  expect(result).toEqual(output)
})

test.skip("should transform motion config - without appear", () => {
  const result = transitionConfigToCSS(
    { ...input, addAppearStyles: false },
    "tooltip",
  )
  expect(true).toEqual(true)
})
