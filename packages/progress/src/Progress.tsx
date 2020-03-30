import { generateStripe, getColor } from "@chakra-ui/color"
import {
  chakra,
  style,
  PropsOf,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/system"
import { isUndefined, Omit, mapResponsive } from "@chakra-ui/utils"
import * as React from "react"
import {
  getProgressProps,
  progress,
  ProgressPropsOptions,
  stripe,
} from "./Progress.utils"

export function ProgressLabel(props: PropsOf<typeof chakra.div>) {
  return <chakra.div textAlign="center" width="100%" {...props} />
}

type ProgressIndicatorProps = PropsOf<typeof chakra.div> & ProgressPropsOptions

function ProgressIndicator(props: ProgressIndicatorProps) {
  const { min, max, value, ...rest } = props
  const progress = getProgressProps({ value, min, max })

  return (
    <chakra.div
      height="100%"
      transition="all 0.3s"
      width={progress.percent ? `${progress.percent}%` : undefined}
      {...progress.bind}
      {...rest}
    />
  )
}

const sizes = {
  lg: "1rem",
  md: "0.75rem",
  sm: "0.5rem",
  xs: "0.25rem",
}

type ProgressTrackProps = Omit<PropsOf<typeof chakra.div>, "size"> & {
  size?: keyof typeof sizes
}

function ProgressTrack({ size, ...props }: ProgressTrackProps) {
  const getHeight = (val: keyof typeof sizes) => sizes[val] || val
  const height = mapResponsive(size, getHeight)

  return (
    <chakra.div
      position="relative"
      overflow="hidden"
      height={height}
      {...props}
    />
  )
}

interface ProgressProps extends ProgressTrackProps {
  color?: string
  value?: number
  min?: number
  max?: number
  size?: keyof typeof sizes
  hasStripe?: boolean
  isAnimated?: boolean
}

export function Progress(props: ProgressProps) {
  const {
    color = "blue",
    value,
    min = 0,
    max = 100,
    size = "md",
    hasStripe,
    isAnimated,
    children,
    borderRadius,
    ...rest
  } = props

  // The color of the progress track
  const trackBg = useColorModeValue(`gray.100`, `whiteAlpha.300`)
  const theme = useTheme()

  // The color of the progress indicator
  const indicatorBg = useColorModeValue(`${color}.500`, `${color}.200`)

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
  const cssStyles = style({
    ...(shouldAddStripe && stripeStyle),
    ...(shouldAnimateStripe && stripAnimation),
    ...(isIndeterminate && {
      position: "absolute",
      willChange: "left",
      minWidth: "50%",
      animation: `${progress} 1s ease infinite normal none running`,
      background: `linear-gradient(
        to right,
        transparent 0%,
        ${getColor(theme, indicatorBg)} 50%,
        transparent 100%
      )`,
    }),
  })

  return (
    <ProgressTrack
      size={size}
      bg={trackBg}
      borderRadius={borderRadius}
      {...rest}
    >
      <ProgressIndicator
        min={min}
        max={max}
        value={value}
        bg={indicatorBg}
        borderRadius={borderRadius}
        css={cssStyles}
      />
    </ProgressTrack>
  )
}
