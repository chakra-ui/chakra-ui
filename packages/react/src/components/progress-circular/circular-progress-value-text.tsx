"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useCircularProgressContext } from "./circular-progress-context"

export interface CircularProgressValueTextProps
  extends HTMLChakraProps<"span"> {}

export const CircularProgressValueText = forwardRef<
  HTMLElement,
  CircularProgressValueTextProps
>(function CircularProgressValueText(props, ref) {
  const { size, computed } = useCircularProgressContext()

  return (
    <chakra.span
      ref={ref}
      {...props}
      style={{
        // @ts-ignore
        "--size": size,
      }}
      css={{
        fontSize: `calc(var(--size) * 0.2)`,
        top: "50%",
        lineHeight: "1em",
        left: "50%",
        textAlign: "center",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        fontVariantNumeric: "tabular-nums",
        ...props.css,
      }}
      className={cx("chakra-progress__value-text", props.className)}
    >
      {props.children ?? computed.value}
    </chakra.span>
  )
})
