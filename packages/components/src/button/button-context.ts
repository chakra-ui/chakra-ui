import { createContext } from "@chakra-ui/utils/context"
import { ThemingProps } from "../styled-system"

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
