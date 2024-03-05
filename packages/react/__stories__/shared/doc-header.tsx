import { chakra } from "../../src/styled-system"

export const DocHeader = chakra("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "3",
    "& > *": {
      flex: "1",
      fontSize: "sm",
      ps: "4",
    },
  },
  variants: {
    align: {
      center: {
        "& > *": { textAlign: "center" },
      },
      start: {
        "& > *": { textAlign: "start" },
      },
    },
  },
  defaultVariants: {
    align: "center",
  },
})
