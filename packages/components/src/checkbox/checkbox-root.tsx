import {
  SystemStyleObject,
  ThemingProps,
  omitThemingProps,
} from "@chakra-ui/styled-system"
import { callAll } from "@chakra-ui/utils/call-all"
import { cx } from "@chakra-ui/utils/cx"
import {
  HTMLChakraProps,
  PropsOf,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
import {
  CheckboxProvider,
  CheckboxStylesProvider,
  useCheckboxGroupContext,
} from "./checkbox-context"
import { splitCheckboxProps } from "./checkbox-props"
import { CheckboxOptions, UseCheckboxProps } from "./checkbox-types"
import { useCheckbox } from "./use-checkbox"

const rootStyles: SystemStyleObject = {
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  verticalAlign: "top",
  position: "relative",
}

type CheckboxControlProps = Omit<HTMLChakraProps<"div">, keyof UseCheckboxProps>

type BaseInputProps = Pick<
  PropsOf<"input">,
  "onBlur" | "checked" | "defaultChecked"
>

export interface CheckboxRootProps
  extends CheckboxControlProps,
    BaseInputProps,
    ThemingProps<"Checkbox">,
    UseCheckboxProps,
    CheckboxOptions {}

export const CheckboxRoot = forwardRef<CheckboxRootProps, "input">(
  function Checkbox(props, ref) {
    const group = useCheckboxGroupContext()

    const mergedProps = { ...group, ...props } as CheckboxRootProps

    const styles = useMultiStyleConfig("Checkbox", mergedProps)
    const ownProps = omitThemingProps(props)

    const {
      spacing = "0.5rem",
      className,
      children,
      isChecked: isCheckedProp,
      isDisabled = group?.isDisabled,
      onChange: onChangeProp,
      inputProps,
      ...rest
    } = ownProps

    let isChecked = isCheckedProp
    if (group?.value && ownProps.value) {
      isChecked = group.value.includes(ownProps.value)
    }

    let onChange = onChangeProp
    if (group?.onChange && ownProps.value) {
      onChange = callAll(group.onChange, onChangeProp)
    }

    const [checkboxProps, localProps] = splitCheckboxProps(rest)

    const checkboxState = useCheckbox({
      ...checkboxProps,
      isDisabled,
      isChecked,
      onChange,
    })

    const { getRootProps, getInputProps } = checkboxState

    return (
      <chakra.label
        __css={{ ...rootStyles, ...styles.container }}
        className={cx("chakra-checkbox", className)}
        {...getRootProps(localProps)}
      >
        <input
          className="chakra-checkbox__input"
          {...getInputProps(inputProps, ref)}
        />
        <CheckboxStylesProvider value={styles}>
          <CheckboxProvider value={{ ...checkboxState, spacing }}>
            {children}
          </CheckboxProvider>
        </CheckboxStylesProvider>
      </chakra.label>
    )
  },
)

CheckboxRoot.displayName = "Checkbox"
