import { cx } from "@chakra-ui/utils/cx"
import { chakra, HTMLChakraProps } from "../system"
import { getStatusIcon, useAlertContext, useAlertStyles } from "./alert-context"

export interface AlertIconProps extends HTMLChakraProps<"span"> {}

export function AlertIcon(props: AlertIconProps) {
  const { status } = useAlertContext()
  const BaseIcon = getStatusIcon(status)
  const styles = useAlertStyles()
  const css = status === "loading" ? styles.spinner : styles.icon

  return (
    <chakra.span
      display="inherit"
      data-status={status}
      {...props}
      className={cx("chakra-alert__icon", props.className)}
      __css={css}
    >
      {props.children || <BaseIcon h="100%" w="100%" />}
    </chakra.span>
  )
}

AlertIcon.displayName = "AlertIcon"
