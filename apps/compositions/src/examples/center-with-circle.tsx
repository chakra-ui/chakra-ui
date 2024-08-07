import { Circle } from "@chakra-ui/react"
import { LuPhoneForwarded } from "react-icons/lu"

export const CenterWithCircle = () => {
  return (
    <Circle size="10" bg="blue.700" color="white">
      <LuPhoneForwarded />
    </Circle>
  )
}
