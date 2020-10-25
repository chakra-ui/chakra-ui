import { useCheckbox, UseCheckboxProps } from "@chakra-ui/checkbox"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  WithChakraProps,
} from "@chakra-ui/system"
import { cx, dataAttr, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

type Omitted = "defaultChecked" | "checked" | "onChange"

export interface SwitchProps
  extends Omit<UseCheckboxProps, "isIndeterminate">,
    Omit<WithChakraProps<"label">, Omitted>,
    ThemingProps {}

export const Switch = forwardRef<SwitchProps, "input">((props, ref) => {
  const styles = useMultiStyleConfig("Switch", props)

  const ownProps = omitThemingProps(props)
  const { state, getInputProps, getCheckboxProps, htmlProps } = useCheckbox(
    ownProps,
  )

  const inputProps = getInputProps({}, ref)
  const checkboxProps = getCheckboxProps()

  const labelStyles: SystemStyleObject = {
    display: "inline-block",
    verticalAlign: "middle",
    lineHeight: "normal",
  }

  const trackStyles: SystemStyleObject = {
    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "flex-start",
    boxSizing: "content-box",
    cursor: "pointer",
    ...styles.track,
  }

  return (
    <chakra.label
      {...htmlProps}
      className={cx("chakra-switch", props.className)}
      __css={labelStyles}
    >
      <input className="chakra-switch__input" {...inputProps} />
      <chakra.span
        {...checkboxProps}
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
    </chakra.label>
  )
})

if (__DEV__) {
  Switch.displayName = "Switch"
}
