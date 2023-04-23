import { HTMLChakraProps, chakra } from "@chakra-ui/system"
import {
  StepContext,
  StepStatus,
  useStepContext,
  useStepperStyles,
} from "./step-context"

export type StepIndicatorProps = HTMLChakraProps<"div">

export function StepIndicator(props: StepIndicatorProps) {
  const { status } = useStepContext()
  const styles = useStepperStyles()
  return <chakra.div data-status={status} {...props} __css={styles.indicator} />
}

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
