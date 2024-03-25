import { callAllHandlers, cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra, mergeRefs } from "../../styled-system"
import { useAvatarContext, useAvatarStyles } from "./avatar-context"

export interface AvatarImageProps extends HTMLChakraProps<"img"> {}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  function AvatarImage(props, ref) {
    const api = useAvatarContext()
    const styles = useAvatarStyles()
    return (
      <chakra.img
        ref={mergeRefs(api.imageRef, ref)}
        {...props}
        className={cx("chakra-avatar__img", props.className)}
        hidden={!api.isLoaded}
        onLoad={callAllHandlers(props.onLoad, api.setLoaded)}
        onError={callAllHandlers(props.onError, api.setError)}
        css={[styles.image, props.css]}
      />
    )
  },
)

AvatarImage.displayName = "AvatarImage"
