import { chakra, PropsOf, useColorModeValue, useToken } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { fadeInCss, getStyle } from "./Skeleton.utils"

export interface SkeletonOptions {
  /**
   * The color at the animation start
   */
  colorStart?: string
  /**
   * The color at the animation end
   */
  colorEnd?: string
  /**
   * Render only the children
   */
  isLoaded?: boolean
  /**
   * The animation speed in seconds
   */
  speed?: number
  /**
   * The fadeIn duration in seconds
   */
  duration?: number
}

const StyledSkeleton = chakra("div", {
  themeKey: "Skeleton",
})

export type ISkeleton = SkeletonOptions

export type SkeletonProps = SkeletonOptions & PropsOf<typeof chakra.div>

export const Skeleton = (props: SkeletonProps) => {
  const defaultStart = useColorModeValue("gray.100", "gray.800")
  const defaultEnd = useColorModeValue("gray.400", "gray.600")

  const {
    colorStart = defaultStart,
    colorEnd = defaultEnd,
    isLoaded,
    duration = 0.4,
    speed = 0.8,
    className,
    ...rest
  } = props

  const fadeInStyle = fadeInCss(duration)

  const fromBg = useToken("colors", colorStart)
  const toBg = useToken("colors", colorEnd)

  const skeletonStyle = getStyle({
    colorStart: fromBg,
    colorEnd: toBg,
    speed,
  })

  const _className = cx("chakra-skeleton", className)

  if (isLoaded) {
    return <chakra.div className={_className} css={fadeInStyle} {...rest} />
  }

  return (
    <StyledSkeleton
      className={_className}
      css={skeletonStyle}
      borderRadius="2px"
      {...rest}
    />
  )
}

if (__DEV__) {
  Skeleton.displayName = "Skeleton"
}
