/**@jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import { getProgressProps, rotate, spin } from "./Progress.utils"
import { chakra, PropsOf } from "@chakra-ui/system"
import { isUndefined } from "@chakra-ui/utils"

type CircleProps = PropsOf<"circle">

function Circle(props: CircleProps) {
  return <circle cx={50} cy={50} r={42} fill="transparent" {...props} />
}

type ShapeProps = PropsOf<"svg"> & {
  size?: string | number
  isIndeterminate?: boolean
}

function Shape({ size, isIndeterminate, ...props }: ShapeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      css={
        isIndeterminate &&
        css`
          animation: ${rotate} 2s linear infinite;
        `
      }
      {...props}
    />
  )
}

interface CircularProgressOptions {
  /**
   * The size of the circular progress in CSS units
   */
  size?: string | number
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
  thickness?: string | number
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
  getValueText?: (value?: number, percent?: number) => string
}

type CircularProgressProps = PropsOf<typeof chakra.div> &
  CircularProgressOptions

export function CircularProgress(props: CircularProgressProps) {
  const {
    size = "48px",
    max = 100,
    min = 0,
    valueText,
    getValueText,
    value,
    capIsRound,
    children,
    thickness = "5px",
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

  const isIndeterminate = isUndefined(progress.percent)

  const determinant = isUndefined(progress.percent)
    ? undefined
    : progress.percent * 2.64

  const strokeDasharray = isUndefined(determinant)
    ? undefined
    : `${determinant} ${264 - determinant}`

  const indicatorProps = isIndeterminate
    ? {
        css: css`
          animation: ${spin} 1.5s linear infinite;
        `,
      }
    : {
        strokeDashoffset: 66,
        strokeDasharray,
        css: css`
          transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease;
        `,
      }

  return (
    <chakra.div
      fontSize={size}
      display="inline-block"
      pos="relative"
      verticalAlign="middle"
      {...progress.bind}
      {...rest}
    >
      <Shape size={size} isIndeterminate={isIndeterminate}>
        <Circle
          stroke={trackColor}
          strokeWidth={thickness}
          data-chakra-progress-track=""
        />
        <Circle
          stroke={color}
          strokeWidth={thickness}
          data-chakra-progress-indicator=""
          strokeLinecap={capIsRound ? "round" : undefined}
          {...indicatorProps}
        />
      </Shape>
      {children}
    </chakra.div>
  )
}

export function CircularProgressLabel(props: PropsOf<typeof chakra.div>) {
  return (
    <chakra.div
      position="absolute"
      left="50%"
      top="50%"
      lineHeight="1"
      transform="translate(-50%, -50%)"
      fontSize="0.25em"
      css={{ fontVariantNumeric: "tabular-nums" }}
      {...props}
    />
  )
}
