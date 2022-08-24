import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
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
      {...props}
      className={cx("chakra-alert__icon", props.className)}
      __css={css}
    >
      {props.children || <BaseIcon h="100%" w="100%" />}
    </chakra.span>
  )
}

AlertIcon.displayName = "AlertIcon"
