import {
  chakra,
  Interpolation,
  omitThemingProps,
  StylesProvider,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  getProgressProps,
  GetProgressPropsOptions,
  progress,
  stripe,
} from "./progress.utils"

export interface ProgressLabelProps extends HTMLChakraProps<"div"> {}

/**
 * ProgressLabel is used to show the numeric value of the progress.
 * @see Docs https://chakra-ui.com/progress
 */
export const ProgressLabel: React.FC<ProgressLabelProps> = (props) => {
  const styles = useStyles()
  const labelStyles: SystemStyleObject = {
    top: "50%",
    left: "50%",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    ...styles.label,
  }
  return <chakra.div {...props} __css={labelStyles} />
}

if (__DEV__) {
  ProgressLabel.displayName = "ProgressLabel"
}

export interface ProgressFilledTrackProps
  extends HTMLChakraProps<"div">,
    GetProgressPropsOptions {}

/**
 * ProgressFilledTrack (Linear)
 *
 * The progress component that visually indicates the current level of the progress bar.
 * It applies `background-color` and changes its width.
 *
 * @see Docs https://chakra-ui.com/progress
 */
const ProgressFilledTrack: React.FC<ProgressFilledTrackProps> = (props) => {
  const { min, max, value, isIndeterminate, ...rest } = props
  const progress = getProgressProps({ value, min, max, isIndeterminate })

  const styles = useStyles()
  const trackStyles = {
    height: "100%",
    ...styles.filledTrack,
  }

  return (
    <chakra.div
      style={{
        width: `${progress.percent}%`,
        ...rest.style,
      }}
      {...progress.bind}
      {...rest}
      __css={trackStyles}
    />
  )
}

export interface ProgressTrackProps extends HTMLChakraProps<"div"> {}

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
  /**
   * If `true`, the progress will be indeterminate and the `value`
   * prop will be ignored
   */
  isIndeterminate?: boolean
}

export interface ProgressProps
  extends ProgressOptions,
    ThemingProps<"Progress">,
    HTMLChakraProps<"div"> {}

/**
 * Progress (Linear)
 *
 * Progress is used to display the progress status for a task that takes a long
 * time or consists of several steps.
 *
 * It includes accessible attributes to help assistive technologies understand
 * and speak the progress values.
 *
 * @see Docs https://chakra-ui.com/progress
 */
export const Progress: React.FC<ProgressProps> = (props) => {
  const {
    value,
    min = 0,
    max = 100,
    hasStripe,
    isAnimated,
    children,
    borderRadius: propBorderRadius,
    isIndeterminate,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...rest
  } = omitThemingProps(props)

  const styles = useMultiStyleConfig("Progress", props)

  const borderRadius =
    propBorderRadius ??
    (styles.track?.borderRadius as string | number | undefined)

  const stripeAnimation = { animation: `${stripe} 1s linear infinite` }

  /**
   * We should not use stripe if it is `indeterminate`
   */
  const shouldAddStripe = !isIndeterminate && hasStripe

  const shouldAnimateStripe = shouldAddStripe && isAnimated

  /**
   * Generate styles for stripe and stripe animation
   */
  const css: Interpolation<any> = {
    ...(shouldAnimateStripe && stripeAnimation),
    ...(isIndeterminate && {
      position: "absolute",
      willChange: "left",
      minWidth: "50%",
      animation: `${progress} 1s ease infinite normal none running`,
    }),
  }

  const trackStyles: SystemStyleObject = {
    overflow: "hidden",
    position: "relative",
    ...styles.track,
  }

  return (
    <chakra.div borderRadius={borderRadius} __css={trackStyles} {...rest}>
      <StylesProvider value={styles}>
        <ProgressFilledTrack
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          min={min}
          max={max}
          value={value}
          isIndeterminate={isIndeterminate}
          css={css}
          borderRadius={borderRadius}
        />
        {children}
      </StylesProvider>
    </chakra.div>
  )
}

if (__DEV__) {
  Progress.displayName = "Progress"
}
