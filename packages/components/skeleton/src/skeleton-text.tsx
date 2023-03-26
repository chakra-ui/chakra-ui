import { useBreakpointValue } from "@chakra-ui/media-query"
import { chakra } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { SkeletonProps, Skeleton } from "./skeleton"

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
/**
 * `SkeletonText` is used to display the loading state in the form of text.
 *
 * @see Docs https://chakra-ui.com/docs/components/skeleton
 */

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
    variant,
    size,
    colorScheme,
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
            variant={variant}
            size={size}
            colorScheme={colorScheme}
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

SkeletonText.displayName = "SkeletonText"
