import { chakra, PropsOf, keyframes } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface SkeletonOptions {
  /**
   * The color at the animation start
   */
  startColor?: string
  /**
   * The color at the animation end
   */
  endColor?: string
  /**
   * If `true`, it'll render it's children with a nice fade transition
   */
  isLoaded?: boolean
  /**
   * The animation speed in seconds
   * @default
   * 0.8
   */
  speed?: number
  /**
   * The fadeIn duration in seconds
   *
   * @default
   * 0.4
   */
  duration?: number
}

export interface Options {
  startColor?: string
  endColor?: string
  speed?: number
}

const StyledSkeleton = chakra<"div", Options>("div", {
  themeKey: "Skeleton",
  baseStyle: {
    boxShadow: "none",
    opacity: 0.7,
    borderRadius: "2px",
    //@ts-ignore - Fix this later
    backgroundClip: "padding-box",
    cursor: "default",
    color: "transparent",
    pointerEvents: "none",
    userSelect: "none",
    "&::before, &::after, *": {
      visibility: "hidden",
    },
  },
})

export type ISkeleton = SkeletonOptions

export type SkeletonProps = SkeletonOptions & PropsOf<typeof chakra.div>

const fadeIn = keyframes`
from { opacity: 0; }
to   { opacity: 1; }
`

export const Skeleton = (props: SkeletonProps) => {
  const {
    startColor,
    endColor,
    isLoaded,
    duration = 0.4,
    speed = 0.8,
    className,
    ...rest
  } = props

  const _className = cx("chakra-skeleton", className)

  if (isLoaded) {
    return (
      <chakra.div
        className={_className}
        css={{ animation: `${fadeIn} ${duration}s` }}
        {...rest}
      />
    )
  }

  return (
    <StyledSkeleton
      startColor={startColor}
      endColor={endColor}
      speed={speed}
      className={_className}
      {...rest}
    />
  )
}

if (__DEV__) {
  Skeleton.displayName = "Skeleton"
}

export const range = (count: number) =>
  Array(count)
    .fill(1)
    .map((_, idx) => idx + 1)
