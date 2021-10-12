import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface CenterProps extends HTMLChakraProps<"div"> {}

/**
 * React component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://chakra-ui.com/center
 */
export const Center = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
})

if (__DEV__) {
  Center.displayName = "Center"
}

export interface AbsoluteCenterProps extends HTMLChakraProps<"div"> {
  axis?: "horizontal" | "vertical" | "both"
}

const centerStyles = {
  horizontal: {
    insetStart: "50%",
    transform: "translateX(-50%)",
  },
  vertical: {
    top: "50%",
    transform: "translateY(-50%)",
  },
  both: {
    insetStart: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
}

/**
 * React component used to horizontally and vertically center an element
 * relative to its parent dimensions.
 *
 * It uses the `position: absolute` strategy.
 *
 * @see Docs https://chakra-ui.com/center
 * @see WebDev https://web.dev/centering-in-css/#5.-pop-and-plop
 */
export const AbsoluteCenter = forwardRef<AbsoluteCenterProps, "div">(
  (props, ref) => {
    const { axis = "both", ...rest } = props
    return (
      <chakra.div
        ref={ref}
        __css={centerStyles[axis]}
        {...rest}
        position="absolute"
      />
    )
  },
)
