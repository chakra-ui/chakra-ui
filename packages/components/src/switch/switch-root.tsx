import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import { useCheckbox, UseCheckboxProps } from "../checkbox"
import { splitCheckboxProps } from "../checkbox/checkbox-props"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
import { SwitchContextProvider, SwitchStylesProvider } from "./switch-context"

export interface SwitchRootProps
  extends Omit<UseCheckboxProps, "isIndeterminate">,
    Omit<HTMLChakraProps<"label">, keyof UseCheckboxProps>,
    ThemingProps<"Switch"> {}

/**
 * The `Switch` component is used as an alternative for the checkbox component for switching between "enabled" and "disabled" states.
 *
 * @see Docs https://chakra-ui.com/docs/components/switch
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/switch/
 */
export const SwitchRoot = forwardRef<SwitchRootProps, "input">(
  function SwitchRoot(props, ref) {
    const styles = useMultiStyleConfig("Switch", props)
    const ownProps = omitThemingProps(props)

    const [checkboxProps, localProps] = splitCheckboxProps(ownProps)
    const api = useCheckbox(checkboxProps)

    return (
      <SwitchStylesProvider value={styles}>
        <SwitchContextProvider value={api}>
          <chakra.label
            {...api.getRootProps(localProps)}
            className={cx("chakra-switch", props.className)}
            __css={styles.root}
          >
            <input
              className="chakra-switch__input"
              {...api.getInputProps({}, ref)}
            />
            {localProps.children}
          </chakra.label>
        </SwitchContextProvider>
      </SwitchStylesProvider>
    )
  },
)

SwitchRoot.displayName = "SwitchRoot"
