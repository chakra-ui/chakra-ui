import {
  chakra,
  SystemStyleObject,
  HTMLChakraProps,
  forwardRef,
} from "@chakra-ui/system"

import { getProgressProps, spin } from "./progress.utils"
import { Shape } from "./shape"
import { Circle } from "./circle"

interface CircularProgressOptions {
  /**
   * The size of the circular progress in CSS units
   */
  size?: string | number
  /**
   * Maximum value defining 100% progress made (must be higher than 'min')
   * @default 100
   */
  max?: number
  /**
   * Minimum value defining 'no progress' (must be lower than 'max')
   * @default 0
   */
  min?: number
  /**
   * This defines the stroke width of the svg circle.
   * @default "10px"
   */
  thickness?: string | number
  /**
   * Current progress (must be between min/max)
   */
  value?: number
  /**
   * If `true`, the cap of the progress indicator will be rounded.
   *
   * @default false
   */
  capIsRound?: boolean
  /**
   * The content of the circular progress bar. If passed, the content will be inside and centered in the progress bar.
   */
  children?: React.ReactNode
  /**
   * The color name of the progress track. Use a color key in the theme object
   */
  trackColor?: string
  /**
   * The color of the progress indicator. Use a color key in the theme object
   */
  color?: string
  /**
   * The desired valueText to use in place of the value
   */
  valueText?: string
  /**
   * A function that returns the desired valueText to use in place of the value
   */
  getValueText?(value: number, percent: number): string
  /**
   * If `true`, the progress will be indeterminate and the `value`
   * prop will be ignored
   *
   * @default false
   */
  isIndeterminate?: boolean
}

export interface CircularProgressProps
  extends Omit<HTMLChakraProps<"div">, "color">,
    CircularProgressOptions {}

/**
 * CircularProgress is used to indicate the progress of an activity.
 * It is built using `svg` and `circle` components with support for
 * theming and `indeterminate` state
 *
 * @see Docs https://chakra-ui.com/circularprogress
 * @todo add theming support for circular progress
 */
export const CircularProgress = forwardRef<CircularProgressProps, "div">(
  (props, ref) => {
    const {
      size = "48px",
      max = 100,
      min = 0,
      valueText,
      getValueText,
      value,
      capIsRound,
      children,
      thickness = "10px",
      color = "#0078d4",
      trackColor = "#edebe9",
      isIndeterminate,
      ...rest
    } = props

    const progress = getProgressProps({
      min,
      max,
      value,
      valueText,
      getValueText,
      isIndeterminate,
    })

    const determinant = isIndeterminate
      ? undefined
      : (progress.percent ?? 0) * 2.64

    const strokeDasharray =
      determinant == null ? undefined : `${determinant} ${264 - determinant}`

    const indicatorProps = isIndeterminate
      ? {
          css: { animation: `${spin} 1.5s linear infinite` },
        }
      : {
          strokeDashoffset: 66,
          strokeDasharray,
          transitionProperty: "stroke-dasharray, stroke",
          transitionDuration: "0.6s",
          transitionTimingFunction: "ease",
        }

    const rootStyles: SystemStyleObject = {
      display: "inline-block",
      position: "relative",
      verticalAlign: "middle",
      fontSize: size,
    }

    return (
      <chakra.div
        ref={ref}
        className="chakra-progress"
        {...progress.bind}
        {...rest}
        __css={rootStyles}
      >
        <Shape size={size} isIndeterminate={isIndeterminate}>
          <Circle
            stroke={trackColor}
            strokeWidth={thickness}
            className="chakra-progress__track"
          />
          <Circle
            stroke={color}
            strokeWidth={thickness}
            className="chakra-progress__indicator"
            strokeLinecap={capIsRound ? "round" : undefined}
            /**
             * fix issue in Safari where indicator still shows when value is 0
             * @see Issue https://github.com/chakra-ui/chakra-ui/issues/3754
             */
            opacity={progress.value === 0 && !isIndeterminate ? 0 : undefined}
            {...indicatorProps}
          />
        </Shape>
        {children}
      </chakra.div>
    )
  },
)

CircularProgress.displayName = "CircularProgress"
