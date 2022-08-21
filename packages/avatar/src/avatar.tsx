import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { AvatarStylesProvider } from "./avatar-context"
import { AvatarImage } from "./avatar-image"
import { GenericAvatarIcon } from "./generic-avatar-icon"
import { initials } from "./avatar-name"
import { AvatarOptions } from "./avatar-types"

export const baseStyle: SystemStyleObject = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "medium",
  position: "relative",
  flexShrink: 0,
}

export interface AvatarProps
  extends Omit<HTMLChakraProps<"span">, "onError">,
    AvatarOptions,
    ThemingProps<"Avatar"> {
  iconLabel?: string
  /**
   * If `true`, opt out of the avatar's `fallback` logic and
   * renders the `img` at all times.
   */
  ignoreFallback?: boolean
}

/**
 * Avatar component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
export const Avatar = forwardRef<AvatarProps, "span">((props, ref) => {
  const styles = useMultiStyleConfig("Avatar", props)

  const {
    src,
    srcSet,
    name,
    showBorder,
    borderRadius = "full",
    onError,
    getInitials = initials,
    icon = <GenericAvatarIcon />,
    iconLabel = " avatar",
    loading,
    children,
    borderColor,
    ignoreFallback,
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
      __css={avatarStyles}
    >
      <AvatarStylesProvider value={styles}>
        <AvatarImage
          src={src}
          srcSet={srcSet}
          loading={loading}
          onError={onError}
          getInitials={getInitials}
          name={name}
          borderRadius={borderRadius}
          icon={icon}
          iconLabel={iconLabel}
          ignoreFallback={ignoreFallback}
        />
        {children}
      </AvatarStylesProvider>
    </chakra.span>
  )
})

Avatar.displayName = "Avatar"
