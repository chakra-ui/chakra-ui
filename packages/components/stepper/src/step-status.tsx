import { StepContext, StepStatusType, useStepContext } from "./step-context"

type MaybeRenderProp =
  | React.ReactNode
  | ((props: StepContext) => React.ReactNode)

export type StepStatusProps = Partial<Record<StepStatusType, MaybeRenderProp>>

export function StepStatus(props: StepStatusProps) {
  const { complete, incomplete, active } = props
  const context = useStepContext()
  let render: React.ReactNode | null = null
  switch (context.status) {
    case "complete":
      render = typeof complete === "function" ? complete(context) : complete
      break
    case "incomplete":
      render =
        typeof incomplete === "function" ? incomplete(context) : incomplete
      break
    case "active":
      render = typeof active === "function" ? active(context) : active
      break
  }

  return render ? <>{render}</> : null
}
