import { isDark, stringToColor } from "@chakra-ui/color"
import { useImage } from "@chakra-ui/image"
import {
  chakra,
  PropsOf,
  SystemProps,
  useColorModeValue,
} from "@chakra-ui/system"
import * as React from "react"

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
}

export type AvatarBadgeProps = PropsOf<typeof chakra.div>

/**
 * AvatarBadge
 *
 * React component used to show extra badge to the top-right
 * or bottom-right corner of an avatar.
 */
export const AvatarBadge = React.forwardRef(
  (props: AvatarBadgeProps, ref: React.Ref<any>) => {
    const borderColor = useColorModeValue("white", "gray.800")

    return (
      <chakra.div
        data-chakra-avatar-badge=""
        ref={ref}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transform="translate(25%, 25%)"
        bottom="0"
        right="0"
        border="0.2em solid"
        borderColor={borderColor}
        borderRadius="full"
        {...props}
      />
    )
  },
)

/**
 * Gets the initials of a user based on the name
 * @param name the name passed
 */
const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ")

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  } else {
    return firstName.charAt(0)
  }
}

type BoxProps = PropsOf<typeof chakra.div>

export type AvatarNameProps = BoxProps & Pick<AvatarOptions, "name">

/**
 * The avatar name container
 */
const AvatarName = ({ name, ...rest }: AvatarNameProps) => (
  <chakra.div
    data-chakra-avatar-name=""
    textAlign="center"
    textTransform="uppercase"
    fontWeight="normal"
    aria-label={name}
    {...rest}
    children={name ? getInitials(name) : null}
  />
)

/**
 * Fallback avatar react component
 * @todo make it a prop so user can pass their own
 */
const DefaultAvatar = (props: BoxProps) => (
  <chakra.div data-chakra-avatar-default="" boxSize="100%" {...props}>
    <svg fill="#fff" viewBox="0 0 128 128" role="img">
      <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
      <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
    </svg>
  </chakra.div>
)

export const baseStyle: SystemProps = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "full",
  position: "relative",
  flexShrink: 0,
}

/**
 * Theming
 *
 * To style the avatar globally, change the styles in
 * `theme.components.Avatar`
 */
const StyledAvatar = chakra("span", {
  themeKey: "Avatar",
  baseStyle,
})

export type AvatarProps = PropsOf<typeof StyledAvatar> & AvatarOptions

/**
 * Avatar
 *
 * React component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
export const Avatar = React.forwardRef(
  (props: AvatarProps, ref: React.Ref<any>) => {
    const { src, name, showBorder, borderColor, onError, ...rest } = props

    // use the image hook to only show the image when it has loaded
    const status = useImage({ src, onError })

    const hasLoaded = status === "loaded"

    const renderAvatar = () => {
      /**
       * If `src` was passed and the image has loaded, we'll show it
       */
      if (src && hasLoaded) {
        return (
          <chakra.img
            data-chakra-avatar-img=""
            size="100%"
            borderRadius="full"
            objectFit="cover"
            src={src}
            alt={name}
          />
        )
      }

      /**
       * If `src` was passed and the image has not loaded or failed
       * to load, we'll show either the name avatar or default avatar
       */
      if (src && !hasLoaded) {
        return name ? (
          <AvatarName name={name} />
        ) : (
          <DefaultAvatar aria-label={name} />
        )
      }

      /**
       * If `src` wasn't passed, we'll show either the name avatar or default avatar
       * depending on if the name was passed
       */
      if (!src) {
        return name ? (
          <AvatarName name={name} />
        ) : (
          <DefaultAvatar aria-label={name} />
        )
      }
    }

    const bg = name ? stringToColor(name) : "gray.400"

    const color = name ? (isDark(bg) ? "#fff" : "gray.800") : "#fff"

    const defaultBorderColor = useColorModeValue("#fff", "gray.800")

    const styleProps = {
      bg,
      color,
      ...(showBorder && {
        border: "2px solid",
        borderColor: borderColor || defaultBorderColor,
      }),
    }

    return (
      <StyledAvatar
        ref={ref}
        data-chakra-avatar=""
        verticalAlign="top"
        {...styleProps}
        {...rest}
      >
        {renderAvatar()}
        {props.children}
      </StyledAvatar>
    )
  },
)
