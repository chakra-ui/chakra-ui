import { ImageProps, useImage } from "@chakra-ui/image"
import { chakra, SystemStyleObject } from "@chakra-ui/system"
import { cloneElement } from "react"
import { AvatarName } from "./avatar-name"
import { GenericAvatarIcon } from "./generic-avatar-icon"

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
    onLoad,
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
      onLoad={onLoad}
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

AvatarImage.displayName = "AvatarImage"
