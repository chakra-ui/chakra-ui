import { createContext } from "@chakra-ui/utils"
import { SystemRecipeProps } from "../styled-system"

export interface ButtonGroupContext extends SystemRecipeProps<"Button"> {
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
