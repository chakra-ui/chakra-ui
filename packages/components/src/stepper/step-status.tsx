import { runIfFn } from "@chakra-ui/utils"
import { StepContext, StepStatusType, useStepContext } from "./step-context"

type MaybeRenderProp =
  | React.ReactNode
  | ((props: StepContext) => React.ReactNode)

export interface StepStatusProps
  extends Partial<Record<StepStatusType, MaybeRenderProp>> {}

export function StepStatus(props: StepStatusProps) {
  const { complete, incomplete, active } = props
  const context = useStepContext()

  let render: React.ReactNode | null = null

  switch (context.status) {
    case "complete":
      render = runIfFn(complete, context)
      break
    case "incomplete":
      render = runIfFn(incomplete, context)
      break
    case "active":
      render = runIfFn(active, context)
      break
  }

  return render ? <>{render}</> : null
}
