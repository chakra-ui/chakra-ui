import { TransitionConfig } from "../transition-config"

export const scaleFade: TransitionConfig = {
  timeout: { enter: 100, exit: 75 },
  enter: {
    transition: {
      duration: "100ms",
      easing: "ease-out",
      property: "common",
    },
    from: { opacity: 0.01, transform: "scale(0.95)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
  exit: {
    transition: {
      duration: "75ms",
      easing: "ease-in",
      property: "common",
    },
    from: { opacity: 1, transform: "scale(1)" },
    to: { opacity: 0.01, transform: "scale(0.95)" },
  },
}
