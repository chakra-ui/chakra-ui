"use client"

import { chakra } from "@chakra-ui/react"

export const PlaygroundTable = chakra("table", {
  base: {
    width: "full",
    marginBottom: "32px",
    borderCollapse: "collapse",
    "& td:not(.chakra-table__cell)": {
      paddingRight: "8",
      paddingBottom: "8",
    },
    "& th:not(.chakra-table__column-header)": {
      fontSize: "sm",
      color: "fg.muted",
    },
    "& thead td:not(.chakra-table__cell)": {
      fontSize: "sm",
      color: "fg.muted",
    },
  },
})
