import { cx, dataAttr } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useCircularProgressContext } from "./circular-progress-context"

export interface CircularProgressCircleProps extends HTMLChakraProps<"svg"> {}

export const CircularProgressCircle = forwardRef<
  SVGElement,
  CircularProgressCircleProps
>(function CircularProgressCircle(props, ref) {
  const { size, isIndeterminate } = useCircularProgressContext()

  return (
    <chakra.svg
      ref={ref}
      viewBox="0 0 100 100"
      {...props}
      className={cx("chakra-progress__circle", props.className)}
      data-indeterminate={dataAttr(isIndeterminate)}
      css={[
        {
          width: size,
          height: size,
          "&[data-indeterminate]": {
            animation: "spin 2s linear infinite",
          },
        },
        props.css,
      ]}
    />
  )
})
