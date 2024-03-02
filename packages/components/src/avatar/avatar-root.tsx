import { cx, dataAttr } from "@chakra-ui/utils"
import { useState } from "react"
import { useImage } from "../image"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  defineStyle,
  forwardRef,
  useSlotRecipe,
} from "../styled-system"
import { AvatarProvider, AvatarStylesProvider } from "./avatar-context"
import { AvatarIcon } from "./avatar-icon"
import { AvatarOptions } from "./avatar-types"
import { getInitials as getInitialsFn } from "./get-initials"

export interface AvatarRootProps
  extends Omit<HTMLChakraProps<"span">, "onError">,
    AvatarOptions,
    SystemRecipeProps<"Avatar"> {
  crossOrigin?: HTMLChakraProps<"img">["crossOrigin"]
  iconLabel?: string
  /**
   * If `true`, opt out of the avatar's `fallback` logic and
   * renders the `img` at all times.
   *
   * @default false
   */
  ignoreFallback?: boolean
}

/**
 * Avatar component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
export const AvatarRoot = forwardRef<AvatarRootProps, "span">(
  function AvatarRoot(props, ref) {
    const recipe = useSlotRecipe("Avatar")

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const {
      src,
      srcSet,
      name,
      showBorder,
      borderRadius = "full",
      onError,
      onLoad: onLoadProp,
      getInitials = getInitialsFn,
      icon = <AvatarIcon />,
      iconLabel = " avatar",
      loading,
      children,
      borderColor,
      ignoreFallback,
      crossOrigin,
      referrerPolicy,
      ...rest
    } = localProps

    const [isLoaded, setIsLoaded] = useState(false)

    const status = useImage({
      src,
      onError,
      crossOrigin,
      ignoreFallback,
      onLoad(event) {
        setIsLoaded(true)
        onLoadProp?.(event)
      },
    })

    //   const bg = name ? randomColor({ string: name }) : "colors.gray.400"
    //   const isBgDark = isDark(bg)(theme)

    //   let color = "white"
    //   if (!isBgDark) color = "gray.800"

    const avatarStyles = defineStyle({
      borderRadius,
      borderWidth: showBorder ? "2px" : undefined,
      ...styles.root,
    })

    if (borderColor) {
      avatarStyles.borderColor = borderColor
    }

    return (
      <AvatarStylesProvider value={styles}>
        <AvatarProvider
          value={{
            src,
            borderRadius,
            crossOrigin,
            status,
            loading,
            srcSet,
            referrerPolicy,
            isLoaded,
            getInitials,
            icon,
            iconLabel,
            showFallback: !src || !isLoaded,
            name,
          }}
        >
          <chakra.span
            {...rest}
            ref={ref}
            className={cx("chakra-avatar", props.className)}
            data-loaded={dataAttr(isLoaded)}
            css={avatarStyles}
          >
            {children}
          </chakra.span>
        </AvatarProvider>
      </AvatarStylesProvider>
    )
  },
)

AvatarRoot.displayName = "Avatar"
