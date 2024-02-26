import { ImageProps } from "../image"
import { chakra } from "../system"
import { useAvatarContext } from "./avatar-context"

export interface AvatarImageProps extends ImageProps {}

export function AvatarImage(props: AvatarImageProps) {
  const {
    borderRadius,
    src,
    name,
    srcSet,
    loading,
    referrerPolicy,
    crossOrigin,
    showFallback,
  } = useAvatarContext()

  if (showFallback) return null

  /**
   * If `src` was passed and the image has loaded, we'll show it
   */
  return (
    <chakra.img
      src={src}
      srcSet={srcSet}
      alt={name}
      referrerPolicy={referrerPolicy}
      crossOrigin={crossOrigin}
      className="chakra-avatar__img"
      loading={loading}
      __css={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius,
      }}
      {...props}
    />
  )
}

AvatarImage.displayName = "AvatarImage"
