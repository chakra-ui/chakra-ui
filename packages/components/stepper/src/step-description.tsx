import { chakra } from "@chakra-ui/system"
import { useStepContext } from "./step-context"

export type StepDescriptionProps = {
  children: React.ReactNode
}

export function StepDescription(props: StepDescriptionProps) {
  const { children, ...rest } = props
  const { status } = useStepContext()
  return (
    <chakra.p
      fontSize="14px"
      lineHeight="0.5"
      color="gray.700"
      data-status={status}
      {...rest}
    >
      {children}
    </chakra.p>
  )
}
