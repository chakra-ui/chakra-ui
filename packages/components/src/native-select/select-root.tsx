import {
  ThemingProps,
  defineStyle,
  omitThemingProps,
} from "@chakra-ui/styled-system"
import { FieldOptions, splitFieldProps, useField } from "../field"
import { chakra, forwardRef, useMultiStyleConfig } from "../system"
import { SelectContextProvider, SelectStylesProvider } from "./select-context"
import { NativeSelectFieldProps } from "./select-field"

interface NativeSelectOptions extends FieldOptions {
  /**
   * The border color when the select is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the select is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
}

export interface NativeSelectRootProps
  extends NativeSelectFieldProps,
    ThemingProps<"Select">,
    NativeSelectOptions {}

/**
 * React component used to select one item from a list of options.
 *
 * @see Docs https://chakra-ui.com/docs/components/select
 */
export const NativeSelectRoot = forwardRef<NativeSelectRootProps, "select">(
  function NativeSelectRoot(props, ref) {
    const styles = useMultiStyleConfig("Select", props)

    const ownProps = omitThemingProps(props)
    const [fieldProps, localProps] = splitFieldProps(ownProps)

    const field = useField(fieldProps)

    const rootStyles = defineStyle({
      width: "100%",
      height: "fit-content",
      position: "relative",
      ...styles.root,
    })

    return (
      <chakra.div
        ref={ref}
        className="chakra-select__wrapper"
        __css={rootStyles}
        {...localProps}
      >
        <SelectContextProvider value={field}>
          <SelectStylesProvider value={styles}>
            {props.children}
          </SelectStylesProvider>
        </SelectContextProvider>
      </chakra.div>
    )
  },
)

NativeSelectRoot.displayName = "Select"