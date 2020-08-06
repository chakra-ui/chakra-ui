import { useImage } from "@chakra-ui/image"
import {
  chakra,
  omitThemingProps,
  GetProps,
  StylesProvider,
  SystemProps,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  SystemStyleObject,
  forwardRef,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import React, { cloneElement, ReactElement, ReactNode } from "react"

interface AvatarOptions {
  /**
   * The name of the person in the avatar.
   *
   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
   * - If `src` is not loaded, the name will be used to create the initials
   */
  name?: string
  /**
   * The size of the avatar.
   */
  size?: string
  /**
   * If `true`, the `Avatar` will show a border around it.
   *
   * Best for a group of avatars
   */
  showBorder?: boolean
  /**
   * The badge at the bottom right corner of the avatar.
   */
  children?: ReactNode
  /**
   * The image url of the `Avatar`
   */
  src?: string
  /**
   * List of sources to use for different screen resolutions
   */
  srcSet?: string
  /**
   * The border color of the avatar
   */
  borderColor?: SystemProps["borderColor"]
  /**
   * Function called when image failed to load
   */
  onError?(): void
  /**
   * The default avatar used as fallback when `name`, and `src`
   * is not specified.
   */
  icon?: ReactElement
  /**
   * Function to get the initials to display
   */
  getInitials?(name?: string): string
}

export interface AvatarBadgeProps extends GetProps<typeof chakra.div> {}

/**
 * AvatarBadge used to show extra badge to the top-right
 * or bottom-right corner of an avatar.
 */
export const AvatarBadge = forwardRef<AvatarBadgeProps, "div">(
  function AvatarBadge(props, ref) {
    const styles = useStyles()
    const badgeStyles = {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      right: "0",
      bottom: "0",
      ...styles.badge,
    }

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx("chakra-avatar__badge", props.className)}
        __css={badgeStyles}
      />
    )
  },
)

if (__DEV__) {
  AvatarBadge.displayName = "AvatarBadge"
}

function initials(name: string) {
  const [firstName, lastName] = name.split(" ")
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}

interface InitialsProps
  extends GetProps<typeof chakra.div>,
    Pick<AvatarOptions, "name" | "getInitials"> {}

/**
 * The avatar name container
 */
const Initials: React.FC<InitialsProps> = (props) => {
  const { name, getInitials, ...rest } = props
  const styles = useStyles()

  return (
    <chakra.div aria-label={name} {...rest} __css={styles.label}>
      {name ? getInitials?.(name) : null}
    </chakra.div>
  )
}

/**
 * Fallback avatar react component.
 * This should be a generic svg used to represent an avatar
 */
const DefaultIcon: React.FC<GetProps<"svg">> = (props) => {
  return (
    <svg
      viewBox="0 0 128 128"
      color="#fff"
      style={{ width: "100%", height: "100%" }}
      {...props}
    >
      <path
        fill="currentColor"
        d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
      />
      <path
        fill="currentColor"
        d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
      />
    </svg>
  )
}

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
  extends Omit<GetProps<typeof chakra.span>, "onError">,
    AvatarOptions,
    ThemingProps {}

/**
 * Avatar component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
export const Avatar = forwardRef<AvatarProps, "span">(function Avatar(
  props,
  ref,
) {
  const styles = useMultiStyleConfig("Avatar", props)

  const {
    src,
    name,
    showBorder,
    borderRadius = "full",
    onError,
    getInitials = initials,
    icon = <DefaultIcon />,
    children,
    ...rest
  } = omitThemingProps(props)

  const avatarStyles = {
    borderRadius,
    borderWidth: showBorder ? "2px" : undefined,
    ...baseStyle,
    ...styles.container,
  }

  return (
    <chakra.span
      ref={ref}
      {...rest}
      className={cx("chakra-avatar", props.className)}
      __css={avatarStyles}
    >
      <StylesProvider value={styles}>
        <AvatarImage
          src={src}
          onError={onError}
          getInitials={getInitials}
          name={name}
          borderRadius={borderRadius}
          icon={icon}
        />
        {children}
      </StylesProvider>
    </chakra.span>
  )
})

if (__DEV__) {
  Avatar.displayName = "Avatar"
}

type AvatarImageProps = Pick<
  AvatarProps,
  "src" | "onError" | "name" | "getInitials" | "borderRadius" | "icon"
>

const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  onError,
  getInitials,
  name,
  borderRadius,
  icon = <DefaultIcon />,
}) => {
  /**
   * use the image hook to only show the image when it has loaded
   */
  const status = useImage({ src, onError })

  const hasLoaded = status === "loaded"

  /**
   * Fallback avatar applies under 2 conditions:
   * - If `src` was passed and the image has not loaded or failed to load
   * - If `src` wasn't passed
   *
   * In this case, we'll show either the name avatar or default avatar
   */
  const showFallback = !src || (src && !hasLoaded)

  if (showFallback) {
    return name ? (
      <Initials
        className="chakra-avatar__initials"
        getInitials={getInitials}
        name={name}
      />
    ) : (
      cloneElement(icon, { role: "img" })
    )
  }

  /**
   * If `src` was passed and the image has loaded, we'll show it
   */
  return (
    <chakra.img
      src={src}
      alt={name}
      className="chakra-avatar__img"
      __css={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius,
      }}
    />
  )
}

if (__DEV__) {
  AvatarImage.displayName = "AvatarImage"
}
