import { motionConfigToCSS, MotionConfig } from "../src"

const input: MotionConfig = {
  timeout: 150,
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
    "&-enter": {
      opacity: 0,
      transform: "scale(0.8)",
    },
    "&-enter-active": {
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
  },
}

test("should transform motion config", () => {
  const result = motionConfigToCSS(input, "tooltip")
  expect(result).toEqual(output)
})
