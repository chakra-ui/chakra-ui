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
  hasLoaded?: boolean
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
  fadeDuration?: number
}

const StyledSkeleton = chakra<"div", SkeletonOptions>("div", {
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

export type SkeletonProps = PropsOf<typeof StyledSkeleton>

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

export const Skeleton = React.forwardRef(function Skeleton(
  props: SkeletonProps,
  ref: React.Ref<any>,
) {
  const {
    startColor,
    endColor,
    hasLoaded,
    fadeDuration = 0.4,
    speed = 0.8,
    className,
    ...rest
  } = props

  const _className = cx("chakra-skeleton", className)

  if (hasLoaded) {
    return (
      <chakra.div
        className={_className}
        css={{ animation: `${fadeIn} ${fadeDuration}s` }}
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
})

if (__DEV__) {
  Skeleton.displayName = "Skeleton"
}

const range = (count: number) =>
  Array(count)
    .fill(1)
    .map((_, idx) => idx + 1)

export type SkeletonTextProps = SkeletonProps & {
  noOfLines?: number
  spacing?: SkeletonProps["margin"]
  skeletonHeight?: SkeletonProps["height"]
  startColor?: SkeletonProps["startColor"]
  endColor?: SkeletonProps["endColor"]
}

export function SkeletonText(props: SkeletonTextProps) {
  const {
    noOfLines = 3,
    spacing = "0.5rem",
    skeletonHeight = "0.5rem",
    className,
    startColor,
    endColor,
    ...rest
  } = props

  const numbers = range(noOfLines)

  const getWidth = (index: number) => {
    if (noOfLines > 1) {
      return index === numbers.length ? "80%" : "100%"
    }
    return "100%"
  }

  const _className = cx("chakra-skeleton__group", className)

  return (
    <chakra.div className={_className} {...rest}>
      {numbers.map((number) => (
        <Skeleton
          key={number}
          height={skeletonHeight}
          mb={number === numbers.length ? "0" : spacing}
          width={getWidth(number)}
          startColor={startColor}
          endColor={endColor}
        />
      ))}
    </chakra.div>
  )
}

if (__DEV__) {
  SkeletonText.displayName = "SkeletonText"
}

export const SkeletonCircle = ({ size = "2rem", ...rest }: SkeletonProps) => (
  <Skeleton borderRadius="full" boxSize={size} {...rest} />
)

if (__DEV__) {
  SkeletonCircle.displayName = "SkeletonCircle"
}
