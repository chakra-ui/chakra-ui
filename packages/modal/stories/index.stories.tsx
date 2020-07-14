import { PortalManager } from "@chakra-ui/portal"
// import { Fade, SlideFade, ScaleFade } from "@chakra-ui/transition"
import * as React from "react"
export * from "./modal.stories"
export * from "./modal.stories"
export * from "./transition.stories"
export default {
  title: "Modal",
  decorators: [
    (StoryFn: Function) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
}
