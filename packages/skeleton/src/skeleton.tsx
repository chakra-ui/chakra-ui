import {
  chakra,
  PropsOf,
  keyframes,
  useStyleConfig,
  ThemingProps,
  omitThemingProps,
} from "@chakra-ui/system"
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
  fadeDuration?: number
}

const StyledSkeleton = chakra("div", {
  baseStyle: {
    boxShadow: "none",
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

export type SkeletonProps = PropsOf<typeof StyledSkeleton> &
  SkeletonOptions &
  ThemingProps

const fade = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

export const Skeleton = React.forwardRef(function Skeleton(
  props: SkeletonProps,
  ref: React.Ref<any>,
) {
  const styles = useStyleConfig("Skeleton", props)

  const {
    startColor,
    endColor,
    isLoaded,
    fadeDuration,
    speed,
    className,
    ...rest
  } = omitThemingProps(props)

  const _className = cx("chakra-skeleton", className)

  if (isLoaded) {
    return (
      <chakra.div
        ref={ref}
        className={_className}
        __css={{ animation: `${fade} ${fadeDuration}s` }}
        {...rest}
      />
    )
  }

  return (
    <StyledSkeleton ref={ref} className={_className} {...rest} __css={styles} />
  )
})

Skeleton.defaultProps = {
  fadeDuration: 0.4,
  speed: 0.8,
}

if (__DEV__) {
  Skeleton.displayName = "Skeleton"
}

function range(count: number) {
  return Array(count)
    .fill(1)
    .map((_, index) => index + 1)
}

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
