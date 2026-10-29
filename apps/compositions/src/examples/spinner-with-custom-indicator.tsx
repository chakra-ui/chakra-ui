import { Spinner } from "@chakra-ui/react"
import { LuLoader } from "react-icons/lu"

export const SpinnerWithCustomIndicator = () => (
  <Spinner asChild borderWidth="0">
    <LuLoader />
  </Spinner>
)
