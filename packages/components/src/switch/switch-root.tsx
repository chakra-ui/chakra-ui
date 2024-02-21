import {
  defineStyle,
  omitThemingProps,
  SystemProps,
  ThemingProps,
} from "@chakra-ui/styled-system"
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
    ThemingProps<"Switch"> {
  /**
   * The spacing between the switch and its label text
   * @default 0.5rem
   * @type SystemProps["marginLeft"]
   */
  spacing?: SystemProps["marginLeft"]
}

/**
 * The `Switch` component is used as an alternative for the checkbox component for switching between "enabled" and "disabled" states.
 *
 * @see Docs https://chakra-ui.com/docs/components/switch
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/switch/
 */
export const SwitchRoot = forwardRef<SwitchRootProps, "input">(
  function SwitchRoot(props, ref) {
    const styles = useMultiStyleConfig("Switch", props)

    const {
      spacing = "0.5rem",
      children,
      ...ownProps
    } = omitThemingProps(props)

    const [checkboxProps, localProps] = splitCheckboxProps(ownProps)
    const api = useCheckbox(checkboxProps)

    const rootStyles = defineStyle({
      display: "inline-block",
      position: "relative",
      verticalAlign: "middle",
      lineHeight: 0,
      ...styles.root,
    })

    return (
      <chakra.label
        {...api.getRootProps(localProps)}
        className={cx("chakra-switch", props.className)}
        __css={rootStyles}
      >
        <input
          className="chakra-switch__input"
          {...api.getInputProps({}, ref)}
        />
        <SwitchStylesProvider value={styles}>
          <SwitchContextProvider value={{ ...api, spacing }}>
            {children}
          </SwitchContextProvider>
        </SwitchStylesProvider>
      </chakra.label>
    )
  },
)

SwitchRoot.displayName = "Switch"
