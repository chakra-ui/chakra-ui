import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface LoaderOverlayProps extends HTMLChakraProps<"div"> {}

export const LoaderOverlay = chakra("div", {
  base: {
    pos: "absolute",
    inset: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSize: "full",
    gap: "2",
  },
})
