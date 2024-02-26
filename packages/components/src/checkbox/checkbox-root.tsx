import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import { callAll, cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  PropsOf,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
import {
  CheckboxContextProvider,
  CheckboxStylesProvider,
  useCheckboxGroupContext,
} from "./checkbox-context"
import { splitCheckboxProps } from "./checkbox-props"
import { CheckboxOptions, UseCheckboxProps } from "./checkbox-types"
import { useCheckbox } from "./use-checkbox"

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
      <CheckboxStylesProvider value={styles}>
        <CheckboxContextProvider value={{ ...checkboxState, spacing }}>
          <chakra.label
            {...getRootProps(localProps)}
            __css={styles.root}
            className={cx("chakra-checkbox", className)}
          >
            <input
              {...getInputProps(inputProps, ref)}
              className="chakra-checkbox__input"
            />
            {children}
          </chakra.label>
        </CheckboxContextProvider>
      </CheckboxStylesProvider>
    )
  },
)

CheckboxRoot.displayName = "Checkbox"
