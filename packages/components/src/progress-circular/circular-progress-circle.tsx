import { cx, dataAttr } from "@chakra-ui/utils"
import { rotateAnim } from "../progress/progress-utils"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useCircularProgressContext } from "./circular-progress-context"

export interface CircularProgressCircleProps extends HTMLChakraProps<"svg"> {}

export const CircularProgressCircle = forwardRef<
  CircularProgressCircleProps,
  "svg"
>(function CircularProgressCircle(props, ref) {
  const { size, isIndeterminate } = useCircularProgressContext()

  return (
    <chakra.svg
      ref={ref}
      viewBox="0 0 100 100"
      {...props}
      className={cx("chakra-progress__circle", props.className)}
      data-indeterminate={dataAttr(isIndeterminate)}
      __css={{
        width: size,
        height: size,
        "&[data-indeterminate]": {
          animation: `${rotateAnim} 2s linear infinite`,
        },
      }}
    />
  )
})
