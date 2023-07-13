import { usePrevious } from "@chakra-ui/react-use-previous"
import { cx } from "@chakra-ui/shared-utils"
import {
  chakra,
  cssVar,
  forwardRef,
  HTMLChakraProps,
  keyframes,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  useToken,
} from "@chakra-ui/system"
import { useIsFirstRender } from "./use-is-first-render"

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
   *
   * @default false
   */
  isLoaded?: boolean
  /**
   * The animation speed in seconds
   *
   * @default 0.8
   */
  speed?: number
  /**
   * The fadeIn duration in seconds. Requires `isLoaded` toggled to `true` in order to see the transition.
   *
   * @default 0.4
   */
  fadeDuration?: number
  /**
   * If `true`, the skeleton will take the width of it's children
   * @default false
   */
  fitContent?: boolean
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

const $startColor = cssVar("skeleton-start-color")
const $endColor = cssVar("skeleton-end-color")

export type ISkeleton = SkeletonOptions

export interface SkeletonProps
  extends HTMLChakraProps<"div">,
    SkeletonOptions,
    ThemingProps<"Skeleton"> {}

const fade = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const bgFade = keyframes({
  from: {
    borderColor: $startColor.reference,
    background: $startColor.reference,
  },
  to: {
    borderColor: $endColor.reference,
    background: $endColor.reference,
  },
})

/**
 * `Skeleton` is used to display the loading state of some component.
 *
 * @see Docs https://chakra-ui.com/docs/components/skeleton
 */
export const Skeleton = forwardRef<SkeletonProps, "div">((props, ref) => {
  const skeletonProps: SkeletonProps = {
    ...props,
    fadeDuration:
      typeof props.fadeDuration === "number" ? props.fadeDuration : 0.4,
    speed: typeof props.speed === "number" ? props.speed : 0.8,
  }
  const styles = useStyleConfig("Skeleton", skeletonProps)
  const isFirstRender = useIsFirstRender()

  const {
    startColor = "",
    endColor = "",
    isLoaded,
    fadeDuration,
    speed,
    className,
    fitContent,
    ...rest
  } = omitThemingProps(skeletonProps)

  const [startColorVar, endColorVar] = useToken("colors", [
    startColor,
    endColor,
  ])

  const wasPreviouslyLoaded = usePrevious(isLoaded)

  const _className = cx("chakra-skeleton", className)

  const cssVarStyles = {
    ...(startColorVar && { [$startColor.variable]: startColorVar }),
    ...(endColorVar && { [$endColor.variable]: endColorVar }),
  }

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
    <StyledSkeleton
      ref={ref}
      className={_className}
      {...rest}
      __css={{
        width: fitContent ? "fit-content" : undefined,
        ...styles,
        ...cssVarStyles,
        _dark: { ...(styles as any)["_dark"], ...cssVarStyles },
        animation: `${speed}s linear infinite alternate ${bgFade}`,
      }}
    />
  )
})

Skeleton.displayName = "Skeleton"
