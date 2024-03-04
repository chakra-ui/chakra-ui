import { usePrevious } from "@chakra-ui/hooks"
import { cx, dataAttr } from "@chakra-ui/utils"
import { keyframes } from "@emotion/react"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useRecipe,
  useToken,
} from "../../styled-system"
import { cssVar } from "../../styled-system/css-var"
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
  base: {
    boxShadow: "none",
    backgroundClip: "padding-box",
    cursor: "default",
    color: "transparent",
    pointerEvents: "none",
    userSelect: "none",
    animation: "var(--name) var(--speed) linear infinite alternate",
    "&::before, &::after, *": {
      visibility: "hidden",
    },
    "&[data-fit-content]": {
      width: "fit-content",
    },
  },
})

const $startColor = cssVar("skeleton-start-color")
const $endColor = cssVar("skeleton-end-color")

export type ISkeleton = SkeletonOptions

export interface SkeletonProps
  extends HTMLChakraProps<"div", SkeletonOptions>,
    SystemRecipeProps<"Skeleton"> {}

const fade = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const bgFade = keyframes({
  from: {
    borderColor: $startColor.ref,
    background: $startColor.ref,
  },
  to: {
    borderColor: $endColor.ref,
    background: $endColor.ref,
  },
})

/**
 * `Skeleton` is used to display the loading state of some component.
 *
 * @see Docs https://chakra-ui.com/docs/components/skeleton
 */
export const Skeleton = forwardRef<SkeletonProps, "div">(
  function Skeleton(props, ref) {
    const skeletonProps: SkeletonProps = {
      ...props,
      fadeDuration:
        typeof props.fadeDuration === "number" ? props.fadeDuration : 0.4,
      speed: typeof props.speed === "number" ? props.speed : 0.8,
    }

    const recipe = useRecipe("Skeleton")

    const [variantProps, localProps] = recipe.splitVariantProps(skeletonProps)
    const styles = recipe(variantProps)

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
    } = localProps

    const [startColorVar, endColorVar] = useToken("colors", [
      startColor,
      endColor,
    ])

    const wasLoaded = usePrevious(isLoaded)

    const _className = cx("chakra-skeleton", className)

    if (isLoaded) {
      const animation =
        isFirstRender || wasLoaded ? "none" : `${fade} ${fadeDuration}s`

      return (
        <chakra.div
          ref={ref}
          className={_className}
          css={{ animation }}
          {...rest}
        />
      )
    }

    return (
      <StyledSkeleton
        ref={ref}
        className={_className}
        data-fit-content={dataAttr(fitContent)}
        {...rest}
        css={[
          {
            "--speed": `${speed}s`,
            "--name": `${bgFade}`,
            [$startColor.var]: startColorVar,
            [$endColor.var]: endColorVar,
          },
          styles,
        ]}
      />
    )
  },
)

Skeleton.displayName = "Skeleton"
