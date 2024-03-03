import { cx, dataAttr } from "@chakra-ui/utils"
import { defineStyle } from "../../styled-system"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
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
  function ProgressFilledTrack(props, ref) {
    const { role, style, ...rest } = props

    const styles = useProgressStyles()
    const api = useProgressContext()

    const shouldAddStripe = !api.isIndeterminate && api.hasStripe

    const trackStyles = defineStyle({
      "--stripe-animation": `${stripeAnim}`,
      "--progress-animation": `${progressAnim}`,
      ...styles.filledTrack,
    })

    return (
      <chakra.div
        ref={ref}
        style={{ width: `${api.computed.percent}%`, ...style }}
        data-animated={dataAttr(shouldAddStripe && api.isAnimated)}
        role="progressbar"
        data-indeterminate={dataAttr(api.isIndeterminate)}
        aria-valuemax={api.computed.max}
        aria-valuemin={api.computed.min}
        aria-valuenow={api.isIndeterminate ? undefined : api.computed.value}
        aria-valuetext={api.computed.valueText}
        {...rest}
        css={trackStyles}
        className={cx("chakra-progress__filled-track", props.className)}
      />
    )
  },
)
