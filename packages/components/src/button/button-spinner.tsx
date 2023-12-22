import { defineStyle } from "@chakra-ui/styled-system"
import { chakra, HTMLChakraProps } from "../system"
import { cx } from "@chakra-ui/utils/cx"
import { useMemo } from "react"
import { Spinner } from "../spinner"
import { ButtonSpinnerOptions } from "./button-types"

interface ButtonSpinnerProps
  extends HTMLChakraProps<"div">,
    ButtonSpinnerOptions {}

export function ButtonSpinner(props: ButtonSpinnerProps) {
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

  const spinnerStyles = useMemo(
    () =>
      defineStyle({
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
ButtonSpinner.displayName = "ButtonSpinner"
