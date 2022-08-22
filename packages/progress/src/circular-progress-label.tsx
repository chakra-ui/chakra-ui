import { chakra, HTMLChakraProps } from "@chakra-ui/system"

export interface CircularProgressLabelProps extends HTMLChakraProps<"div"> {}

/**
 * CircularProgress component label. In most cases it is a numeric indicator
 * of the circular progress component's value
 */
export const CircularProgressLabel = chakra("div", {
  baseStyle: {
    fontSize: "0.24em",
    top: "50%",
    left: "50%",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
})

CircularProgressLabel.displayName = "CircularProgressLabel"
