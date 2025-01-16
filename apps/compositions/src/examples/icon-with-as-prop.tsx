import { Icon } from "@chakra-ui/react"
import { HiHeart } from "react-icons/hi"

export const IconWithAsProp = () => (
  <Icon as={HiHeart} fontSize="2xl" color="pink.700" />
)
