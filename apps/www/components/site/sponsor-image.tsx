"use client"

import { type BoxProps, Image, Square, useAvatar } from "@chakra-ui/react"
import { LuImage } from "react-icons/lu"

interface Props {
  image: string
  name: string
  size?: BoxProps["boxSize"]
}

export const SponsorImage = (props: Props) => {
  const { image, name, size = "10" } = props

  const avatar = useAvatar()

  return (
    <span {...avatar.getRootProps()}>
      <Image
        src={image}
        alt={name}
        boxSize={size}
        rounded="md"
        {...avatar.getImageProps()}
      />
      <Square color="fg.subtle" size={size} {...avatar.getFallbackProps()}>
        <LuImage />
      </Square>
    </span>
  )
}
