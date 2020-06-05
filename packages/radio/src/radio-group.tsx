import { ThemingProps, chakra, PropsOf } from "@chakra-ui/system"
import { createContext, __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"
import {
  useRadioGroup,
  UseRadioGroupProps,
  UseRadioGroupReturn,
} from "./use-radio-group"

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
  Omit<PropsOf<typeof chakra.div>, "onChange" | "value" | "defaultValue"> &
  Omit<ThemingProps, "orientation"> & { children: React.ReactNode }

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 *
 * @see Docs https://chakra-ui.com/components/radio
 */
export const RadioGroup = React.forwardRef(
  (props: RadioGroupProps, ref: React.Ref<any>) => {
    const {
      colorScheme,
      size,
      variant,
      children,
      className,
      ...radioGroupProps
    } = props

    const {
      value,
      onChange,
      getRootProps,
      name,
      htmlProps: rest,
    } = useRadioGroup(radioGroupProps)

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

    const groupProps = getRootProps({ ref, ...rest })
    const _className = cx("chakra-radio-group", className)

    return (
      <RadioGroupContextProvider value={group}>
        <chakra.div {...groupProps} className={_className}>
          {children}
        </chakra.div>
      </RadioGroupContextProvider>
    )
  },
)

if (__DEV__) {
  RadioGroup.displayName = "RadioGroup"
}
