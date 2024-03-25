import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { getStatusIcon, useAlertContext, useAlertStyles } from "./alert-context"

export interface AlertIconProps extends HTMLChakraProps<"span"> {}

export function AlertIcon(props: AlertIconProps) {
  const api = useAlertContext()
  const Icon = getStatusIcon(api.status)
  const styles = useAlertStyles()

  return (
    <chakra.span
      display="inherit"
      {...props}
      className={cx("chakra-alert__icon", props.className)}
      css={[styles.icon, props.css]}
    >
      {props.children || <Icon />}
    </chakra.span>
  )
}

AlertIcon.displayName = "AlertIcon"
