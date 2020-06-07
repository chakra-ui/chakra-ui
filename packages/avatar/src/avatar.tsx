import { useImage } from "@chakra-ui/image"
import { chakra, PropsOf, SystemProps, forwardRef } from "@chakra-ui/system"
import * as React from "react"
import { cx, __DEV__ } from "@chakra-ui/utils"

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
  children?: React.ReactNode
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
  icon?: React.ReactElement
  /**
   * Function to get the initials to display
   */
  getInitials?(name?: string): string
}

/**
 * AvatarBadge
 *
 * React component used to show extra badge to the top-right
 * or bottom-right corner of an avatar.
 */
export const AvatarBadge = chakra("div", {
  themeKey: "Avatar.Badge",
  baseStyle: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: "0",
    bottom: "0",
  },
  attrs: (props) => ({
    className: cx("chakra-avatar__badge", props.className),
  }),
})

if (__DEV__) {
  AvatarBadge.displayName = "AvatarBadge"
}

export type AvatarBadgeProps = PropsOf<typeof AvatarBadge>

/**
 * Gets the initials of a user based on the name
 * @param name the name passed
 */
function initials(name: string) {
  const [firstName, lastName] = name.split(" ")

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  } else {
    return firstName.charAt(0)
  }
}

type DivProps = PropsOf<typeof chakra.div>

type InitialsAvatarProps = DivProps &
  Pick<AvatarOptions, "name" | "getInitials">

/**
 * The avatar name container
 */
const InitialsAvatar = (props: InitialsAvatarProps) => {
  const { name, getInitials, className, ...rest } = props
  const _className = cx("chakra-avatar__name", className)
  return (
    <chakra.div aria-label={name} className={_className} {...rest}>
      {name ? getInitials?.(name) : null}
    </chakra.div>
  )
}

/**
 * Fallback avatar react component.
 * This should be a generic svg used to represent an avatar
 */
const DefaultIcon = (props: PropsOf<"svg">) => (
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

export const baseStyle: SystemProps = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "medium",
  position: "relative",
  flexShrink: 0,
}

/**
 * Theming
 *
 * To style the avatar globally, change the styles in
 * `theme.components.Avatar` under the `Root` key
 */
const StyledAvatar = chakra<"span", { name?: string }>("span", {
  themeKey: "Avatar.Root",
  baseStyle,
  shouldForwardProp: (prop) => !["name"].includes(prop),
})

export type AvatarProps = PropsOf<typeof StyledAvatar> & AvatarOptions

/**
 * Avatar
 *
 * React component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
export const Avatar = forwardRef<AvatarProps, "span">(function Avatar(
  props,
  ref,
) {
  const {
    src,
    name,
    showBorder,
    borderRadius = "full",
    onError,
    getInitials = initials,
    icon = <DefaultIcon />,
    className,
    ...rest
  } = props

  // use the image hook to only show the image when it has loaded
  const status = useImage({ src, onError })

  const hasLoaded = status === "loaded"

  const getAvatar = () => {
    /**
     * If `src` was passed and the image has loaded, we'll show it
     */
    if (src && hasLoaded) {
      return (
        <chakra.img
          className="chakra-avatar__img"
          width="100%"
          height="100%"
          objectFit="cover"
          borderRadius={borderRadius}
          src={src}
          alt={name}
        />
      )
    }

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
        <InitialsAvatar getInitials={getInitials} name={name} />
      ) : (
        React.cloneElement(icon, {
          role: "img",
          className: cx("chakra-avatar__icon", icon.props.className),
        })
      )
    }
  }

  return (
    <StyledAvatar
      ref={ref}
      borderRadius={borderRadius}
      borderWidth={showBorder ? "2px" : undefined}
      name={name}
      className={cx("chakra-avatar", className)}
      {...rest}
    >
      {getAvatar()}
      {props.children}
    </StyledAvatar>
  )
})

if (__DEV__) {
  Avatar.displayName = "Avatar"
}
