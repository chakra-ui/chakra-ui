/* eslint-disable jsx-a11y/alt-text */
import { Box } from "@chakra-ui/react"
import Image, { type ImageProps } from "next/image"

export const Img = (props: ImageProps) => {
  return (
    <Box
      asChild
      css={{
        marginTop: "1.7em",
        marginBottom: "1.7em",
        borderRadius: "lg",
        boxShadow: "inset",
      }}
    >
      <Image {...props} />
    </Box>
  )
}
