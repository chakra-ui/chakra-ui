import { createChakra } from "@chakra-ui/system"

export const Spacer = createChakra("div", {
  baseStyle: {
    flex: 1,
    justifySelf: "stretch",
    alignSelf: "stretch",
  },
})

export default Spacer
