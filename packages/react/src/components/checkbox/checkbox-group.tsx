import { useMemo } from "react"
import { SystemRecipeProps } from "../../styled-system"
import { CheckboxGroupProvider } from "./checkbox-context"
import { UseCheckboxGroupProps } from "./checkbox-types"
import { useCheckboxGroup } from "./use-checkbox-group"

export interface CheckboxGroupProps
  extends UseCheckboxGroupProps,
    Omit<SystemRecipeProps<"Checkbox">, "orientation"> {
  children?: React.ReactNode
}

/**
 * Used for multiple checkboxes which are bound in one group,
 * and it indicates whether one or more options are selected.
 *
 * @see Docs https://chakra-ui.com/checkbox
 */
export function CheckboxGroup(props: CheckboxGroupProps) {
  const { colorScheme, size, variant, children, isDisabled } = props
  const { value, onChange } = useCheckboxGroup(props)

  const group = useMemo(
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

  return <CheckboxGroupProvider value={group} children={children} />
}

CheckboxGroup.displayName = "CheckboxGroup"
