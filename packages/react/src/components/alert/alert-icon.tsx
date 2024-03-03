import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra } from "../../styled-system"
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
      css={[css, props.css]}
    >
      {props.children || <BaseIcon h="100%" w="100%" />}
    </chakra.span>
  )
}

AlertIcon.displayName = "AlertIcon"
