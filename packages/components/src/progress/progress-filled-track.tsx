import { defineStyle } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useProgressContext, useProgressStyles } from "./progress-context"
import { progressAnim, stripeAnim } from "./progress-utils"

export interface ProgressFilledTrackProps extends HTMLChakraProps<"div"> {}

/**
 * ProgressFilledTrack (Linear)
 *
 * The progress component that visually indicates the current level of the progress bar.
 * It applies `background-color` and changes its width.
 *
 * @see Docs https://chakra-ui.com/progress
 */
export const ProgressFilledTrack = forwardRef<ProgressFilledTrackProps, "div">(
  (props, ref) => {
    const { role, style, ...rest } = props

    const styles = useProgressStyles()

    const { hasStripe, isAnimated, isIndeterminate, computed } =
      useProgressContext()

    const shouldAddStripe = !isIndeterminate && hasStripe

    const trackStyles = defineStyle({
      height: "100%",
      ...styles.filledTrack,
      "&[data-animated]": {
        animation: `${stripeAnim} 1s linear infinite`,
      },
      "&[data-indeterminate]": {
        position: "absolute",
        willChange: "left",
        minWidth: "50%",
        animation: `${progressAnim} 1s ease infinite normal none running`,
      },
    })

    return (
      <chakra.div
        ref={ref}
        style={{ width: `${computed.percent}%`, ...style }}
        data-animated={shouldAddStripe && isAnimated ? "" : undefined}
        role="progressbar"
        data-indeterminate={isIndeterminate ? "" : undefined}
        aria-valuemax={computed.max}
        aria-valuemin={computed.min}
        aria-valuenow={isIndeterminate ? undefined : computed.value}
        aria-valuetext={computed.valueText}
        {...rest}
        __css={trackStyles}
        className={cx("chakra-progress__filled-track", props.className)}
      />
    )
  },
)
