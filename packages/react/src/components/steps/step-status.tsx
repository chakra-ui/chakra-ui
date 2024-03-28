"use client"

import { MaybeRenderProp, runIfFn } from "@chakra-ui/utils"
import { StepContext, StepItemStatus, useStepContext } from "./step-context"

export interface StepStatusProps
  extends Partial<Record<StepItemStatus, MaybeRenderProp<StepContext>>> {}

export function StepStatus(props: StepStatusProps) {
  const api = useStepContext()

  let render: React.ReactNode | null = null

  switch (api.status) {
    case "completed":
      render = runIfFn(props.completed, api)
      break
    case "incomplete":
      render = runIfFn(props.incomplete, api)
      break
    case "current":
      render = runIfFn(props.current, api)
      break
    default:
      throw new Error(`Invalid step status: ${api.status}`)
  }

  return render ? <>{render}</> : null
}
