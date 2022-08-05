import { ImageProps, useImage } from "@chakra-ui/image"
import { chakra, ChakraComponent, SystemStyleObject } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import { cloneElement } from "react"
import { AvatarName } from "./avatar-name"

type AvatarImageProps = ImageProps & {
  getInitials?: (name: string) => string
  borderRadius?: SystemStyleObject["borderRadius"]
  icon: React.ReactElement
  iconLabel?: string
  name?: string
}

export function AvatarImage(props: AvatarImageProps) {
  const {
    src,
    srcSet,
    onError,
    getInitials,
    name,
    borderRadius,
    loading,
    iconLabel,
    icon = <GenericAvatarIcon />,
    ignoreFallback,
    referrerPolicy,
  } = props

  /**
   * use the image hook to only show the image when it has loaded
   */
  const status = useImage({ src, onError, ignoreFallback })

  const hasLoaded = status === "loaded"

  /**
   * Fallback avatar applies under 2 conditions:
   * - If `src` was passed and the image has not loaded or failed to load
   * - If `src` wasn't passed
   *
   * In this case, we'll show either the name avatar or default avatar
   */
  const showFallback = !src || !hasLoaded

  if (showFallback) {
    return name ? (
      <AvatarName
        className="chakra-avatar__initials"
        getInitials={getInitials}
        name={name}
      />
    ) : (
      cloneElement(icon, {
        role: "img",
        "aria-label": iconLabel,
      })
    )
  }

  /**
   * If `src` was passed and the image has loaded, we'll show it
   */
  return (
    <chakra.img
      src={src}
      srcSet={srcSet}
      alt={name}
      referrerPolicy={referrerPolicy}
      className="chakra-avatar__img"
      loading={loading}
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

/**
 * Fallback avatar react component.
 * This should be a generic svg used to represent an avatar
 */
export const GenericAvatarIcon: ChakraComponent<"svg"> = (props) => (
  <chakra.svg
    viewBox="0 0 128 128"
    color="#fff"
    width="100%"
    height="100%"
    className="chakra-avatar__svg"
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
  </chakra.svg>
)
