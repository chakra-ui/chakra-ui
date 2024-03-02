import { cx } from "@chakra-ui/utils"
import { Icon, IconProps } from "../icon"
import { CheckIcon } from "./icons"
import { useStepContext, useStepperStyles } from "./step-context"

export function StepIcon(props: IconProps) {
  const { status } = useStepContext()
  const styles = useStepperStyles()
  const icon = status === "complete" ? CheckIcon : undefined
  return (
    <Icon
      as={icon}
      css={styles.icon}
      {...props}
      className={cx("chakra-step__icon", props.className)}
    />
  )
}
