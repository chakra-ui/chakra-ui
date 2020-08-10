import * as React from "react"
import { getProgressProps, rotate, spin } from "./progress.utils"
import { chakra, PropsOf } from "@chakra-ui/system"
import { isUndefined, __DEV__, StringOrNumber } from "@chakra-ui/utils"

interface CircleProps extends PropsOf<typeof chakra.circle> {}

const Circle: React.FC<CircleProps> = (props) => (
  <chakra.circle cx={50} cy={50} r={42} fill="transparent" {...props} />
)

if (__DEV__) {
  Circle.displayName = "Circle"
}

interface ShapeProps extends PropsOf<typeof chakra.svg> {
  size?: StringOrNumber
  isIndeterminate?: boolean
}

const Shape: React.FC<ShapeProps> = (props) => {
  const { size, isIndeterminate, ...rest } = props
  return (
    <chakra.svg
      viewBox="0 0 100 100"
      __css={{
        width: size,
        height: size,
        animation: isIndeterminate ? `${rotate} 2s linear infinite` : undefined,
      }}
      {...rest}
    />
  )
}

if (__DEV__) {
  Shape.displayName = "Shape"
}

interface CircularProgressOptions {
  /**
   * The size of the circular progress in CSS units
   */
  size?: StringOrNumber
  /**
   * Maximum value defining 100% progress made (must be higher than 'min')
   */
  max?: number
  /**
   * Minimum value defining 'no progress' (must be lower than 'max')
   */
  min?: number
  /**
   * The thickness of progress indicator as a ratio of `size`. Must be between `0` and `1`
   */
  thickness?: StringOrNumber
  /**
   * Current progress (must be between min/max)
   */
  value?: number
  /**
   * If `true`, the cap of the progress indicator will be rounded.
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
}

export interface CircularProgressProps
  extends Omit<PropsOf<typeof chakra.div>, "color">,
    CircularProgressOptions {}

/**
 * CircularProgress is used to indicate the progress of an activity.
 * It's built using `svg` and `circle` components with support for
 * theming and `indeterminate` state
 *
 * @see Docs https://chakra-ui.com/components/progress
 * @todo add theming support for circular progress
 */
export const CircularProgress: React.FC<CircularProgressProps> = (props) => {
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
    ...rest
  } = props

  const progress = getProgressProps({
    min,
    max,
    value,
    valueText,
    getValueText,
  })

  const isIndeterminate = progress.isIndeterminate

  const determinant = progress.isIndeterminate
    ? undefined
    : (progress.percent ?? 0) * 2.64

  const strokeDasharray = isUndefined(determinant)
    ? undefined
    : `${determinant} ${264 - determinant}`

  const indicatorProps = isIndeterminate
    ? {
        css: { animation: `${spin} 1.5s linear infinite` },
      }
    : {
        strokeDashoffset: 66,
        strokeDasharray,
        transition: `stroke-dasharray 0.6s ease 0s, stroke 0.6s ease`,
      }

  const rootStyles = {
    display: "inline-block",
    position: "relative",
    verticalAlign: "middle",
    fontSize: size,
  }

  return (
    <chakra.div
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
          {...indicatorProps}
        />
      </Shape>
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  CircularProgress.displayName = "CircularProgress"
}

/**
 * CircularProgress component label. In most cases it's a numeric indicator
 * of the circular progress component's value
 */
export const CircularProgressLabel = chakra("div", {
  baseStyle: {
    fontSize: "0.24em",
    top: "50%",
    left: "50%",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
})

if (__DEV__) {
  CircularProgressLabel.displayName = "CircularProgressLabel"
}

export interface CircularProgressLabelProps
  extends PropsOf<typeof CircularProgressLabel> {}
