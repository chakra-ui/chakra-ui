import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useCircularProgressContext } from "./circular-progress-context"

export interface CircularProgressValueTextProps
  extends HTMLChakraProps<"span"> {}

export const CircularProgressValueText = forwardRef<
  CircularProgressValueTextProps,
  "span"
>(function CircularProgressValueText(props, ref) {
  const { size, computed } = useCircularProgressContext()

  return (
    <chakra.span
      ref={ref}
      {...props}
      css={{
        fontSize: `calc(${size} * 0.2)`,
        top: "50%",
        lineHeight: "1em",
        left: "50%",
        textAlign: "center",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        fontVariantNumeric: "tabular-nums",
      }}
      className={cx("chakra-progress__value-text", props.className)}
    >
      {props.children ?? computed.value}
    </chakra.span>
  )
})
