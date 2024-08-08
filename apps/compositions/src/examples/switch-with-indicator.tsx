import { Icon } from "@chakra-ui/react"
import { Switch } from "compositions/ui/switch"
import { FaMoon, FaSun } from "react-icons/fa"

export const SwitchWithIndicator = () => {
  return (
    <Switch
      colorPalette="blue"
      onLabel={
        <Icon color="yellow.400">
          <FaSun />
        </Icon>
      }
      offLabel={
        <Icon color="gray.400">
          <FaMoon />
        </Icon>
      }
      size="lg"
    />
  )
}
