import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"

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
 */

export const AbsoluteCenter = forwardRef<HTMLDivElement, AbsoluteCenterProps>(
  function AbsoluteCenter(props, ref) {
    const { axis = "both", ...rest } = props
    return (
      <chakra.div
        ref={ref}
        position="absolute"
        {...rest}
        css={[centerStyles[axis], props.css]}
      />
    )
  },
)
