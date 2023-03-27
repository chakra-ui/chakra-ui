import { chakra } from "@chakra-ui/system"
import { StepContextProvider, StepperStatus } from "./step-context"

export type StepProps = {
  status: StepperStatus
  children: React.ReactNode
}

export function Step(props: StepProps) {
  const { status, children, ...rest } = props
  return (
    <StepContextProvider value={{ status }}>
      <chakra.div data-status={status} {...rest}>
        {children}
      </chakra.div>
    </StepContextProvider>
  )
}
