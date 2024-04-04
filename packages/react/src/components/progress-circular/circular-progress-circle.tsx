"use client"

import { cx, dataAttr } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useCircularProgressContext } from "./circular-progress-context"

export interface CircularProgressCircleProps extends HTMLChakraProps<"svg"> {}

export const CircularProgressCircle = forwardRef<
  SVGElement,
  CircularProgressCircleProps
>(function CircularProgressCircle(props, ref) {
  const api = useCircularProgressContext()

  return (
    <chakra.svg
      ref={ref}
      viewBox="0 0 100 100"
      {...props}
      className={cx("chakra-progress__circle", props.className)}
      data-indeterminate={dataAttr(api.indeterminate)}
      css={[
        {
          width: api.size,
          height: api.size,
          "&[data-indeterminate]": {
            animation: "spin 2s linear infinite",
          },
        },
        props.css,
      ]}
    />
  )
})
