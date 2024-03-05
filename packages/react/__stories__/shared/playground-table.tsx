import { chakra } from "../../src"

export const PlaygroundTable = chakra("table", {
  base: {
    marginBottom: "32px",
    borderCollapse: "collapse",
    "& td": {
      paddingRight: "8",
      paddingBottom: "8",
    },
    "& th, & thead td": {
      fontSize: "sm",
      color: "fg.muted",
    },
  },
})
