import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
import {
  FormControlProvider,
  FormControlStylesProvider,
} from "./form-control-context"
import { FormControlContext } from "./types"
import { useFormControlProvider } from "./use-form-control-provider"
import { splitFormControlProps } from "./form-control-props"

export interface FormControlProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"FormControl">,
    FormControlContext {}

/**
 * FormControl provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 *
 * @see Docs https://chakra-ui.com/docs/components/form-control
 */
export const FormControl = forwardRef<FormControlProps, "div">(
  function FormControl(props, ref) {
    const styles = useMultiStyleConfig("Form", props)
    const localProps = omitThemingProps(props)

    const [formControlProps, rootProps] = splitFormControlProps(localProps)
    const api = useFormControlProvider(formControlProps)

    const className = cx("chakra-form-control", props.className)

    return (
      <FormControlProvider value={api}>
        <FormControlStylesProvider value={styles}>
          <chakra.div
            {...api.getRootProps(rootProps, ref)}
            className={className}
            __css={styles["container"]}
          />
        </FormControlStylesProvider>
      </FormControlProvider>
    )
  },
)

FormControl.displayName = "FormControl"
