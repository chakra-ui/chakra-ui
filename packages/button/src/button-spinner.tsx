import { Spinner } from "@chakra-ui/spinner"
import {
  chakra,
  HTMLChakraProps,
  SystemProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

interface ButtonSpinnerProps extends HTMLChakraProps<"div"> {
  label?: string
  /**
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps["margin"]
  placement?: "start" | "end"
}

export const ButtonSpinner: React.FC<ButtonSpinnerProps> = (props) => {
  const {
    label,
    placement,
    spacing = "0.5rem",
    children = <Spinner color="currentColor" width="1em" height="1em" />,
    className,
    __css,
    ...rest
  } = props

  const _className = cx("chakra-button__spinner", className)

  const marginProp = placement === "start" ? "marginEnd" : "marginStart"

  const spinnerStyles: SystemStyleObject = React.useMemo(
    () => ({
      display: "flex",
      alignItems: "center",
      position: label ? "relative" : "absolute",
      [marginProp]: label ? spacing : 0,
      fontSize: "1em",
      lineHeight: "normal",
      ...__css,
    }),
    [__css, label, marginProp, spacing],
  )

  return (
    <chakra.div className={_className} {...rest} __css={spinnerStyles}>
      {children}
    </chakra.div>
  )
}
if (__DEV__) {
  ButtonSpinner.displayName = "ButtonSpinner"
}
