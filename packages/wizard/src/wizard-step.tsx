import { chakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"

export type WizardStepProps = PropsOf<typeof chakra.div> & {
  component?: React.ComponentType
}

const Wrapper = chakra("div", {
  baseStyle: {
    p: 4,
    flexDirection: "column",
  },
})

const WizardStep = React.forwardRef(function WizardStep(
  { children, ...rest }: WizardStepProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return <Wrapper ref={ref}>{children}</Wrapper>
})

export default WizardStep

WizardStep.defaultProps = {
  bg: "gray.100",
}
