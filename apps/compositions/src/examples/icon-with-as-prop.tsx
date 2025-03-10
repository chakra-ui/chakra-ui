import { Icon } from "@chakra-ui/react"
import { HiHeart } from "react-icons/hi"

export const IconWithAsProp = () => (
  <Icon as={HiHeart} size="lg" color="pink.700" />
)
