import { ThemingProps } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import { createContext } from "@chakra-ui/react-utils"
import * as React from "react"
import {
  useCheckboxGroup,
  UseCheckboxGroupProps,
  UseCheckboxGroupReturn,
} from "./use-checkbox-group"

export interface CheckboxGroupProps
  extends UseCheckboxGroupProps,
    Omit<ThemingProps<"Checkbox">, "orientation"> {
  children?: React.ReactNode
}

export interface CheckboxGroupContext
  extends Pick<UseCheckboxGroupReturn, "onChange" | "value" | "isDisabled">,
    Omit<ThemingProps<"Checkbox">, "orientation"> {}

const [
  CheckboxGroupProvider,
  useCheckboxGroupContext,
] = createContext<CheckboxGroupContext>({
  name: "CheckboxGroupContext",
  strict: false,
})

export { useCheckboxGroupContext }

/**
 * Used for multiple checkboxes which are bound in one group,
 * and it indicates whether one or more options are selected.
 *
 * @see Docs https://chakra-ui.com/checkbox
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const { colorScheme, size, variant, children, isDisabled } = props
  const { value, onChange } = useCheckboxGroup(props)

  const group = React.useMemo(
    () => ({
      size,
      onChange,
      colorScheme,
      value,
      variant,
      isDisabled,
    }),
    [size, onChange, colorScheme, value, variant, isDisabled],
  )

  return <CheckboxGroupProvider value={group}>{children}</CheckboxGroupProvider>
}

if (__DEV__) {
  CheckboxGroup.displayName = "CheckboxGroup"
}
