import { HTMLChakraProps, chakra } from "@chakra-ui/system"
import { useStepContext } from "./step-context"

export function StepNumber(props: HTMLChakraProps<"div">) {
  const { children, ...restProps } = props
  const { status, index } = useStepContext()
  return (
    <chakra.div data-status={status} {...restProps}>
      {children || index + 1}
    </chakra.div>
  )
}
