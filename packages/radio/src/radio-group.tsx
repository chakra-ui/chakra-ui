import { ThemingProps, chakra, PropsOf, forwardRef } from "@chakra-ui/system"
import { createContext, __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"
import {
  useRadioGroup,
  UseRadioGroupProps,
  UseRadioGroupReturn,
} from "./use-radio-group"

export interface RadioGroupContext
  extends Pick<UseRadioGroupReturn, "onChange" | "value" | "name">,
    Omit<ThemingProps, "orientation"> {}

const [RadioGroupProvider, useRadioGroupContext] = createContext<
  RadioGroupContext
>({
  name: "RadioGroupContext",
  strict: false,
})

export { useRadioGroupContext }

export type RadioGroupProps = UseRadioGroupProps &
  Omit<
    PropsOf<typeof chakra.div>,
    "onChange" | "value" | "defaultValue" | "children"
  > &
  Omit<ThemingProps, "orientation"> & { children: React.ReactNode }

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 *
 * @see Docs https://chakra-ui.com/components/radio
 */
export const RadioGroup = forwardRef(function RadioGroup(
  props: RadioGroupProps,
  ref: React.Ref<any>,
) {
  const {
    colorScheme,
    size,
    variant,
    children,
    className,
    ...otherProps
  } = props

  const { value, onChange, getRootProps, name, htmlProps } = useRadioGroup(
    otherProps,
  )

  const group = React.useMemo(
    () => ({
      name,
      size,
      onChange,
      colorScheme,
      value,
      variant,
    }),
    [size, name, onChange, colorScheme, value, variant],
  )

  const groupProps = getRootProps(htmlProps, ref)
  const _className = cx("chakra-radio-group", className)

  return (
    <RadioGroupProvider value={group}>
      <chakra.div {...groupProps} className={_className}>
        {children}
      </chakra.div>
    </RadioGroupProvider>
  )
})

if (__DEV__) {
  RadioGroup.displayName = "RadioGroup"
}
