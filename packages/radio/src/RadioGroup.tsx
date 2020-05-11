import { ThemingProps } from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useMemo, forwardRef, Ref } from "react"
import {
  useRadioGroup,
  UseRadioGroupProps,
  UseRadioGroupReturn,
} from "./RadioGroup.hook"

export type RadioGroupContext = Pick<
  UseRadioGroupReturn,
  "onChange" | "value" | "name"
> &
  Omit<ThemingProps, "orientation">

const [RadioGroupContextProvider, useRadioGroupContext] = createContext<
  RadioGroupContext
>({
  name: "RadioGroupContext",
  strict: false,
})

export { useRadioGroupContext }

export type RadioGroupProps = UseRadioGroupProps &
  Omit<ThemingProps, "orientation"> & { children: React.ReactNode }

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 *
 * @see Docs https://chakra-ui.com/radio
 */
export const RadioGroup = forwardRef(
  (props: RadioGroupProps, ref: Ref<any>) => {
    const { colorScheme, size, variant, children } = props
    const { value, onChange, getRootProps, name } = useRadioGroup(props)

    const group = useMemo(
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

    return (
      <RadioGroupContextProvider value={group}>
        <div {...getRootProps({ ref })}>{children}</div>
      </RadioGroupContextProvider>
    )
  },
)

if (__DEV__) {
  RadioGroup.displayName = "RadioGroup"
}
