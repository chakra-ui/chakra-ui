import {
  chakra,
  forwardRef,
  ThemingProps,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { createContext } from "@chakra-ui/react-context"
import {
  useRadioGroup,
  UseRadioGroupProps,
  UseRadioGroupReturn,
} from "./use-radio-group"
import { useMemo } from "react"

export interface RadioGroupContext
  extends Pick<
      UseRadioGroupReturn,
      "onChange" | "value" | "name" | "isDisabled" | "isFocusable"
    >,
    Omit<ThemingProps<"Radio">, "orientation"> {}

const [RadioGroupProvider, useRadioGroupContext] =
  createContext<RadioGroupContext>({
    name: "RadioGroupContext",
    strict: false,
  })

export { useRadioGroupContext }

type Omitted =
  | "onChange"
  | "value"
  | "defaultValue"
  | "defaultChecked"
  | "children"
export interface RadioGroupProps
  extends UseRadioGroupProps,
    Omit<HTMLChakraProps<"div">, Omitted>,
    Omit<ThemingProps<"Radio">, "orientation"> {
  children: React.ReactNode
}

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 *
 * @see Docs https://chakra-ui.com/radio
 */
export const RadioGroup = forwardRef<RadioGroupProps, "div">((props, ref) => {
  const {
    colorScheme,
    size,
    variant,
    children,
    className,
    isDisabled,
    isFocusable,
    ...rest
  } = props

  const { value, onChange, getRootProps, name, htmlProps } = useRadioGroup(rest)

  const group = useMemo(
    () => ({
      name,
      size,
      onChange,
      colorScheme,
      value,
      variant,
      isDisabled,
      isFocusable,
    }),
    [
      name,
      size,
      onChange,
      colorScheme,
      value,
      variant,
      isDisabled,
      isFocusable,
    ],
  )

  return (
    <RadioGroupProvider value={group}>
      <chakra.div
        {...getRootProps(htmlProps as any, ref)}
        className={cx("chakra-radio-group", className)}
      >
        {children}
      </chakra.div>
    </RadioGroupProvider>
  )
})

RadioGroup.displayName = "RadioGroup"
