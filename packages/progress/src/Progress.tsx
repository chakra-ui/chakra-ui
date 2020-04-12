import { generateStripe, getColor } from "@chakra-ui/color"
import { chakra, PropsOf, useColorModeValue, useTheme } from "@chakra-ui/system"
import { isUndefined, Omit, mapResponsive, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  getProgressProps,
  progress,
  ProgressPropsOptions,
  stripe,
} from "./Progress.utils"

/**
 * ProgressLabel
 *
 * Progress component label. In most cases it's a numeric indicator of the progress component's value
 */

export const ProgressLabel = chakra("div", { themeKey: "Progress.Label" })

///////////////////////////////////////////////////////////////////////////////////////////////////////////

type ProgressIndicatorProps = PropsOf<typeof chakra.div> & ProgressPropsOptions

/**
 * ProgressIndicator
 *
 * Visual indicator of the progress component's value
 */

const StyledIndicator = chakra("div", { themeKey: "Progress.Indicator" })

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////

type ProgressTrackProps = PropsOf<typeof chakra.div>

/**
 * ProgressTrack
 *
 * Wrapper element which houses the progress indicator and progress label
 */

const ProgressTrack = chakra("div", { themeKey: "Progress.Track" })

///////////////////////////////////////////////////////////////////////////////////////////////////////////

interface ProgressOptions {
  value?: number
  min?: number
  max?: number
  hasStripe?: boolean
  isAnimated?: boolean
}

type ProgressProps = ProgressOptions & PropsOf<typeof chakra.div>

export function Progress(props: ProgressProps) {
  const {
    size,
    colorScheme = "blue",
    value,
    min = 0,
    max = 100,
    hasStripe,
    isAnimated,
    children,
    borderRadius,
    ...rest
  } = props

  // Generate a strip style for the progress bar
  const stripeStyle = useColorModeValue(
    generateStripe(),
    generateStripe("1rem", "rgba(0,0,0,0.1)"),
  )

  const isIndeterminate = isUndefined(value)

  const stripAnimation = { animation: `${stripe} 1s linear infinite` }

  // You should not use stripe if it's indeterminate
  const shouldAddStripe = !isIndeterminate && hasStripe

  const shouldAnimateStripe = shouldAddStripe && isAnimated

  // generate custom styles
  const cssStyles = {
    ...(shouldAddStripe && stripeStyle),
    ...(shouldAnimateStripe && stripAnimation),
    ...(isIndeterminate && {
      position: "absolute",
      willChange: "left",
      minWidth: "50%",
      animation: `${progress} 1s ease infinite normal none running`,
    }),
  }

  return (
    <ProgressTrack size={size} borderRadius={borderRadius} {...rest}>
      <ProgressIndicator
        min={min}
        max={max}
        value={value}
        css={cssStyles as any}
        colorScheme={colorScheme}
        borderRadius={borderRadius}
      />
      {children}
    </ProgressTrack>
  )
}

if (__DEV__) {
  Progress.displayName = "Progress"
  ProgressLabel.displayName = "ProgressLabel"
}
