import { Icon, IconProps } from "@chakra-ui/icon"
import { cx } from "@chakra-ui/shared-utils"
import { CheckIcon } from "./icons"
import { useStepContext, useStepperStyles } from "./step-context"

export function StepIcon(props: IconProps) {
  const { status } = useStepContext()
  const styles = useStepperStyles()
  const icon = status === "complete" ? CheckIcon : undefined
  return (
    <Icon
      as={icon}
      __css={styles.icon}
      {...props}
      className={cx("chakra-step__icon", props.className)}
    />
  )
}
