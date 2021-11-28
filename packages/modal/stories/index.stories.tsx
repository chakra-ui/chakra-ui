import { PortalManager } from "@chakra-ui/portal"
import * as React from "react"

export * from "./modal.stories"
export * from "./drawer.stories"
export * from "./focus-ref.stories"

export default {
  title: "Components / Overlay / Modal",
  decorators: [
    (StoryFn: Function) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
}
