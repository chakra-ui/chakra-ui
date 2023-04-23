import { StepContext, StepStatus, useStepContext } from "./step-context"

type MaybeRenderProp =
  | React.ReactNode
  | ((props: StepContext) => React.ReactNode)

export type StepContentProps = {
  children?: (props: StepContext) => React.ReactNode
  when?: Record<StepStatus, MaybeRenderProp>
}

export function StepContent(props: StepContentProps) {
  const { children, when } = props
  const context = useStepContext()

  const resolve = (status: StepStatus) => {
    const render = when?.[status]
    return typeof render === "function" ? render(context) : render
  }

  return <>{children?.(context) ?? resolve(context.status)}</>
}
