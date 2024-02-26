import { ThemingProps } from "@chakra-ui/styled-system"
import { splitProps } from "@chakra-ui/utils"
import { cx } from "@chakra-ui/utils/cx"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import {
  RadioGroupContextProvider,
  RadioThemingContextProvider,
} from "./radio-group-context"
import { splitRadioGroupProps } from "./radio-group-props"
import { useRadioGroup, UseRadioGroupProps } from "./use-radio-group"

type Omitted =
  | "onChange"
  | "value"
  | "defaultValue"
  | "defaultChecked"
  | "children"

export interface RadioGroupRootProps
  extends UseRadioGroupProps,
    Omit<HTMLChakraProps<"div">, Omitted>,
    Omit<ThemingProps<"Radio">, "orientation"> {}

/**
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 *
 * @see Docs https://chakra-ui.com/radio
 */
export const RadioGroupRoot = forwardRef<RadioGroupRootProps, "div">(
  function RadioGroupRoot(props, ref) {
    const [themingProps, restProps] = splitProps(props, [
      "variant",
      "size",
      "colorScheme",
    ])

    const [groupProps, localProps] = splitRadioGroupProps(restProps)

    const api = useRadioGroup(groupProps)

    return (
      <RadioThemingContextProvider value={themingProps}>
        <RadioGroupContextProvider value={api}>
          <chakra.div
            {...api.getRootProps(localProps, ref)}
            className={cx("chakra-radio-group", localProps.className)}
          />
        </RadioGroupContextProvider>
      </RadioThemingContextProvider>
    )
  },
)

RadioGroupRoot.displayName = "RadioGroupRoot"
