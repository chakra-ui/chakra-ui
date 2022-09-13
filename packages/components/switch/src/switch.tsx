import { useCheckbox, UseCheckboxProps } from "@chakra-ui/checkbox"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
  SystemProps,
} from "@chakra-ui/system"
import { cx, dataAttr } from "@chakra-ui/shared-utils"
import { useMemo } from "react"

export interface SwitchProps
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
export const Switch = forwardRef<SwitchProps, "input">(function Switch(
  props,
  ref,
) {
  const styles = useMultiStyleConfig("Switch", props)

  const { spacing = "0.5rem", children, ...ownProps } = omitThemingProps(props)

  const {
    state,
    getInputProps,
    getCheckboxProps,
    getRootProps,
    getLabelProps,
  } = useCheckbox(ownProps)

  const containerStyles: SystemStyleObject = useMemo(
    () => ({
      display: "inline-block",
      position: "relative",
      verticalAlign: "middle",
      lineHeight: 0,
      ...styles.container,
    }),
    [styles.container],
  )

  const trackStyles: SystemStyleObject = useMemo(
    () => ({
      display: "inline-flex",
      flexShrink: 0,
      justifyContent: "flex-start",
      boxSizing: "content-box",
      cursor: "pointer",
      ...styles.track,
    }),
    [styles.track],
  )

  const labelStyles: SystemStyleObject = useMemo(
    () => ({
      userSelect: "none",
      marginStart: spacing,
      ...styles.label,
    }),
    [spacing, styles.label],
  )

  return (
    <chakra.label
      {...getRootProps()}
      className={cx("chakra-switch", props.className)}
      __css={containerStyles}
    >
      <input className="chakra-switch__input" {...getInputProps({}, ref)} />
      <chakra.span
        {...getCheckboxProps()}
        className="chakra-switch__track"
        __css={trackStyles}
      >
        <chakra.span
          __css={styles.thumb}
          className="chakra-switch__thumb"
          data-checked={dataAttr(state.isChecked)}
          data-hover={dataAttr(state.isHovered)}
        />
      </chakra.span>
      {children && (
        <chakra.span
          className="chakra-switch__label"
          {...getLabelProps()}
          __css={labelStyles}
        >
          {children}
        </chakra.span>
      )}
    </chakra.label>
  )
})

Switch.displayName = "Switch"
