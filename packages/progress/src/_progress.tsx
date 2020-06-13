import { generateStripe } from "@chakra-ui/color"
import {
  chakra,
  PropsOf,
  useColorModeValue,
  useThemeDefaultProps,
} from "@chakra-ui/system"
import { isUndefined, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  getProgressProps,
  progress,
  GetProgressPropsOptions,
  stripe,
} from "./_progress.utils"

/**
 * ProgressLabel (Linear)
 *
 * Progress component used to show the numeric value of the progress.
 *
 * To style this component globally, change the styles in `theme.components.Progress`
 * under the `Label` key
 *
 * @see Docs https://chakra-ui.com/components/progress
 */
export const ProgressLabel = chakra("div", {
  themeKey: "Progress.Label",
  baseStyle: {
    top: "50%",
    left: "50%",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
})

if (__DEV__) {
  ProgressLabel.displayName = "ProgressLabel"
}

export type ProgressLabelProps = PropsOf<typeof ProgressLabel>

export type ProgressIndicatorProps = PropsOf<typeof chakra.div> &
  GetProgressPropsOptions

type CustomProps = { isIndeterminate?: boolean }

/**
 * ProgressIndicator - Theming
 *
 * To style the progress indicator global, change the styles in
 * `theme.components.Indicator`
 */
const StyledIndicator = chakra<"div", CustomProps>("div", {
  themeKey: "Progress.Indicator",
})

/**
 * ProgressIndicator (Linear)
 *
 * The progress component that visually indicates the current level of the progress bar.
 * It applies `background-color` and changes it's width.
 *
 * @see Docs https://chakra-ui.com/components/progress
 */
function ProgressIndicator(props: ProgressIndicatorProps) {
  const { min, max, value, ...rest } = props
  const progress = getProgressProps({ value, min, max })

  return (
    <StyledIndicator
      width={progress.percent ? `${progress.percent}%` : undefined}
      {...progress.bind}
      {...rest}
    />
  )
}

export type ProgressTrackProps = PropsOf<typeof chakra.div>

/**
 * ProgressTrack
 *
 * Wrapper element which houses the progress indicator and progress label.
 *
 * To style the progress track globally, change the styles in `theme.components.Progress`
 * under the `Track` key
 */
const ProgressTrack = chakra<"div", CustomProps>("div", {
  themeKey: "Progress.Track",
  baseStyle: {
    overflow: "hidden",
    position: "relative",
  },
})

interface ProgressOptions {
  /**
   * The `value` of the progress indicator.
   * If `undefined` the progress bar will be in `indeterminate` state
   */
  value?: number
  /**
   * The minimum value of the progress
   */
  min?: number
  /**
   * The maximum value of the progress
   */
  max?: number
  /**
   * If `true`, the progress bar will show stripe
   */
  hasStripe?: boolean
  /**
   * If `true`, and hasStripe is `true`, the stripes will be animated
   */
  isAnimated?: boolean
}

export type ProgressProps = ProgressOptions & PropsOf<typeof chakra.div>

/**
 * Progress (Linear)
 *
 * Progress is used to display the progress status for a task that takes a long
 * time or consists of several steps.
 *
 * It includes accessible attributes to help assistive technologies understand
 * and speak the progress values.
 *
 * @see Docs https://chakra-ui.com/components/progress
 */
export function Progress(props: ProgressProps) {
  const defaults = useThemeDefaultProps("Progress")
  const {
    size = defaults?.size,
    colorScheme = defaults?.colorScheme,
    variant = defaults?.variant,
    value,
    min = 0,
    max = 100,
    hasStripe,
    isAnimated,
    children,
    borderRadius,
    ...rest
  } = props

  /**
   * Generate a strip style for the progress bar
   */
  const stripeStyle = useColorModeValue(
    generateStripe(),
    generateStripe("1rem", "rgba(0,0,0,0.1)"),
  )

  const isIndeterminate = isUndefined(value)

  const stripAnimation = { animation: `${stripe} 1s linear infinite` }

  /**
   * We should not use stripe if it's `indeterminate`
   */
  const shouldAddStripe = !isIndeterminate && hasStripe

  const shouldAnimateStripe = shouldAddStripe && isAnimated

  /**
   * Generate styles for stripe and stripe animation
   */
  const css = {
    ...(shouldAddStripe && stripeStyle),
    ...(shouldAnimateStripe && stripAnimation),
    ...(isIndeterminate && {
      position: "absolute",
      willChange: "left",
      minWidth: "50%",
      animation: `${progress} 1s ease infinite normal none running`,
    }),
  }

  const themingProps = {
    variant,
    size,
    colorScheme,
    isIndeterminate,
    borderRadius,
  }

  return (
    <ProgressTrack {...themingProps} {...rest}>
      <ProgressIndicator
        min={min}
        max={max}
        value={value}
        css={css}
        {...themingProps}
      />
      {children}
    </ProgressTrack>
  )
}

if (__DEV__) {
  Progress.displayName = "Progress"
}
