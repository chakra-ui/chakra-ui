"use client"

import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"
import { CheckIcon } from "../icons"
import * as ArkSteps from "./steps.ark"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useStepsStyles,
} = createSlotRecipeContext("steps")

export { useStepsStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface StepsRootProps
  extends HTMLChakraProps<"div", ArkSteps.StepsRootBaseProps>,
    SlotRecipeProps<"steps">,
    UnstyledProp {}

export const StepsRoot = withProvider<HTMLDivElement, StepsRootProps>(
  ArkSteps.StepsRoot,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface StepsListProps
  extends HTMLChakraProps<"div", ArkSteps.StepsListBaseProps> {}

export const StepsList = withContext<HTMLDivElement, StepsListProps>(
  ArkSteps.StepsList,
  "list",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface StepsItemProps
  extends HTMLChakraProps<"div", ArkSteps.StepsItemBaseProps> {}

export const StepsItem = withContext<HTMLDivElement, StepsItemProps>(
  ArkSteps.StepsItem,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface StepsTriggerProps
  extends HTMLChakraProps<"button", ArkSteps.StepsTriggerBaseProps> {}

export const StepsTrigger = withContext<HTMLButtonElement, StepsTriggerProps>(
  ArkSteps.StepsTrigger,
  "trigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface StepsContentProps
  extends HTMLChakraProps<"div", ArkSteps.StepsContentBaseProps> {}

export const StepsContent = withContext<HTMLDivElement, StepsContentProps>(
  ArkSteps.StepsContent,
  "content",
  { forwardAsChild: true },
)

export interface StepsCompleteContentProps extends HTMLChakraProps<"div"> {}

export const StepsCompleteContent = forwardRef<
  HTMLDivElement,
  StepsCompleteContentProps
>(function StepsCompleteContent(props, ref) {
  return (
    <ArkSteps.StepsContext>
      {(api) => <StepsContent ref={ref} {...props} index={api.count} />}
    </ArkSteps.StepsContext>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface StepsNumberProps extends HTMLChakraProps<"div"> {}

export const StepsNumber = forwardRef<HTMLDivElement, StepsNumberProps>(
  function StepsNumber(props, ref) {
    return (
      <ArkSteps.StepsItemContext>
        {(api) => (
          <chakra.div ref={ref} {...props}>
            {api.index + 1}
          </chakra.div>
        )}
      </ArkSteps.StepsItemContext>
    )
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface StepsTitleProps extends HTMLChakraProps<"div"> {}

export const StepsTitle = withContext<HTMLDivElement, StepsTitleProps>(
  "div",
  "title",
)

////////////////////////////////////////////////////////////////////////////////////

export interface StepsDescriptionProps extends HTMLChakraProps<"div"> {}

export const StepsDescription = withContext<
  HTMLDivElement,
  StepsDescriptionProps
>("div", "description")

////////////////////////////////////////////////////////////////////////////////////

export interface StepsSeparatorProps
  extends HTMLChakraProps<"div", ArkSteps.StepsSeparatorBaseProps> {}

export const StepsSeparator = withContext<HTMLDivElement, StepsSeparatorProps>(
  ArkSteps.StepsSeparator,
  "separator",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface StepsStatusProps {
  complete: React.ReactNode
  incomplete: React.ReactNode
  current?: React.ReactNode
}

export const StepsStatus = (props: StepsStatusProps) => {
  return (
    <ArkSteps.StepsItemContext>
      {(api) => {
        if (api.current) return <>{props.current ?? props.incomplete}</>
        if (api.completed) return <>{props.complete}</>
        return <>{props.incomplete ?? props.current}</>
      }}
    </ArkSteps.StepsItemContext>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export interface StepsIndicatorProps
  extends HTMLChakraProps<"div", ArkSteps.StepsIndicatorBaseProps> {}

export const StepsIndicator = withContext<HTMLDivElement, StepsIndicatorProps>(
  ArkSteps.StepsIndicator,
  "indicator",
  {
    forwardAsChild: true,
    defaultProps: {
      children: (
        <StepsStatus complete={<CheckIcon />} incomplete={<StepsNumber />} />
      ),
    },
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface StepsNextTriggerProps
  extends HTMLChakraProps<"button", ArkSteps.StepsTriggerBaseProps> {}

export const StepsNextTrigger = withContext<
  HTMLButtonElement,
  StepsNextTriggerProps
>(ArkSteps.StepsNextTrigger, "nextTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface StepsPrevTriggerProps
  extends HTMLChakraProps<"button", ArkSteps.StepsTriggerBaseProps> {}

export const StepsPrevTrigger = withContext<
  HTMLButtonElement,
  StepsPrevTriggerProps
>(ArkSteps.StepsPrevTrigger, "prevTrigger", { forwardAsChild: true })
