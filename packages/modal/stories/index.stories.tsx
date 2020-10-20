import { PortalManager } from "@chakra-ui/portal"
import * as React from "react"

export * from "./modal.stories"
export * from "./modal.stories"
export * from "./drawer.stories"
export * from "./focus-ref.stories"

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
