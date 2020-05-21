import { createIcon } from "@chakra-ui/icon"
import * as React from "react"

export const PlusSquareIcon = createIcon({
  displayName: "PlusSquareIcon",
  path: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
      <rect height="18" width="18" rx="2" ry="2" x="3" y="3" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </g>
  ),
})
