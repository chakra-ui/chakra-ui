"use client"

import type { Assign } from "@ark-ui/react"
import { Tour as ArkTour } from "@ark-ui/react/tour"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { CloseIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useTourStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "tour" })

export { useTourStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface TourRootProviderBaseProps
  extends Assign<ArkTour.RootBaseProps, SlotRecipeProps<"tour">>,
    UnstyledProp {}

export interface TourRootProviderProps
  extends HTMLChakraProps<"div", TourRootProviderBaseProps> {}

export const TourRootProvider = withProvider<
  HTMLDivElement,
  TourRootProviderProps
>(ArkTour.Root, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TourRootBaseProps
  extends Assign<ArkTour.RootBaseProps, SlotRecipeProps<"tour">>,
    UnstyledProp {}

export interface TourRootProps
  extends HTMLChakraProps<"div", TourRootBaseProps> {}

export const TourRoot = withProvider<HTMLDivElement, TourRootProps>(
  ArkTour.Root,
  "root",
  { forwardAsChild: true },
)

export const TourPropsProvider =
  PropsProvider as React.Provider<TourRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface TourContentProps
  extends HTMLChakraProps<"div", ArkTour.ContentBaseProps>,
    UnstyledProp {}

export const TourContent = withContext<HTMLDivElement, TourContentProps>(
  ArkTour.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TourCloseTriggerProps
  extends HTMLChakraProps<"button", ArkTour.CloseTriggerBaseProps>,
    UnstyledProp {}

export const TourCloseTrigger = withContext<
  HTMLButtonElement,
  TourCloseTriggerProps
>(ArkTour.CloseTrigger, "closeTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <CloseIcon /> },
})

////////////////////////////////////////////////////////////////////////////////////

export interface TourTitleProps
  extends HTMLChakraProps<"h2", ArkTour.TitleBaseProps>,
    UnstyledProp {}

export const TourTitle = withContext<HTMLHeadingElement, TourTitleProps>(
  ArkTour.Title,
  "title",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TourDescriptionProps
  extends HTMLChakraProps<"p", ArkTour.DescriptionBaseProps>,
    UnstyledProp {}

export const TourDescription = withContext<
  HTMLParagraphElement,
  TourDescriptionProps
>(ArkTour.Description, "description", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TourControlProps
  extends HTMLChakraProps<"div", ArkTour.ControlBaseProps>,
    UnstyledProp {}

export const TourControl = withContext<HTMLDivElement, TourControlProps>(
  ArkTour.Control,
  "control",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TourPositionerProps
  extends HTMLChakraProps<"div", ArkTour.PositionerBaseProps>,
    UnstyledProp {}

export const TourPositioner = withContext<HTMLDivElement, TourPositionerProps>(
  ArkTour.Positioner,
  "positioner",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TourArrowProps
  extends HTMLChakraProps<"div", ArkTour.ArrowBaseProps>,
    UnstyledProp {}

export const TourArrow = withContext<HTMLDivElement, TourArrowProps>(
  ArkTour.Arrow,
  "arrow",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TourArrowTipProps
  extends HTMLChakraProps<"div", ArkTour.ArrowTipBaseProps>,
    UnstyledProp {}

export const TourArrowTip = withContext<HTMLDivElement, TourArrowTipProps>(
  ArkTour.ArrowTip,
  "arrowTip",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TourActionTriggerProps
  extends HTMLChakraProps<"button", ArkTour.ActionTriggerBaseProps>,
    UnstyledProp {}

export const TourActionTrigger = withContext<
  HTMLButtonElement,
  TourActionTriggerProps
>(ArkTour.ActionTrigger, "actionTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TourProgressTextProps
  extends HTMLChakraProps<"span", ArkTour.ProgressTextBaseProps>,
    UnstyledProp {}

export const TourProgressText = withContext<
  HTMLSpanElement,
  TourProgressTextProps
>(ArkTour.ProgressText, "progressText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TourBackdropProps
  extends HTMLChakraProps<"div", ArkTour.BackdropBaseProps>,
    UnstyledProp {}

export const TourBackdrop = withContext<HTMLDivElement, TourBackdropProps>(
  ArkTour.Backdrop,
  "backdrop",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TourSpotlightProps
  extends HTMLChakraProps<"div", ArkTour.SpotlightBaseProps>,
    UnstyledProp {}

export const TourSpotlight = withContext<HTMLDivElement, TourSpotlightProps>(
  ArkTour.Spotlight,
  "spotlight",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const TourContext = ArkTour.Context

export interface TourStepChangeDetails extends ArkTour.StepChangeDetails {}
export interface TourStatusChangeDetails extends ArkTour.StatusChangeDetails {}
