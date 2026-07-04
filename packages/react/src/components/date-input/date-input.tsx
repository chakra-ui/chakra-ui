"use client"

import type { Assign } from "@ark-ui/react"
import {
  DateInput as ArkDateInput,
  useDateInputContext,
} from "@ark-ui/react/date-input"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useDateInputStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "dateInput" })

export { useDateInputStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface DateInputRootProviderBaseProps
  extends
    Assign<ArkDateInput.RootProviderBaseProps, SlotRecipeProps<"dateInput">>,
    UnstyledProp {}

export interface DateInputRootProviderProps extends HTMLChakraProps<
  "div",
  DateInputRootProviderBaseProps
> {}

export const DateInputRootProvider = withProvider<
  HTMLDivElement,
  DateInputRootProviderProps
>(ArkDateInput.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DateInputRootBaseProps
  extends
    Assign<ArkDateInput.RootBaseProps, SlotRecipeProps<"dateInput">>,
    UnstyledProp {}

export interface DateInputRootProps extends HTMLChakraProps<
  "div",
  DateInputRootBaseProps
> {}

export const DateInputRoot = withProvider<HTMLDivElement, DateInputRootProps>(
  ArkDateInput.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const DateInputPropsProvider =
  PropsProvider as React.Provider<ArkDateInput.RootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface DateInputLabelProps
  extends HTMLChakraProps<"label", ArkDateInput.LabelBaseProps>, UnstyledProp {}

export const DateInputLabel = withContext<
  HTMLLabelElement,
  DateInputLabelProps
>(ArkDateInput.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DateInputControlProps
  extends HTMLChakraProps<"div", ArkDateInput.ControlBaseProps>, UnstyledProp {}

export const DateInputControl = withContext<
  HTMLDivElement,
  DateInputControlProps
>(ArkDateInput.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DateInputSegmentGroupProps
  extends
    HTMLChakraProps<"div", ArkDateInput.SegmentGroupBaseProps>,
    UnstyledProp {}

export const DateInputSegmentGroup = withContext<
  HTMLDivElement,
  DateInputSegmentGroupProps
>(ArkDateInput.SegmentGroup, "segmentGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DateInputSegmentProps
  extends
    HTMLChakraProps<"span", ArkDateInput.SegmentBaseProps>,
    UnstyledProp {}

export const DateInputSegment = withContext<
  HTMLSpanElement,
  DateInputSegmentProps
>(ArkDateInput.Segment, "segment", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DateInputHiddenInputProps
  extends
    HTMLChakraProps<"input", ArkDateInput.HiddenInputBaseProps>,
    UnstyledProp {}

export const DateInputHiddenInput = withContext<
  HTMLInputElement,
  DateInputHiddenInputProps
>(ArkDateInput.HiddenInput, "hiddenInput", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface DateInputSegmentsProps extends Omit<
  DateInputSegmentGroupProps,
  "children"
> {
  index?: number
}

export const DateInputSegments = (props: DateInputSegmentsProps) => {
  const { index, ...rest } = props
  const dateInput = useDateInputContext()

  return (
    <DateInputSegmentGroup index={index} {...rest}>
      {dateInput.getSegments({ index }).map((segment, segmentIndex) => (
        <DateInputSegment key={segmentIndex} segment={segment} />
      ))}
    </DateInputSegmentGroup>
  )
}
