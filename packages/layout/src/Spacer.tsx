import { chakra, PropsOf } from "@chakra-ui/system"

export type SpacerProps = PropsOf<typeof Spacer>

export const Spacer = chakra("div", {
  baseStyle: {
    flex: 1,
    justifySelf: "stretch",
    alignSelf: "stretch",
  },
})
