import { useBreakpointValue } from "@chakra-ui/media-query"
import {
  chakra,
  forwardRef,
  keyframes,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { usePrevious } from "@chakra-ui/hooks"
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
   * If `true`, it'll render its children with a nice fade transition
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

export interface SkeletonProps
  extends HTMLChakraProps<"div">,
    SkeletonOptions,
    ThemingProps<"Skeleton"> {}

const fade = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const useIsFirstRender = () => {
  const isFirstRender = React.useRef(true)

  React.useEffect(() => {
    isFirstRender.current = false
  }, [])

  return isFirstRender.current
}

export const Skeleton = forwardRef<SkeletonProps, "div">((props, ref) => {
  const styles = useStyleConfig("Skeleton", props)
  const isFirstRender = useIsFirstRender()

  const {
    startColor,
    endColor,
    isLoaded,
    fadeDuration,
    speed,
    className,
    ...rest
  } = omitThemingProps(props)

  const wasPreviouslyLoaded = usePrevious(isLoaded)

  const _className = cx("chakra-skeleton", className)

  if (isLoaded) {
    const animation =
      isFirstRender || wasPreviouslyLoaded ? "none" : `${fade} ${fadeDuration}s`

    return (
      <chakra.div
        ref={ref}
        className={_className}
        __css={{ animation }}
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

export interface SkeletonTextProps extends SkeletonProps {
  spacing?: SkeletonProps["margin"]
  skeletonHeight?: SkeletonProps["height"]
  startColor?: SkeletonProps["startColor"]
  endColor?: SkeletonProps["endColor"]
  isLoaded?: SkeletonProps["isLoaded"]
}

const defaultNoOfLines = 3

export const SkeletonText: React.FC<SkeletonTextProps> = (props) => {
  const {
    noOfLines = defaultNoOfLines,
    spacing = "0.5rem",
    skeletonHeight = "0.5rem",
    className,
    startColor,
    endColor,
    isLoaded,
    fadeDuration,
    speed,
    children,
    ...rest
  } = props

  const noOfLinesValue =
    useBreakpointValue(
      typeof noOfLines === "number" ? [noOfLines] : noOfLines,
    ) || defaultNoOfLines
  const numbers = range(noOfLinesValue)

  const getWidth = (index: number) => {
    if (noOfLinesValue > 1) {
      return index === numbers.length ? "80%" : "100%"
    }
    return "100%"
  }

  const _className = cx("chakra-skeleton__group", className)

  return (
    <chakra.div className={_className} {...rest}>
      {numbers.map((number, index) => {
        if (isLoaded && index > 0) {
          // skip other lines
          return null
        }

        const sizeProps = isLoaded
          ? null
          : {
              mb: number === numbers.length ? "0" : spacing,
              width: getWidth(number),
              height: skeletonHeight,
            }

        return (
          <Skeleton
            key={numbers.length.toString() + number}
            startColor={startColor}
            endColor={endColor}
            isLoaded={isLoaded}
            fadeDuration={fadeDuration}
            speed={speed}
            {...sizeProps}
          >
            {
              // allows animating the children
              index === 0 ? children : undefined
            }
          </Skeleton>
        )
      })}
    </chakra.div>
  )
}

if (__DEV__) {
  SkeletonText.displayName = "SkeletonText"
}

export const SkeletonCircle: React.FC<SkeletonProps> = ({
  size = "2rem",
  ...rest
}) => <Skeleton borderRadius="full" boxSize={size} {...rest} />

if (__DEV__) {
  SkeletonCircle.displayName = "SkeletonCircle"
}
