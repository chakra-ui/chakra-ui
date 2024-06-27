"use client"

import type { HTMLArkProps } from "@ark-ui/react/factory"
import { ark } from "@ark-ui/react/factory"
import { type Assign, createSplitProps } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { createContext } from "../../create-context"
import { mergeProps } from "../../merge-props"
import {
  type StepItemProps,
  type StepItemState,
  type UseStepsProps,
  type UseStepsReturn,
  useSteps,
} from "./steps.zag"

///////////////////////////////////////////////////////////////////////////

const [StepsProvider, useStepsContext] = createContext<UseStepsReturn>({
  name: "StepsContext",
  providerName: "StepsRoot",
})

export { useStepsContext }

export interface StepsContextProps {
  children(api: UseStepsReturn): JSX.Element
}

export const StepsContext = (props: StepsContextProps) => {
  return props.children(useStepsContext())
}

///////////////////////////////////////////////////////////////////////////

export interface StepsRootBaseProps extends UseStepsProps {}

export interface StepsRootProps
  extends Assign<HTMLArkProps<"div">, StepsRootBaseProps> {}

const splitProps = createSplitProps<UseStepsProps>([
  "count",
  "defaultValue",
  "dir",
  "id",
  "ids",
  "onStepChange",
  "onStepComplete",
  "orientation",
  "skippable",
  "value",
])

export const StepsRoot = forwardRef<HTMLDivElement, StepsRootProps>(
  function StepsRoot(props, ref) {
    const [stepsProps, localProps] = splitProps(props)

    const steps = useSteps(stepsProps)
    const mergedProps = mergeProps(steps.getRootProps(), localProps)

    return (
      <StepsProvider value={steps}>
        <ark.div ref={ref} {...mergedProps} />
      </StepsProvider>
    )
  },
)

///////////////////////////////////////////////////////////////////////////

export interface StepsListBaseProps {}

export interface StepsListProps
  extends Assign<HTMLArkProps<"ol">, StepsListBaseProps> {}

export const StepsList = forwardRef<HTMLOListElement, StepsListProps>(
  function StepsList(props, ref) {
    const steps = useStepsContext()
    const mergedProps = mergeProps(steps.getListProps(), props)
    return <ark.ol ref={ref} {...mergedProps} />
  },
)

///////////////////////////////////////////////////////////////////////////

const splitItemProps = createSplitProps<StepItemProps>(["index"])

const [StepsItemPropsProvider, useStepsItemProps] =
  createContext<StepItemProps>({
    name: "StepsItemProps",
    providerName: "StepsItem",
  })

export interface StepsItemContextProps {
  children(api: StepItemState): JSX.Element
}

export const StepsItemContext = (props: StepsItemContextProps) => {
  const steps = useStepsContext()
  const itemProps = useStepsItemProps()
  const itemState = steps.getItemState(itemProps)
  return props.children(itemState)
}

export interface StepsItemBaseProps extends StepItemProps {}

export interface StepsItemProps
  extends Assign<HTMLArkProps<"li">, StepsItemBaseProps> {}

export const StepsItem = forwardRef<HTMLLIElement, StepsItemProps>(
  function StepsItem(props, ref) {
    const [itemProps, localProps] = splitItemProps(props)
    const steps = useStepsContext()
    const mergedProps = mergeProps(steps.getItemProps(itemProps), localProps)
    return (
      <StepsItemPropsProvider value={itemProps}>
        <ark.li ref={ref} {...mergedProps} />
      </StepsItemPropsProvider>
    )
  },
)

///////////////////////////////////////////////////////////////////////////

export interface StepsTriggerBaseProps {}

export interface StepsTriggerProps
  extends Assign<HTMLArkProps<"button">, StepsTriggerBaseProps> {}

export const StepsTrigger = forwardRef<HTMLButtonElement, StepsTriggerProps>(
  function StepsTrigger(props, ref) {
    const itemProps = useStepsItemProps()
    const steps = useStepsContext()
    const mergedProps = mergeProps(steps.getTriggerProps(itemProps), props)
    return <ark.button ref={ref} {...mergedProps} />
  },
)

///////////////////////////////////////////////////////////////////////////

export interface StepsIndicatorBaseProps {}

export interface StepsIndicatorProps
  extends Assign<HTMLArkProps<"div">, StepsIndicatorBaseProps> {}

export const StepsIndicator = forwardRef<HTMLDivElement, StepsIndicatorProps>(
  function StepsIndicator(props, ref) {
    const itemProps = useStepsItemProps()
    const steps = useStepsContext()
    const mergedProps = mergeProps(steps.getIndicatorProps(itemProps), props)
    return <ark.div ref={ref} {...mergedProps} />
  },
)

///////////////////////////////////////////////////////////////////////////

export interface StepsSeparatorBaseProps {}

export interface StepsSeparatorProps
  extends Assign<HTMLArkProps<"div">, StepsSeparatorBaseProps> {}

export const StepsSeparator = forwardRef<HTMLDivElement, StepsSeparatorProps>(
  function StepsSeparator(props, ref) {
    const itemProps = useStepsItemProps()
    const steps = useStepsContext()
    const mergedProps = mergeProps(steps.getSeparatorProps(itemProps), props)
    return <ark.div ref={ref} {...mergedProps} />
  },
)

///////////////////////////////////////////////////////////////////////////

export interface StepsContentBaseProps extends StepItemProps {}

export interface StepsContentProps
  extends Assign<HTMLArkProps<"div">, StepsContentBaseProps> {}

export const StepsContent = forwardRef<HTMLDivElement, StepsContentProps>(
  function StepsContent(props, ref) {
    const [itemProps, localProps] = splitItemProps(props)
    const steps = useStepsContext()
    const mergedProps = mergeProps(steps.getContentProps(itemProps), localProps)
    return <ark.div ref={ref} {...mergedProps} />
  },
)

///////////////////////////////////////////////////////////////////////////

export interface StepsNextTriggerBaseProps {}

export interface StepsNextTriggerProps
  extends Assign<HTMLArkProps<"button">, StepsNextTriggerBaseProps> {}

export const StepsNextTrigger = forwardRef<
  HTMLButtonElement,
  StepsNextTriggerProps
>(function StepsNextTrigger(props, ref) {
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getNextTriggerProps(), props)
  return <ark.button ref={ref} {...mergedProps} />
})

///////////////////////////////////////////////////////////////////////////

export interface StepsPrevTriggerBaseProps {}

export interface StepsPrevTriggerProps
  extends Assign<HTMLArkProps<"button">, StepsPrevTriggerBaseProps> {}

export const StepsPrevTrigger = forwardRef<
  HTMLButtonElement,
  StepsPrevTriggerProps
>(function StepsPrevTrigger(props, ref) {
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getPrevTriggerProps(), props)
  return <ark.button ref={ref} {...mergedProps} />
})
