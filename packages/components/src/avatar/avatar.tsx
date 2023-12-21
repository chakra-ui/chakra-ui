import {
  defineStyle,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
} from "@chakra-ui/styled-system"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { dataAttr } from "@chakra-ui/utils/attr"
import { callAllHandlers } from "@chakra-ui/utils/call-all"
import { cx } from "@chakra-ui/utils/cx"
import { useState } from "react"
import { AvatarStylesProvider } from "./avatar-context"
import { AvatarImage } from "./avatar-image"
import { initials } from "./avatar-name"
import { AvatarOptions } from "./avatar-types"
import { GenericAvatarIcon } from "./generic-avatar-icon"

export const baseStyle = defineStyle({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "medium",
  position: "relative",
  flexShrink: 0,
})

export interface AvatarProps
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
export const Avatar = forwardRef<AvatarProps, "span">((props, ref) => {
  const styles = useMultiStyleConfig("Avatar", props)
  const [isLoaded, setIsLoaded] = useState(false)

  const {
    src,
    srcSet,
    name,
    showBorder,
    borderRadius = "full",
    onError,
    onLoad: onLoadProp,
    getInitials = initials,
    icon = <GenericAvatarIcon />,
    iconLabel = " avatar",
    loading,
    children,
    borderColor,
    ignoreFallback,
    crossOrigin,
    referrerPolicy,
    ...rest
  } = omitThemingProps(props)

  const avatarStyles: SystemStyleObject = {
    borderRadius,
    borderWidth: showBorder ? "2px" : undefined,
    ...baseStyle,
    ...styles.container,
  }

  if (borderColor) {
    avatarStyles.borderColor = borderColor
  }

  return (
    <chakra.span
      ref={ref}
      {...rest}
      className={cx("chakra-avatar", props.className)}
      data-loaded={dataAttr(isLoaded)}
      __css={avatarStyles}
    >
      <AvatarStylesProvider value={styles}>
        <AvatarImage
          src={src}
          srcSet={srcSet}
          loading={loading}
          onLoad={callAllHandlers(onLoadProp, () => {
            setIsLoaded(true)
          })}
          onError={onError}
          getInitials={getInitials}
          name={name}
          borderRadius={borderRadius}
          icon={icon}
          iconLabel={iconLabel}
          ignoreFallback={ignoreFallback}
          crossOrigin={crossOrigin}
          referrerPolicy={referrerPolicy}
        />
        {children}
      </AvatarStylesProvider>
    </chakra.span>
  )
})

Avatar.displayName = "Avatar"
