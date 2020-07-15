import { TransitionConfig } from "../transition-config"

export type SlidePlacement = "left" | "right" | "bottom" | "top"

const placements = {
  bottom: {
    maxWidth: "100vw",
    bottom: 0,
    left: 0,
    right: 0,
  },
  top: {
    maxWidth: "100vw",
    top: 0,
    left: 0,
    right: 0,
  },
  left: {
    width: "100%",
    height: "100vh",
    left: 0,
    top: 0,
  },
  right: {
    width: "100%",
    right: 0,
    top: 0,
    height: "100vh",
  },
}

const axis = {
  left: "X",
  right: "X",
  top: "Y",
  bottom: "Y",
}

const offset = {
  bottom: "100%",
  top: "-100%",
  left: "-100%",
  right: "100%",
}

const trans = (placement: SlidePlacement, value: string) => {
  if (["top", "bottom"].includes(placement)) {
    return `translate3d(0, ${value}, 0)`
  }
  return `translate3d(${value}, 0, 0)`
}

export const createSlideConfig = (
  placement: SlidePlacement,
): Partial<TransitionConfig> => ({
  enter: {
    from: { transform: trans(placement, offset[placement]) },
    to: { transform: trans(placement, "0%") },
  },
  exit: {
    from: { transform: trans(placement, "0%") },
    to: { transform: trans(placement, offset[placement]) },
  },
})

export const createSlideBaseStyle = (placement: SlidePlacement) =>
  placements[placement]
