import { chakra, ChakraComponent, HTMLChakraProps } from "@chakra-ui/react"
import NextImage, { ImageProps as NextImageProps } from "next/image"

export type ImageProps = NextImageProps &
  Omit<HTMLChakraProps<"img">, keyof NextImageProps>

export const Image: ChakraComponent<"img", NextImageProps> = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      "src",
      "alt",
      "width",
      "height",
      "fill",
      "loader",
      "quality",
      "priority",
      "loading",
      "placeholder",
      "blurDataURL",
      "unoptimized",
      "onLoadingComplete",
    ].includes(prop),
})
