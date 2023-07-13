import {
  chakra,
  Interpolation,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
  forwardRef,
} from "@chakra-ui/system"
import { createContext } from "@chakra-ui/react-context"
import {
  getProgressProps,
  GetProgressPropsOptions,
  progress,
  stripe,
} from "./progress.utils"

const [ProgressStylesProvider, useProgressStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `ProgressStylesContext`,
  errorMessage: `useProgressStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Progress />" `,
})

export { useProgressStyles }

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
const ProgressFilledTrack = forwardRef<ProgressFilledTrackProps, "div">(
  (props, ref) => {
    const { min, max, value, isIndeterminate, role, ...rest } = props
    const progress = getProgressProps({
      value,
      min,
      max,
      isIndeterminate,
      role,
    })

    const styles = useProgressStyles()
    const trackStyles = {
      height: "100%",
      ...styles.filledTrack,
    }

    return (
      <chakra.div
        ref={ref}
        style={{ width: `${progress.percent}%`, ...rest.style }}
        {...progress.bind}
        {...rest}
        __css={trackStyles}
      />
    )
  },
)

export interface ProgressTrackProps extends HTMLChakraProps<"div"> {}

interface ProgressOptions {
  /**
   * The `value` of the progress indicator.
   * If `undefined` the progress bar will be in `indeterminate` state
   */
  value?: number
  /**
   * The minimum value of the progress
   * @default 0
   */
  min?: number
  /**
   * The maximum value of the progress
   * @default 100
   */
  max?: number
  /**
   * If `true`, the progress bar will show stripe
   *
   * @default false
   */
  hasStripe?: boolean
  /**
   * If `true`, and hasStripe is `true`, the stripes will be animated
   *
   * @default false
   */
  isAnimated?: boolean
  /**
   * If `true`, the progress will be indeterminate and the `value`
   * prop will be ignored
   *
   * @default false
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
export const Progress = forwardRef<ProgressProps, "div">((props, ref) => {
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
    "aria-valuetext": ariaValueText,
    title,
    role,
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
    <chakra.div
      ref={ref}
      borderRadius={borderRadius}
      __css={trackStyles}
      {...rest}
    >
      <ProgressStylesProvider value={styles}>
        <ProgressFilledTrack
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-valuetext={ariaValueText}
          min={min}
          max={max}
          value={value}
          isIndeterminate={isIndeterminate}
          css={css}
          borderRadius={borderRadius}
          title={title}
          role={role}
        />
        {children}
      </ProgressStylesProvider>
    </chakra.div>
  )
})

Progress.displayName = "Progress"
