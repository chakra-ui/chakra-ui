import { callAll, cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  SlotRecipeProps,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
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
  React.ComponentPropsWithoutRef<"input">,
  "onBlur" | "checked" | "defaultChecked"
>

export interface CheckboxRootProps
  extends CheckboxControlProps,
    BaseInputProps,
    SlotRecipeProps<"Checkbox">,
    UseCheckboxProps,
    CheckboxOptions {}

export const CheckboxRoot = forwardRef<HTMLInputElement, CheckboxRootProps>(
  function Checkbox(props, ref) {
    const group = useCheckboxGroupContext()
    const mergedProps = { ...group, ...props } as CheckboxRootProps

    const recipe = useSlotRecipe("Checkbox", props.recipe)
    const [variantProps, ownProps] = recipe.splitVariantProps(mergedProps)
    const styles = recipe(variantProps)
    console.log(styles)

    const {
      children,
      isChecked: isCheckedProp,
      isDisabled = group?.isDisabled,
      onChange: onChangeProp,
      inputProps,
      ...restProps
    } = ownProps

    let isChecked = isCheckedProp
    if (group?.value && ownProps.value) {
      isChecked = group.value.includes(ownProps.value)
    }

    let onChange = onChangeProp
    if (group?.onChange && ownProps.value) {
      onChange = callAll(group.onChange, onChangeProp)
    }

    const [checkboxProps, localProps] = splitCheckboxProps(restProps)

    const api = useCheckbox({
      ...checkboxProps,
      isDisabled,
      isChecked,
      onChange,
    })

    return (
      <CheckboxStylesProvider value={styles}>
        <CheckboxContextProvider value={api}>
          <chakra.label
            {...api.getRootProps(localProps)}
            css={[styles.root, props.css]}
            className={cx("chakra-checkbox", props.className)}
          >
            <input
              {...api.getInputProps(inputProps, ref)}
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
