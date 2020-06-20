import { Modifier } from "@popperjs/core"

export const matchWidth: Modifier<"matchWidth", any> = {
  name: "matchWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }) => {
    const reference = state.elements.reference as HTMLElement
    state.elements.popper.style.width = `${reference.offsetWidth}px`
    return () => {}
  },
}
