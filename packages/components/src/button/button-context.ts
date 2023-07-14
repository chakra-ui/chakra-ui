import { createContext } from "../shared/context"
import { ThemingProps } from "../system"

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
