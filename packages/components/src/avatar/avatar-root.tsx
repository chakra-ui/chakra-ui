import {
  defineStyle,
  omitThemingProps,
  ThemingProps,
} from "@chakra-ui/styled-system"
import { dataAttr } from "@chakra-ui/utils/attr"
import { cx } from "@chakra-ui/utils/cx"
import { useState } from "react"
import { useImage } from "../image"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
import { AvatarProvider, AvatarStylesProvider } from "./avatar-context"
import { AvatarIcon } from "./avatar-icon"
import { AvatarOptions } from "./avatar-types"
import { getInitials as getInitialsFn } from "./get-initials"

export interface AvatarRootProps
  extends Omit<HTMLChakraProps<"span">, "onError">,
    AvatarOptions,
    ThemingProps<"Avatar"> {
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
export const AvatarRoot = forwardRef<AvatarRootProps, "span">((props, ref) => {
  const styles = useMultiStyleConfig("Avatar", props)

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
  } = omitThemingProps(props)

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
          ref={ref}
          {...rest}
          className={cx("chakra-avatar", props.className)}
          data-loaded={dataAttr(isLoaded)}
          __css={avatarStyles}
        >
          {children}
        </chakra.span>
      </AvatarProvider>
    </AvatarStylesProvider>
  )
})

AvatarRoot.displayName = "Avatar"
