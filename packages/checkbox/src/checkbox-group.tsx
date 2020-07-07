import { ThemingProps } from "@chakra-ui/system/src"
import { createContext, __DEV__ } from "@chakra-ui/utils/src"
import * as React from "react"
import {
  useCheckboxGroup,
  UseCheckboxGroupProps,
  UseCheckboxGroupReturn,
} from "./use-checkbox-group"

export interface CheckboxGroupProps
  extends UseCheckboxGroupProps,
    Omit<ThemingProps, "orientation"> {
  children?: React.ReactNode
}

export type CheckboxGroupContext = Pick<
  UseCheckboxGroupReturn,
  "onChange" | "value"
> &
  Omit<ThemingProps, "orientation">

const [CheckboxGroupContextProvider, useCheckboxGroupContext] = createContext<
  CheckboxGroupContext
>({
  name: "CheckboxGroupContext",
  strict: false,
})

export { useCheckboxGroupContext }

/**
 * Used for multiple checkboxes which are bound in one group,
 * and it indicates whether one or more options are selected.
 *
 * @see Docs https://chakra-ui.com/components/checkbox
 */
export function CheckboxGroup(props: CheckboxGroupProps) {
  const { colorScheme, size, variant, children } = props
  const { value, onChange } = useCheckboxGroup(props)

  const group = React.useMemo(
    () => ({
      size,
      onChange,
      colorScheme,
      value,
      variant,
    }),
    [size, onChange, colorScheme, value, variant],
  )

  return (
    <CheckboxGroupContextProvider value={group}>
      {children}
    </CheckboxGroupContextProvider>
  )
}

if (__DEV__) {
  CheckboxGroup.displayName = "CheckboxGroup"
}
