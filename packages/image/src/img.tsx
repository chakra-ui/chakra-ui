import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"

import { NativeImageOptions, NativeImage } from "./native-image"

export interface ImgProps extends HTMLChakraProps<"img">, NativeImageOptions {}

/**
 * Fallback component for most SSR users who want to use the native `img` with
 * support for chakra props
 */
export const Img = forwardRef<ImgProps, "img">((props, ref) => (
  <chakra.img ref={ref} as={NativeImage} className="chakra-image" {...props} />
))
