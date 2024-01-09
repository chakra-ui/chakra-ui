import { ThemingProps } from "@chakra-ui/styled-system"
import { createContext } from "@chakra-ui/utils/context"

export interface ButtonGroupContext extends ThemingProps<"Button"> {
  /**
   * @default false
   */
  isDisabled?: boolean
}

export const [ButtonGroupProvider, useButtonGroup] =
  createContext<ButtonGroupContext>({
    strict: false,
    name: "ButtonGroupContext",
  })
