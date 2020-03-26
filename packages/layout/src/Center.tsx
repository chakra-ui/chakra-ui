import { chakra, PropsOf } from "@chakra-ui/system"

export type CenterProps = PropsOf<typeof Center>

export const Center = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
})
