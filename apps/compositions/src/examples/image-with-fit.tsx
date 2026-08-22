import { Image } from "@chakra-ui/react"

export const ImageWithFit = () => (
  <Image
    border="1px solid red"
    rounded="md"
    h="200px"
    w="300px"
    fit="contain"
    src="https://i.pravatar.cc/300?img=2"
  />
)
