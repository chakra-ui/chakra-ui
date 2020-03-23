import { chakra } from "@chakra-ui/styled"

export const Spacer = chakra("div", {
  baseStyle: {
    flex: 1,
    justifySelf: "stretch",
    alignSelf: "stretch",
  },
})
