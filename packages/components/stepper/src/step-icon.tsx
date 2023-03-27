import { Icon, IconProps } from "@chakra-ui/icon"
import { CheckIcon } from "./icons"
import { useStepContext } from "./step-context"

export function StepIcon(props: IconProps) {
  const { status } = useStepContext()
  const icon = status === "completed" ? CheckIcon : undefined
  return <Icon as={icon} boxSize={3} {...props} />
}
