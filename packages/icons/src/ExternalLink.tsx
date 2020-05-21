import { createIcon } from "@chakra-ui/icon"
import * as React from "react"

export const ExternalLinkIcon = createIcon({
  displayName: "ExternalLinkIcon",
  path: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
    </g>
  ),
})
